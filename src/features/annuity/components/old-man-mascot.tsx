const SKIN = '#f2c49c';
const HAIR = '#d8d2c4';
const OUTLINE = '#5b4636';
const GLASSES = '#4a3b2c';
const EYE_WHITE = '#fffaf3';
const PUPIL = '#3a2e22';
const CHEEK = '#ef9c86';
const SMILE = '#9a4a34';
const SWEATER = '#d98a3d';
const COLLAR = '#f5ead9';

export function OldManMascot({ className }: { className?: string }) {
  return (
    <svg viewBox='0 0 100 100' className={className} aria-hidden='true' focusable='false'>
      {/* sweater + collar (stays put while the head turns) */}
      <path
        d='M14 100c2-17 14-27 36-27s34 10 36 27z'
        fill={SWEATER}
        stroke={OUTLINE}
        strokeWidth='2'
        strokeLinejoin='round'
      />
      <path
        d='M39 75l11 11l11-11'
        fill='none'
        stroke={COLLAR}
        strokeWidth='5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />

      <g className='old-man-mascot-head'>
        {/* neck */}
        <path
          d='M42 58h16v12h-16z'
          fill={SKIN}
          stroke={OUTLINE}
          strokeWidth='2'
          strokeLinejoin='round'
        />
        {/* ears */}
        <ellipse cx='27' cy='43' rx='4' ry='6.5' fill={SKIN} stroke={OUTLINE} strokeWidth='1.75' />
        <ellipse cx='73' cy='43' rx='4' ry='6.5' fill={SKIN} stroke={OUTLINE} strokeWidth='1.75' />
        {/* head */}
        <circle cx='50' cy='42' r='23' fill={SKIN} stroke={OUTLINE} strokeWidth='2' />
        {/* thin hairline fringe on top */}
        <path
          d='M29 26c9-8 33-8 42 0c-7-3-35-3-42 0z'
          fill={HAIR}
          stroke={OUTLINE}
          strokeWidth='1.25'
          strokeLinejoin='round'
        />
        {/* side hair tufts */}
        <path
          d='M25 32c-5 8-4 19 4 24c-3-8-4-17-1-24z'
          fill={HAIR}
          stroke={OUTLINE}
          strokeWidth='1.25'
          strokeLinejoin='round'
        />
        <path
          d='M75 32c5 8 4 19-4 24c3-8 4-17 1-24z'
          fill={HAIR}
          stroke={OUTLINE}
          strokeWidth='1.25'
          strokeLinejoin='round'
        />
        {/* rosy cheeks */}
        <ellipse cx='35' cy='51' rx='5' ry='3.5' fill={CHEEK} opacity='0.55' />
        <ellipse cx='65' cy='51' rx='5' ry='3.5' fill={CHEEK} opacity='0.55' />
        {/* eyebrows */}
        <path
          d='M33 32c3-3 9-3 12 0'
          fill='none'
          stroke={HAIR}
          strokeWidth='3'
          strokeLinecap='round'
        />
        <path
          d='M55 32c3-3 9-3 12 0'
          fill='none'
          stroke={HAIR}
          strokeWidth='3'
          strokeLinecap='round'
        />
        {/* eyes, behind the lenses */}
        <circle cx='40' cy='41' r='3.2' fill={EYE_WHITE} stroke={OUTLINE} strokeWidth='1' />
        <circle cx='60' cy='41' r='3.2' fill={EYE_WHITE} stroke={OUTLINE} strokeWidth='1' />
        {/* pupils, animated separately from the head turn */}
        <g className='old-man-mascot-eyes'>
          <circle cx='40' cy='41' r='1.6' fill={PUPIL} />
          <circle cx='60' cy='41' r='1.6' fill={PUPIL} />
        </g>
        {/* glasses */}
        <g
          fill='none'
          stroke={GLASSES}
          strokeWidth='2.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <circle cx='40' cy='41' r='8.5' />
          <circle cx='60' cy='41' r='8.5' />
          <path d='M48.5 41h3' />
          <path d='M31.5 39l-6-2' />
          <path d='M68.5 39l6-2' />
        </g>
        {/* nose */}
        <path
          d='M50 42c0 3-2 6 0 8c1.5 1 3.5 0.5 4-1'
          fill='none'
          stroke={OUTLINE}
          strokeWidth='1.75'
          strokeLinecap='round'
        />
        {/* smile */}
        <path
          d='M41 58c4 4 14 4 18 0'
          fill='none'
          stroke={SMILE}
          strokeWidth='2.5'
          strokeLinecap='round'
        />
        {/* mustache, sitting just under the nose, clear of the smile */}
        <path
          d='M37 51c4-3.5 8-3.5 13 0c5-3.5 9-3.5 13 0c-2 3-8 2-13 0.5c-5 1.5-11 2.5-13-0.5z'
          fill={HAIR}
          stroke={OUTLINE}
          strokeWidth='1.25'
          strokeLinejoin='round'
        />
      </g>
    </svg>
  );
}
