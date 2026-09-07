export function OldManMascot({ className }: { className?: string }) {
  return (
    <svg
      viewBox='0 0 100 100'
      className={className}
      aria-hidden='true'
      focusable='false'
    >
      <g fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
        {/* shoulders */}
        <path d='M18 96c2-15 13-23 32-23s30 8 32 23' />

        <g className='old-man-mascot-head'>
          {/* neck */}
          <path d='M44 57v9M56 57v9' />
          {/* ears */}
          <path d='M27 38c-4 1-4 9 0 10' />
          <path d='M73 38c4 1 4 9 0 10' />
          {/* head */}
          <circle cx='50' cy='40' r='22' />
          {/* side hair tufts */}
          <path d='M26 32c-3 5-2 12 2 16' opacity='0.7' />
          <path d='M74 32c3 5 2 12-2 16' opacity='0.7' />
          {/* eyebrows */}
          <path d='M37 33c3-2 7-2 10 0' />
          <path d='M53 33c3-2 7-2 10 0' />
          {/* glasses */}
          <circle cx='42' cy='40' r='6.5' />
          <circle cx='58' cy='40' r='6.5' />
          <path d='M48.5 40h3' />
          <path d='M35.5 39l-5-1.5' />
          <path d='M64.5 39l5-1.5' />
          {/* pupils, animated separately from the head turn */}
          <g className='old-man-mascot-eyes'>
            <circle cx='42' cy='40' r='1.5' fill='currentColor' stroke='none' />
            <circle cx='58' cy='40' r='1.5' fill='currentColor' stroke='none' />
          </g>
          {/* nose */}
          <path d='M50 41v7c0 1.5 1.5 2.5 3.5 1.8' />
          {/* mustache */}
          <path d='M39 55c4-3.5 7-3.5 11 0c4-3.5 7-3.5 11 0' />
          {/* mouth */}
          <path d='M45.5 59c3 2 6 2 9 0' />
          {/* crow's feet */}
          <path d='M32 41.5c1-0.8 2-0.8 3 0' opacity='0.6' />
          <path d='M65 41.5c1-0.8 2-0.8 3 0' opacity='0.6' />
        </g>
      </g>
    </svg>
  );
}
