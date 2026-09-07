export function ShrugIllustration() {
  return (
    <svg
      viewBox='0 0 480 380'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className='h-auto w-full max-w-md'
      role='img'
      aria-label='Illustration of a person shrugging with both hands raised'
    >
      <rect width='480' height='380' rx='28' fill='#DCEEF8' />
      <ellipse cx='240' cy='200' rx='205' ry='165' fill='#ffffff' />

      {/* hair */}
      <path
        d='M240 60c58 0 96 44 96 98 0 38-14 66-30 84-4-24-8-52-8-70 0-40-26-64-58-64s-58 24-58 64c0 18-4 46-8 70-16-18-30-46-30-84 0-54 38-98 96-98z'
        fill='#0B1F3A'
      />

      {/* sleeves + hands (behind torso) */}
      <rect
        x='150'
        y='215'
        width='150'
        height='46'
        rx='23'
        fill='#E8792B'
        transform='rotate(-20 150 215)'
      />
      <rect
        x='180'
        y='215'
        width='150'
        height='46'
        rx='23'
        fill='#E8792B'
        transform='rotate(20 330 215)'
      />
      <path
        d='M182 200c-14-4-30 0-44 10-10 8-16 18-14 26 2 10 14 12 24 8 14-6 30-14 40-24 6-6 4-16-6-20z'
        fill='#E8792B'
      />
      <path
        d='M298 200c14-4 30 0 44 10 10 8 16 18 14 26-2 10-14 12-24 8-14-6-30-14-40-24-6-6-4-16 6-20z'
        fill='#E8792B'
      />

      {/* torso / sweater */}
      <path d='M195 240c4-14 20-22 45-22s41 8 45 22l14 100H181z' fill='#F0B92A' />
      <path
        d='M210 232c-4 18-6 60-2 96'
        stroke='#D9A11E'
        strokeWidth='2.5'
        fill='none'
        opacity='0.6'
      />
      <path
        d='M270 232c4 18 6 60 2 96'
        stroke='#D9A11E'
        strokeWidth='2.5'
        fill='none'
        opacity='0.6'
      />

      {/* neck + face */}
      <rect x='222' y='190' width='36' height='42' rx='14' fill='#E8792B' />
      <ellipse cx='240' cy='155' rx='52' ry='62' fill='#E8792B' />

      {/* ears */}
      <ellipse cx='188' cy='150' rx='8' ry='11' fill='#E8792B' />
      <ellipse cx='292' cy='150' rx='8' ry='11' fill='#E8792B' />
      <path
        d='M186 145c3-3 7-3 8 0'
        stroke='#0B1F3A'
        strokeWidth='2'
        fill='none'
        strokeLinecap='round'
      />
      <path
        d='M294 145c-3-3-7-3-8 0'
        stroke='#0B1F3A'
        strokeWidth='2'
        fill='none'
        strokeLinecap='round'
      />
    </svg>
  );
}

export function RugIllustration() {
  return (
    <svg
      viewBox='0 0 300 100'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className='h-auto w-full max-w-xs'
      role='img'
      aria-label='Illustration of a dog resting on a rug'
    >
      <rect x='0' y='60' width='230' height='30' rx='6' fill='#0B1F3A' opacity='0.15' />
      <rect
        x='0'
        y='60'
        width='230'
        height='30'
        rx='6'
        stroke='#0B1F3A'
        strokeOpacity='0.35'
        strokeWidth='2'
        fill='none'
      />
      <ellipse cx='120' cy='55' rx='38' ry='20' fill='#E3A857' />
      <circle cx='72' cy='48' r='18' fill='#E3A857' />
      <path d='M60 34 l-6 -16 14 8z' fill='#E3A857' />
      <path d='M84 34 l10 -14 8 12z' fill='#E3A857' />
      <circle cx='66' cy='46' r='2.4' fill='#0B1F3A' />
      <circle cx='80' cy='44' r='2' fill='#0B1F3A' />
      <ellipse cx='60' cy='55' rx='7' ry='5' fill='#ffffff' />
      <rect x='95' y='66' width='10' height='16' rx='4' fill='#E3A857' />
      <rect x='150' y='66' width='10' height='16' rx='4' fill='#E3A857' />
    </svg>
  );
}

export function AdvisorIllustration() {
  return (
    <svg
      viewBox='0 0 360 320'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className='h-auto w-full max-w-sm'
      role='img'
      aria-label='Illustration of an advisor chat on a phone next to a person seated with their own phone'
    >
      <rect x='10' y='16' width='150' height='260' rx='24' fill='#ffffff' />
      <rect x='24' y='40' width='122' height='170' rx='12' fill='#E7F1F7' />
      <circle cx='85' cy='90' r='34' fill='#1E7F86' />
      <circle cx='85' cy='80' r='14' fill='#ffffff' />
      <path
        d='M64 106c4-14 38-14 42 0'
        stroke='#ffffff'
        strokeWidth='6'
        fill='none'
        strokeLinecap='round'
      />

      <rect x='150' y='40' width='90' height='40' rx='16' fill='#1E7F86' />
      <rect x='163' y='54' width='50' height='6' rx='3' fill='#ffffff' />
      <rect x='163' y='64' width='34' height='6' rx='3' fill='#ffffff' opacity='0.7' />

      <rect x='210' y='96' width='80' height='40' rx='16' fill='#BFE1F5' />
      <rect x='223' y='110' width='46' height='6' rx='3' fill='#0B1F3A' opacity='0.6' />
      <rect x='223' y='120' width='30' height='6' rx='3' fill='#0B1F3A' opacity='0.4' />

      {/* seated person */}
      <rect x='190' y='250' width='70' height='16' rx='6' fill='#0B1F3A' opacity='0.25' />
      <rect x='210' y='170' width='16' height='80' rx='6' fill='#8A5A3B' />
      <rect x='195' y='180' width='50' height='55' rx='20' fill='#F2B94A' />
      <circle cx='220' cy='162' r='16' fill='#8A5A3B' />
      <rect
        x='188'
        y='200'
        width='40'
        height='16'
        rx='8'
        fill='#F2B94A'
        transform='rotate(18 188 200)'
      />
      <rect x='215' y='230' width='14' height='34' rx='6' fill='#0B1F3A' opacity='0.85' />
      <rect x='234' y='230' width='14' height='34' rx='6' fill='#0B1F3A' opacity='0.85' />
      <rect x='196' y='206' width='16' height='24' rx='4' fill='#ffffff' />
    </svg>
  );
}
