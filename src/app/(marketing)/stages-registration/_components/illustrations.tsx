export function HeroIllustration() {
  return (
    <svg
      viewBox='0 0 420 340'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className='h-auto w-full max-w-md'
      role='img'
      aria-label='Illustration of a phone showing retirement progress next to a person relaxing on a couch'
    >
      {/* floor lamp */}
      <line
        x1='392'
        y1='40'
        x2='392'
        y2='300'
        stroke='#9FC9E8'
        strokeWidth='4'
        strokeLinecap='round'
      />
      <path d='M368 40 h48 l-10 26 h-28 z' fill='#9FC9E8' />
      <circle cx='392' cy='300' r='8' fill='#9FC9E8' />

      {/* progress card */}
      <rect x='150' y='8' width='190' height='120' rx='12' fill='#ffffff' />
      <rect x='150' y='8' width='190' height='62' rx='12' fill='#1E7F86' />
      <rect x='150' y='58' width='190' height='12' fill='#1E7F86' />
      <path
        d='M172 58c10-30 24-30 30-8 8-26 22-24 28 0'
        stroke='#2FAE60'
        strokeWidth='3'
        fill='none'
        opacity='0.5'
      />
      <circle cx='190' cy='40' r='14' fill='#2FAE60' opacity='0.85' />
      <circle cx='235' cy='34' r='10' fill='#2FAE60' opacity='0.6' />
      <text x='163' y='98' fontSize='13' fontWeight='600' fill='#0B1F3A'>
        My retirement —
      </text>
      <text x='163' y='116' fontSize='13' fontWeight='700' fill='#1E9E5A'>
        on track
      </text>
      <circle cx='249' cy='111' r='8' fill='#1E9E5A' />
      <path
        d='M245.5 111l2.5 2.5 5-5'
        stroke='white'
        strokeWidth='1.6'
        fill='none'
        strokeLinecap='round'
        strokeLinejoin='round'
      />

      {/* speech bubble connecting card to person */}
      <circle cx='200' cy='150' r='7' fill='#ffffff' />
      <circle cx='188' cy='166' r='4' fill='#ffffff' />

      {/* couch */}
      <rect x='60' y='210' width='240' height='70' rx='24' fill='#0B1F3A' />
      <rect x='50' y='190' width='60' height='60' rx='16' fill='#0B1F3A' />
      <rect x='40' y='250' width='16' height='40' rx='4' fill='#8A5A3B' />
      <rect x='250' y='250' width='16' height='40' rx='4' fill='#8A5A3B' />

      {/* person */}
      <ellipse cx='165' cy='260' rx='42' ry='16' fill='#0E2A4D' />
      <rect x='140' y='190' width='40' height='60' rx='18' fill='#F2B94A' />
      <circle cx='160' cy='176' r='16' fill='#8A5A3B' />
      <rect
        x='150'
        y='230'
        width='55'
        height='20'
        rx='10'
        fill='#4E6FE0'
        transform='rotate(12 150 230)'
      />
      <rect x='118' y='236' width='60' height='20' rx='10' fill='#4E6FE0' />
      <rect x='120' y='260' width='16' height='34' rx='6' fill='#dfe7f5' />
      <rect x='150' y='262' width='16' height='34' rx='6' fill='#dfe7f5' />
      <rect x='168' y='214' width='18' height='30' rx='4' fill='#ffffff' />
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
