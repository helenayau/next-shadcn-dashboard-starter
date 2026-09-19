import { Icons } from '@/components/icons';
import { WhyPrudentialIcons } from './illustrations';

/**
 * The right rail — "Why Prudential?" proof points and the advisor CTA.
 * Identical in both A/B arms, so it never explains a difference in results.
 */

const proofPoints = [
  { icon: WhyPrudentialIcons.Handshake, lead: '145+ years', rest: 'of service and commitment' },
  { icon: WhyPrudentialIcons.Dollar, lead: '$1.4 trillion', rest: 'in assets under management' },
  { icon: WhyPrudentialIcons.People, lead: '50 million', rest: 'customers in over 50 countries' }
];

export function RegistrationAside() {
  return (
    <aside className='flex w-full flex-col gap-6 lg:max-w-[320px]'>
      <section className='rounded-md border border-[#7ECAF2] bg-white p-6'>
        <h2 className='text-lg font-bold text-[#001F45]'>Why Prudential?</h2>
        <ul className='mt-4 divide-y divide-[#7ECAF2]'>
          {proofPoints.map(({ icon: Icon, lead, rest }) => (
            <li key={lead} className='flex items-start gap-3 py-4 first:pt-0 last:pb-0'>
              <Icon className='mt-0.5 size-7 shrink-0 text-[#018786]' />
              <p className='text-sm leading-snug text-[#001F45]'>
                <span className='font-bold'>{lead}</span> {rest}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className='rounded-md bg-[#001F45] p-6 text-white'>
        <h2 className='text-lg font-bold'>Connect with an advisor</h2>
        <p className='mt-2 text-sm leading-snug text-white/85'>
          We&apos;re ready to help answer your questions&ndash; big or small. Give us a call.
        </p>
        <a
          href='tel:+15551234567'
          className='mt-4 inline-flex h-11 items-center gap-2 rounded-full bg-[#0066CC] px-5 text-base font-semibold text-white transition-colors hover:bg-[#00539E] focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none'
        >
          (555) 123-4567
          <Icons.phone className='size-4' aria-hidden />
        </a>
        <p className='mt-2 text-xs text-white/75'>Weekdays 9:00AM to 6:00PM ET</p>
        <hr className='my-5 border-white/25' />
        <button
          type='button'
          className='inline-flex items-center gap-2 text-sm font-bold text-white underline underline-offset-4'
        >
          Schedule a call for another time
          <Icons.arrowRight className='size-4' aria-hidden />
        </button>
      </section>
    </aside>
  );
}
