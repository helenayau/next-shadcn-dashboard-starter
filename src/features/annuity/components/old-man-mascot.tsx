const BADGE = '#8fb3de';
const SKIN = '#f4c9a0';
const SKIN_SHADE = '#e6ab78';
const HAIR = '#f7f8fa';
const HAIR_SHADE = '#d7dde2';
const GLASSES = '#24262b';
const EYE = '#2f3238';
const MOUTH = '#c96f5a';
const BLAZER = '#383c44';
const SWEATER = '#5c3a63';
const COLLAR = '#f5f5f5';
const TIE = '#e8b23c';
const TIE_STRIPE = '#d94f6b';

export function OldManMascot({ className }: { className?: string }) {
  return (
    <svg viewBox='0 0 100 100' className={className} aria-hidden='true' focusable='false'>
      {/* circular badge background */}
      <circle cx='50' cy='42' r='42' fill={BADGE} />

      {/* blazer, sweater, collar and tie (stay put while the head turns) */}
      <path d='M6 100c3-24 20-36 44-36s41 12 44 36z' fill={BLAZER} />
      <path d='M32 68h36l8 32h-52z' fill={SWEATER} />
      <path d='M42 65l8 13l8-13l-3 0l-5 8l-5-8z' fill={COLLAR} />
      <path d='M47 68h6l-2 5h-2z' fill={TIE} />
      <path d='M48 73h4l5 27h-14z' fill={TIE} />
      <path d='M46 84l9-4l1 3l-9 4z' fill={TIE_STRIPE} />
      <path d='M45 92l10-4l1 3l-10 4z' fill={TIE_STRIPE} />

      <g className='old-man-mascot-head'>
        {/* neck */}
        <path d='M43 58h14v10h-14z' fill={SKIN} />
        {/* ears */}
        <ellipse cx='25' cy='42' rx='3.5' ry='5.5' fill={SKIN} />
        <ellipse cx='75' cy='42' rx='3.5' ry='5.5' fill={SKIN} />
        {/* head */}
        <circle cx='50' cy='38' r='26' fill={SKIN} />
        {/* subtle side shading for depth */}
        <path
          d='M62 17c9 6 12 17 9 28c-3 9-9 15-13 17c7-6 11-15 11-23c0-9-3-16-7-22z'
          fill={SKIN_SHADE}
          opacity='0.55'
        />
        {/* side hair */}
        <path
          d='M23 19c-9 8-11 25-2 35c6 6 12 8 14 6c-8-5-14-15-16-25c-1-6 0-11 4-16z'
          fill={HAIR}
          stroke={HAIR_SHADE}
          strokeWidth='1'
          strokeLinejoin='round'
        />
        <path
          d='M77 19c9 8 11 25 2 35c-6 6-12 8-14 6c8-5 14-15 16-25c1-6 0-11-4-16z'
          fill={HAIR}
          stroke={HAIR_SHADE}
          strokeWidth='1'
          strokeLinejoin='round'
        />
        {/* eyebrows */}
        <path
          d='M32 29c4-4 10-4 14-1'
          fill='none'
          stroke={HAIR}
          strokeWidth='3'
          strokeLinecap='round'
        />
        <path
          d='M54 28c4-3 10-3 14 1'
          fill='none'
          stroke={HAIR}
          strokeWidth='3'
          strokeLinecap='round'
        />
        {/* glasses */}
        <g
          fill='none'
          stroke={GLASSES}
          strokeWidth='3.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <circle cx='40' cy='40' r='9.5' />
          <circle cx='60' cy='40' r='9.5' />
          <path d='M49.5 40h1' />
          <path d='M30 38l-6-2' />
          <path d='M70 38l6-2' />
        </g>
        {/* closed, happy eyes */}
        <path
          d='M36 41c2 3 6 3 8 0'
          fill='none'
          stroke={EYE}
          strokeWidth='2'
          strokeLinecap='round'
        />
        <path
          d='M56 41c2 3 6 3 8 0'
          fill='none'
          stroke={EYE}
          strokeWidth='2'
          strokeLinecap='round'
        />
        {/* nose */}
        <path
          d='M50 41c0 4-2 7 0 9'
          fill='none'
          stroke={SKIN_SHADE}
          strokeWidth='1.5'
          strokeLinecap='round'
        />
        {/* mustache */}
        <path
          d='M34 54c5-5 10-5 16-1c6-4 11-4 16 1c-3 5-10 4-16 1c-6 3-13 4-16-1z'
          fill={HAIR}
          stroke={HAIR_SHADE}
          strokeWidth='1'
          strokeLinejoin='round'
        />
        {/* smile, peeking beneath the mustache */}
        <path
          d='M45 58c3 2 7 2 10 0'
          fill='none'
          stroke={MOUTH}
          strokeWidth='2'
          strokeLinecap='round'
        />
        {/* soft chin line */}
        <path
          d='M40 61c4 3 16 3 20 0'
          fill='none'
          stroke={SKIN_SHADE}
          strokeWidth='1'
          opacity='0.5'
          strokeLinecap='round'
        />
      </g>
    </svg>
  );
}
