'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useId, useRef, useState } from 'react';
import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';

const TIME_SLOTS = ['2:00PM', '2:30PM', '3:00PM', '3:30PM', '4:00PM', '4:30PM', '5:00PM'];

const TIME_ZONES = [
  'Eastern Time (GMT-4)',
  'Central Time (GMT-5)',
  'Mountain Time (GMT-6)',
  'Pacific Time (GMT-7)',
  'Alaska Time (GMT-8)',
  'Hawaii Time (GMT-10)'
];

const TOPICS = ['Review retirement readiness', 'Discuss product options', 'Review advisor plan'];
const DEFAULT_TOPIC = 'Introduction call';

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const inputClass =
  'h-[55px] w-full rounded-none border-2 border-[#001F45] bg-white px-4 text-[16px] text-[#001F45] outline-none placeholder:text-[#001F45]/50 focus-visible:border-[#0066CC] aria-invalid:border-[#B3001B]';

type Contact = { firstName: string; lastName: string; email: string; phone: string };
type Errors = Partial<Record<keyof Contact | 'date' | 'time', string>>;

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function formatDate(d: Date) {
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${mm}/${dd}/${d.getFullYear()}`;
}

function parseDate(value: string) {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value);
  if (!match) return null;
  const d = new Date(Number(match[3]), Number(match[1]) - 1, Number(match[2]));
  return d.getMonth() === Number(match[1]) - 1 ? d : null;
}

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 10);
  if (digits.length < 4) return digits;
  if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

/**
 * "Connect with an advisor": pick a date and a half-hour slot, leave contact
 * details, and schedule. Everything is local to the prototype; nothing is sent.
 */
export function AdvisorCallForm() {
  const router = useRouter();
  // Today is read on the client only, so the calendar never disagrees with
  // the server's clock (or time zone) during hydration.
  const [today, setToday] = useState<Date | null>(null);
  const [viewMonth, setViewMonth] = useState<Date | null>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [dateText, setDateText] = useState('');
  const [calendarOpen, setCalendarOpen] = useState(true);
  const [timeZone, setTimeZone] = useState(TIME_ZONES[0]);
  const [time, setTime] = useState<string | null>(null);
  const [showExpect, setShowExpect] = useState(false);
  const [contact, setContact] = useState<Contact>({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  const [topic, setTopic] = useState<string | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [scheduled, setScheduled] = useState(false);

  useEffect(() => {
    const now = startOfDay(new Date());
    setToday(now);
    setViewMonth(new Date(now.getFullYear(), now.getMonth(), 1));
  }, []);

  function pickDate(d: Date) {
    setDate(d);
    setDateText(formatDate(d));
    setViewMonth(new Date(d.getFullYear(), d.getMonth(), 1));
    setErrors((e) => ({ ...e, date: undefined }));
  }

  function updateContact(field: keyof Contact, value: string) {
    setContact((c) => ({ ...c, [field]: field === 'phone' ? formatPhone(value) : value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next: Errors = {};
    if (!date) next.date = 'Choose a date.';
    if (!time) next.time = 'Choose a time.';
    if (!contact.firstName.trim()) next.firstName = 'Enter your first name.';
    if (!contact.lastName.trim()) next.lastName = 'Enter your last name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email.trim()))
      next.email = 'Enter a valid email address.';
    if (contact.phone.replace(/\D/g, '').length !== 10)
      next.phone = 'Enter a 10-digit phone number.';
    setErrors(next);
    if (Object.keys(next).length === 0) {
      setScheduled(true);
      window.scrollTo({ top: 0 });
    }
  }

  if (scheduled && date && time) {
    return (
      <div className='w-full max-w-[920px] border-2 border-[#7ECAF2] bg-white px-6 py-10 sm:px-9'>
        <div className='flex items-center gap-3'>
          <Icons.circleCheck className='size-9 shrink-0 text-[#007A78]' stroke={1.75} />
          <h2 className='text-[26px] leading-tight font-bold'>
            You’re all set, {contact.firstName.trim()}.
          </h2>
        </div>
        <p className='mt-4 max-w-[640px] text-[17px] leading-relaxed'>
          Your 30 min Zoom call is booked for{' '}
          <strong>
            {date.toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })}{' '}
            at {time.replace('PM', ' PM')}
          </strong>{' '}
          {timeZone.replace(/ \(.*\)/, '')}. We’ll send the Zoom link to{' '}
          <strong>{contact.email.trim()}</strong>.
        </p>
        <p className='mt-2 text-[17px]'>Topic: {topic ?? DEFAULT_TOPIC}</p>
        <button
          type='button'
          onClick={() => setScheduled(false)}
          className='mt-8 h-11 w-[200px] rounded-full border-2 border-[#001F45] bg-white text-[16px] font-bold hover:bg-[#F3FBFF]'
        >
          Change details
        </button>
      </div>
    );
  }

  const weekday = date?.toLocaleDateString('en-US', { weekday: 'long' });

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className='w-full max-w-[920px] border-2 border-[#7ECAF2] bg-white px-5 pt-8 pb-10 sm:px-[35px]'
    >
      <div className='flex flex-col gap-8 lg:flex-row lg:gap-[93px]'>
        {/* Date */}
        <div className='w-full lg:w-[298px]'>
          <div
            className={cn(
              'relative flex h-[55px] items-center border bg-white px-3',
              errors.date ? 'border-2 border-[#B3001B]' : 'border-[#5A6B80]'
            )}
          >
            <label className='flex-1'>
              <span className='block text-[12px] leading-none'>Date</span>
              <input
                value={dateText}
                aria-label='Date'
                inputMode='numeric'
                placeholder='MM/DD/YYYY'
                aria-invalid={!!errors.date}
                onFocus={() => setCalendarOpen(true)}
                onChange={(e) => {
                  setDateText(e.target.value);
                  const parsed = parseDate(e.target.value);
                  if (parsed && today && parsed >= today) pickDate(parsed);
                }}
                className='mt-1 w-full bg-transparent text-[16px] outline-none placeholder:text-[#001F45]/60'
              />
            </label>
            <button
              type='button'
              aria-label={calendarOpen ? 'Hide calendar' : 'Show calendar'}
              aria-expanded={calendarOpen}
              onClick={() => setCalendarOpen((o) => !o)}
              className='grid size-9 place-items-center rounded hover:bg-[#E2F4FF]'
            >
              <Icons.calendar className='size-6' stroke={1.5} />
            </button>
          </div>
          {errors.date && <FieldError>{errors.date}</FieldError>}
          {calendarOpen && (
            <Calendar
              today={today}
              viewMonth={viewMonth}
              selected={date}
              onViewMonth={setViewMonth}
              onPick={pickDate}
            />
          )}
        </div>

        {/* Time */}
        <div className='w-full lg:w-[340px]'>
          <label className='relative block h-[55px] border-2 border-[#0066CC] bg-white px-3 pt-2'>
            <span className='block text-[12px] leading-none text-[#5A6B80]'>Time zone</span>
            <select
              value={timeZone}
              onChange={(e) => setTimeZone(e.target.value)}
              className='mt-0.5 w-full appearance-none bg-transparent pr-8 text-[16px] outline-none'
            >
              {TIME_ZONES.map((zone) => (
                <option key={zone}>{zone}</option>
              ))}
            </select>
            <Icons.chevronDown
              className='pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2'
              stroke={2.5}
            />
          </label>

          <p id='time-heading' className='mt-8 text-[16px]'>
            {weekday ? `What time on ${weekday} works for you?` : 'What time works for you?'}
          </p>
          <div
            role='radiogroup'
            aria-labelledby='time-heading'
            className='mt-4 grid grid-cols-2 gap-x-[30px] gap-y-4 sm:w-[334px]'
          >
            {TIME_SLOTS.map((slot) => (
              <button
                key={slot}
                type='button'
                role='radio'
                aria-checked={time === slot}
                onClick={() => {
                  setTime(slot);
                  setErrors((e) => ({ ...e, time: undefined }));
                }}
                className={cn(
                  'h-[44px] rounded-full border-2 text-[14px] font-bold transition-colors',
                  time === slot
                    ? 'border-[#0066CC] bg-[#0066CC] text-white'
                    : 'border-[#001F45] bg-white text-[#001F45] hover:bg-[#F3FBFF]',
                  'focus-visible:ring-2 focus-visible:ring-[#0066CC] focus-visible:ring-offset-2 focus-visible:outline-none'
                )}
              >
                {slot}
              </button>
            ))}
          </div>
          {errors.time && <FieldError>{errors.time}</FieldError>}

          <button
            type='button'
            aria-expanded={showExpect}
            onClick={() => setShowExpect((s) => !s)}
            className='mt-9 text-[16px] font-semibold text-[#0066CC] hover:underline'
          >
            What to expect for this call?
          </button>
          {showExpect && (
            <p className='mt-2 text-[15px] leading-relaxed'>
              You’ll meet one-on-one with an advisor over Zoom for 30 minutes to talk through your
              goals, ask questions, and agree on next steps together.
            </p>
          )}
        </div>
      </div>

      <h2 className='mt-12 text-[24px] font-bold'>Your contact details</h2>

      <div className='mt-7 grid gap-x-[50px] gap-y-6 sm:grid-cols-2 lg:w-[732px]'>
        <TextField
          label='First name'
          autoComplete='given-name'
          value={contact.firstName}
          error={errors.firstName}
          onChange={(v) => updateContact('firstName', v)}
        />
        <TextField
          label='Last name'
          autoComplete='family-name'
          value={contact.lastName}
          error={errors.lastName}
          onChange={(v) => updateContact('lastName', v)}
        />
        <TextField
          label='Email address'
          type='email'
          autoComplete='email'
          value={contact.email}
          error={errors.email}
          onChange={(v) => updateContact('email', v)}
        />
        <TextField
          label='Phone number'
          type='tel'
          autoComplete='tel'
          value={contact.phone}
          error={errors.phone}
          onChange={(v) => updateContact('phone', v)}
        />
        <TopicSelect value={topic} onChange={setTopic} />
      </div>

      <p className='mt-10 text-[13px]'>
        By clicking ‘Schedule call’, I agree to the consent below *
      </p>

      <div className='mt-5 flex flex-wrap gap-6'>
        <button
          type='button'
          onClick={() => router.back()}
          className='h-11 w-[200px] rounded-full border-2 border-[#001F45] bg-white text-[16px] font-bold hover:bg-[#F3FBFF] focus-visible:ring-2 focus-visible:ring-[#0066CC] focus-visible:ring-offset-2 focus-visible:outline-none'
        >
          Cancel
        </button>
        <button
          type='submit'
          className='h-11 w-[200px] rounded-full bg-[#0066CC] text-[16px] font-bold text-white hover:bg-[#00539E] focus-visible:ring-2 focus-visible:ring-[#0066CC] focus-visible:ring-offset-2 focus-visible:outline-none'
        >
          Schedule call
        </button>
      </div>

      <p className='mt-7 max-w-[780px] text-[12.5px] leading-[1.6]'>
        <strong>*Consent to be contacted</strong>. By completing the form above and clicking on the
        ‘Agree and Schedule Meeting’ button, I agree that The Prudential Insurance Company of
        America, PruCo Securities LLC and their affiliates, including a Prudential representative or
        an appointed independent agent, including Assurance IQ and Accuquote (collectively
        ‘Prudential’) can contact me for marketing purposes by phone call or text (message and data
        rates may apply) at the phone number and email address listed above. This contact may
        include contact with an auto dialer and even if I’ve requested not to be contacted by
        Prudential or am on a do-not-call/contact list. I also understand that consent isn’t
        necessary to schedule an appointment or make an investment or purchase. To schedule an
        appointment without providing this consent, you may call 844-939-0490. 1050656-00002-00
      </p>
    </form>
  );
}

function FieldError({ children }: { children: React.ReactNode }) {
  return <p className='mt-1.5 text-[13px] font-semibold text-[#B3001B]'>{children}</p>;
}

function TextField({
  label,
  value,
  error,
  onChange,
  type = 'text',
  autoComplete
}: {
  label: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  type?: string;
  autoComplete?: string;
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className='block text-[16px] font-semibold'>
        {label}
      </label>
      <input
        id={id}
        aria-label={label}
        type={type}
        autoComplete={autoComplete}
        value={value}
        aria-invalid={!!error}
        onChange={(e) => onChange(e.target.value)}
        className={cn(inputClass, 'mt-2.5')}
      />
      {error && <FieldError>{error}</FieldError>}
    </div>
  );
}

function TopicSelect({
  value,
  onChange
}: {
  value: string | null;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const labelId = useId();
  const valueId = useId();

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [open]);

  return (
    <div ref={ref} className='sm:col-start-1'>
      <span id={labelId} className='block text-[16px] font-semibold'>
        What would you like to discuss?
      </span>
      <button
        type='button'
        aria-haspopup='listbox'
        aria-expanded={open}
        aria-labelledby={`${labelId} ${valueId}`}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}
        className={cn(inputClass, 'mt-2.5 flex items-center justify-between text-left')}
      >
        <span id={valueId} className={value ? '' : 'text-[#001F45]/60'}>
          {value ?? DEFAULT_TOPIC}
        </span>
        <Icons.chevronDown className={cn('size-4 transition-transform', open && 'rotate-180')} />
      </button>
      {open && (
        <div
          role='listbox'
          aria-labelledby={labelId}
          className='mx-2 border border-[#C9D3DD] bg-white shadow-[0_2px_6px_rgba(0,31,69,0.12)]'
        >
          {TOPICS.map((option) => (
            <button
              key={option}
              type='button'
              role='option'
              aria-selected={value === option}
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
              className={cn(
                'h-[55px] w-full px-4 text-left text-[16px] hover:bg-[#EEF6FD] hover:text-[#0066CC]',
                value === option && 'bg-[#EEF6FD] text-[#0066CC]'
              )}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Calendar({
  today,
  viewMonth,
  selected,
  onViewMonth,
  onPick
}: {
  today: Date | null;
  viewMonth: Date | null;
  selected: Date | null;
  onViewMonth: (d: Date) => void;
  onPick: (d: Date) => void;
}) {
  if (!today || !viewMonth) {
    return (
      <div className='mt-3 h-[316px] rounded-md bg-white shadow-[0_2px_8px_rgba(0,31,69,0.25)]' />
    );
  }

  const year = viewMonth.getFullYear();
  const month = viewMonth.getMonth();
  const first = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cellCount = Math.ceil((first.getDay() + daysInMonth) / 7) * 7;
  const cells = Array.from(
    { length: cellCount },
    (_, i) => new Date(year, month, i - first.getDay() + 1)
  );
  const atCurrentMonth = year === today.getFullYear() && month === today.getMonth();

  return (
    <div className='mt-3 rounded-md bg-white px-3 pt-3 pb-4 shadow-[0_2px_8px_rgba(0,31,69,0.25)]'>
      <div className='flex items-center justify-between'>
        <button
          type='button'
          aria-label='Previous month'
          disabled={atCurrentMonth}
          onClick={() => onViewMonth(new Date(year, month - 1, 1))}
          className='grid size-8 place-items-center rounded text-[#0066CC] hover:bg-[#E2F4FF] disabled:text-[#0066CC]/30 disabled:hover:bg-transparent'
        >
          <Icons.chevronLeft className='size-5' stroke={2.25} />
        </button>
        <span className='text-[15px] font-semibold' aria-live='polite'>
          {viewMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </span>
        <button
          type='button'
          aria-label='Next month'
          onClick={() => onViewMonth(new Date(year, month + 1, 1))}
          className='grid size-8 place-items-center rounded text-[#0066CC] hover:bg-[#E2F4FF]'
        >
          <Icons.chevronRight className='size-5' stroke={2.25} />
        </button>
      </div>
      <div className='mt-3 grid grid-cols-7 text-center text-[12px] text-[#5A6B80]'>
        {WEEKDAYS.map((d, i) => (
          <span key={i}>{d}</span>
        ))}
      </div>
      <div className='mt-2 grid grid-cols-7 gap-y-1 text-center text-[15px]'>
        {cells.map((d) => {
          const outside = d.getMonth() !== month;
          const past = d < today;
          const isSelected = selected?.getTime() === d.getTime();
          return (
            <button
              key={d.toISOString()}
              type='button'
              disabled={past}
              aria-pressed={isSelected}
              aria-label={d.toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric'
              })}
              onClick={() => onPick(d)}
              className={cn(
                'mx-auto grid size-9 place-items-center rounded-full transition-colors',
                isSelected ? 'bg-[#0066CC] font-semibold text-white' : 'hover:bg-[#E2F4FF]',
                !isSelected && (outside || past) && 'text-[#001F45]/40',
                past && 'cursor-default hover:bg-transparent',
                !isSelected &&
                  d.getTime() === today.getTime() &&
                  'font-bold underline underline-offset-4'
              )}
            >
              {d.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
