import React from 'react';

export default (props) => {
  return(
    <svg className="logo" width="60" height="60" viewBox="0 0 40 40">
      <defs>
        <linearGradient id="linear-gradient" x1="14.56" y1="25.03" x2="29.38" y2="11.33" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#a9bcd8"/>
          <stop offset="1" stopColor="#fff"/>
        </linearGradient>
      </defs>
      <path fill="url(#linear-gradient)" d="M20.86,19.27V11.81a8.4,8.4,0,0,1,5.6,3l1.33-1.09a10.08,10.08,0,0,0-6.93-3.63V6h8.33V4.26h-10v5.83a10.08,10.08,0,0,0,0,20.09v5.56h1.72V30.18a10.1,10.1,0,0,0,9.23-10v-.86Zm-9.23.86a8.38,8.38,0,0,1,7.51-8.32V28.45A8.37,8.37,0,0,1,11.63,20.13Zm9.23,8.32V21h7.46A8.37,8.37,0,0,1,20.86,28.45Z"/>
      <rect fill="none" width="60" height="60"/>
    </svg>
  )
}