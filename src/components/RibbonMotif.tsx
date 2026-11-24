import React from 'react';

export function SatinBow({ className = 'w-14 h-9', color = '#D47A92' }: { className?: string; color?: string }) {
  return (
    <svg
      viewBox="0 0 120 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Left ribbon loop */}
      <path
        d="M57 32C45 14 21 8 13 21C6 32 19 46 39 39C48 36 54 34 57 32Z"
        fill={color}
        fillOpacity="0.22"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M53 31C42 22 25 21 20 27"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.7"
      />
      {/* Right ribbon loop */}
      <path
        d="M63 32C75 14 99 8 107 21C114 32 101 46 81 39C72 36 66 34 63 32Z"
        fill={color}
        fillOpacity="0.22"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M67 31C78 22 95 21 100 27"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.7"
      />
      {/* Left ribbon tail */}
      <path
        d="M56 36C49 48 42 58 32 66C36 60 40 53 42 46C46 43 52 39 56 36Z"
        fill={color}
        fillOpacity="0.16"
        stroke={color}
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Right ribbon tail */}
      <path
        d="M64 36C71 48 78 58 88 66C84 60 80 53 78 46C74 43 68 39 64 36Z"
        fill={color}
        fillOpacity="0.16"
        stroke={color}
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Center silk knot */}
      <rect
        x="53"
        y="25"
        width="14"
        height="13"
        rx="5"
        fill="#FDF9F9"
        stroke={color}
        strokeWidth="2.2"
      />
    </svg>
  );
}

export function LaceDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 py-2 ${className}`} aria-hidden="true">
      <div className="h-px flex-1 bg-[#EBD8DD]" />
      <SatinBow className="w-11 h-7 shrink-0" color="#C96D87" />
      <div className="h-px flex-1 bg-[#EBD8DD]" />
    </div>
  );
}

export function HelloKittySticker({
  className = 'w-14 h-12',
  bowColor = '#F37BA4',
}: {
  className?: string;
  bowColor?: string;
}) {
  const headPath =
    'M 44 24 C 52 21, 68 21, 76 24 C 85 15, 95 10, 99 15 C 103 20, 102 31, 101 38 C 108 48, 109 64, 102 75 C 94 87, 78 92, 60 92 C 42 92, 26 87, 18 75 C 11 64, 12 48, 19 38 C 18 31, 17 20, 21 15 C 25 10, 35 15, 44 24 Z';

  return (
    <svg
      viewBox="0 0 120 104"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none drop-shadow-[0_4px_8px_rgba(117,32,57,0.24)] ${className}`}
      aria-hidden="true"
    >
      {/* Die-cut glossy white sticker border */}
      <path
        d={headPath}
        fill="#FFFFFF"
        stroke="#FFFFFF"
        strokeWidth="9"
        strokeLinejoin="round"
      />
      <g transform="translate(86, 25) rotate(22)">
        <ellipse cx="-10" cy="0" rx="10" ry="8" fill="#FFFFFF" stroke="#FFFFFF" strokeWidth="7" />
        <ellipse cx="10" cy="0" rx="10" ry="8" fill="#FFFFFF" stroke="#FFFFFF" strokeWidth="7" />
      </g>

      {/* Head base */}
      <path
        d={headPath}
        fill="#FFFDFD"
        stroke="#4A2230"
        strokeWidth="2.8"
        strokeLinejoin="round"
      />

      {/* Soft pink blush cheeks */}
      <ellipse cx="30" cy="68" rx="5.6" ry="3.1" fill="#F9B3CA" opacity="0.72" />
      <ellipse cx="90" cy="68" rx="5.6" ry="3.1" fill="#F9B3CA" opacity="0.72" />

      {/* Classic eyes */}
      <ellipse cx="38" cy="59" rx="3.4" ry="4.7" fill="#4A2230" />
      <ellipse cx="82" cy="59" rx="3.4" ry="4.7" fill="#4A2230" />

      {/* Golden-yellow nose */}
      <ellipse
        cx="60"
        cy="66.5"
        rx="4.6"
        ry="3.2"
        fill="#F8C146"
        stroke="#4A2230"
        strokeWidth="2"
      />

      {/* Left whiskers */}
      <path d="M 7 52 L 22 55" stroke="#4A2230" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 5 61 L 21 61" stroke="#4A2230" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 8 70 L 22 67" stroke="#4A2230" strokeWidth="2.5" strokeLinecap="round" />

      {/* Right whiskers */}
      <path d="M 113 52 L 98 55" stroke="#4A2230" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 115 61 L 99 61" stroke="#4A2230" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 112 70 L 98 67" stroke="#4A2230" strokeWidth="2.5" strokeLinecap="round" />

      {/* Signature pink Hello Kitty bow on ear */}
      <g transform="translate(86, 25) rotate(22)">
        <ellipse
          cx="-10.5"
          cy="0"
          rx="10"
          ry="7.8"
          fill={bowColor}
          stroke="#4A2230"
          strokeWidth="2.4"
        />
        <ellipse
          cx="10.5"
          cy="0"
          rx="10"
          ry="7.8"
          fill={bowColor}
          stroke="#4A2230"
          strokeWidth="2.4"
        />
        <circle cx="-11.5" cy="0" r="2.2" fill="#FFD1E1" opacity="0.85" />
        <circle cx="11.5" cy="0" r="2.2" fill="#FFD1E1" opacity="0.85" />
        <circle
          cx="0"
          cy="0"
          r="5"
          fill={bowColor}
          stroke="#4A2230"
          strokeWidth="2.4"
        />
      </g>
    </svg>
  );
}

export function HelloKittyPeekingHead({
  className = 'w-28 h-24',
  bowColor = '#F37BA4',
}: {
  className?: string;
  bowColor?: string;
}) {
  const headPath =
    'M 44 24 C 52 21, 68 21, 76 24 C 85 15, 95 10, 99 15 C 103 20, 102 31, 101 38 C 108 48, 109 64, 102 75 C 94 87, 78 92, 60 92 C 42 92, 26 87, 18 75 C 11 64, 12 48, 19 38 C 18 31, 17 20, 21 15 C 25 10, 35 15, 44 24 Z';

  return (
    <svg
      viewBox="0 0 120 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none drop-shadow-[0_4px_10px_rgba(117,32,57,0.18)] ${className}`}
      aria-hidden="true"
    >
      {/* Head base */}
      <path
        d={headPath}
        fill="#FFFDFD"
        stroke="#4A2230"
        strokeWidth="2.8"
        strokeLinejoin="round"
      />

      {/* Soft pink blush cheeks */}
      <ellipse cx="30" cy="68" rx="5.6" ry="3.1" fill="#F9B3CA" opacity="0.72" />
      <ellipse cx="90" cy="68" rx="5.6" ry="3.1" fill="#F9B3CA" opacity="0.72" />

      {/* Classic eyes */}
      <ellipse cx="38" cy="59" rx="3.4" ry="4.7" fill="#4A2230" />
      <ellipse cx="82" cy="59" rx="3.4" ry="4.7" fill="#4A2230" />

      {/* Golden-yellow nose */}
      <ellipse
        cx="60"
        cy="66.5"
        rx="4.6"
        ry="3.2"
        fill="#F8C146"
        stroke="#4A2230"
        strokeWidth="2"
      />

      {/* Whiskers */}
      <path d="M 7 52 L 22 55" stroke="#4A2230" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 5 61 L 21 61" stroke="#4A2230" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 8 70 L 22 67" stroke="#4A2230" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 113 52 L 98 55" stroke="#4A2230" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 115 61 L 99 61" stroke="#4A2230" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 112 70 L 98 67" stroke="#4A2230" strokeWidth="2.5" strokeLinecap="round" />

      {/* Signature pink Hello Kitty bow */}
      <g transform="translate(86, 25) rotate(22)">
        <ellipse
          cx="-10.5"
          cy="0"
          rx="10"
          ry="7.8"
          fill={bowColor}
          stroke="#4A2230"
          strokeWidth="2.4"
        />
        <ellipse
          cx="10.5"
          cy="0"
          rx="10"
          ry="7.8"
          fill={bowColor}
          stroke="#4A2230"
          strokeWidth="2.4"
        />
        <circle cx="-11.5" cy="0" r="2.2" fill="#FFD1E1" opacity="0.85" />
        <circle cx="11.5" cy="0" r="2.2" fill="#FFD1E1" opacity="0.85" />
        <circle
          cx="0"
          cy="0"
          r="5"
          fill={bowColor}
          stroke="#4A2230"
          strokeWidth="2.4"
        />
      </g>
    </svg>
  );
}

export function HelloKittyGripPaw({ className = 'w-9 h-7' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 44 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none drop-shadow-[0_3px_5px_rgba(117,32,57,0.18)] ${className}`}
      aria-hidden="true"
    >
      <path
        d="M8 14 C8 6, 15 3, 22 3 C29 3, 36 6, 36 14 L36 22 C36 27.5, 30 31, 22 31 C14 31, 8 27.5, 8 22 Z"
        fill="#FFFDFD"
        stroke="#4A2230"
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
      {/* Cute little pink paw pad */}
      <ellipse cx="22" cy="20" rx="5.5" ry="4" fill="#F9B3CA" opacity="0.7" />
      <circle cx="16.5" cy="12.5" r="2" fill="#F9B3CA" opacity="0.7" />
      <circle cx="22" cy="11" r="2" fill="#F9B3CA" opacity="0.7" />
      <circle cx="27.5" cy="12.5" r="2" fill="#F9B3CA" opacity="0.7" />
    </svg>
  );
}

export function HelloKittySurpriseCharacter({
  className = 'w-32 h-32',
  bowColor = '#F37BA4',
}: {
  className?: string;
  bowColor?: string;
}) {
  const headPath =
    'M 54 30 C 62 27, 78 27, 86 30 C 95 21, 105 16, 109 21 C 113 26, 112 37, 111 44 C 118 54, 119 70, 112 81 C 104 93, 88 98, 70 98 C 52 98, 36 93, 28 81 C 21 70, 22 54, 29 44 C 28 37, 27 26, 31 21 C 35 16, 45 21, 54 30 Z';

  return (
    <svg
      viewBox="0 0 140 154"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none drop-shadow-[0_8px_16px_rgba(117,32,57,0.22)] ${className}`}
      aria-hidden="true"
    >
      {/* Cute little feet */}
      <ellipse cx="56" cy="138" rx="11" ry="7" fill="#FFFDFD" stroke="#4A2230" strokeWidth="2.6" />
      <ellipse cx="84" cy="138" rx="11" ry="7" fill="#FFFDFD" stroke="#4A2230" strokeWidth="2.6" />

      {/* Waving left arm */}
      <path
        d="M 45 102 C 30 96, 22 84, 28 76 C 34 69, 43 76, 48 89 Z"
        fill="#FFFDFD"
        stroke="#4A2230"
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
      {/* Pink sleeve on left arm */}
      <path
        d="M 47 93 C 42 91, 38 93, 37 98 L 46 104 Z"
        fill="#FFD4E3"
        stroke="#4A2230"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />

      {/* Right arm reaching forward with heart */}
      <path
        d="M 94 102 C 107 98, 116 90, 112 82 C 108 75, 98 81, 92 92 Z"
        fill="#FFFDFD"
        stroke="#4A2230"
        strokeWidth="2.6"
        strokeLinejoin="round"
      />

      {/* Pink overalls / dress body */}
      <path
        d="M 48 94 L 92 94 L 96 132 C 96 136, 84 138, 70 138 C 56 138, 44 136, 44 132 Z"
        fill="#F793B7"
        stroke="#4A2230"
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
      {/* White shirt collar & shoulder straps */}
      <path
        d="M 52 94 L 58 106 L 82 106 L 88 94 Z"
        fill="#FFFDFD"
        stroke="#4A2230"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <rect x="52" y="94" width="7" height="16" rx="2" fill="#F37BA4" stroke="#4A2230" strokeWidth="2" />
      <rect x="81" y="94" width="7" height="16" rx="2" fill="#F37BA4" stroke="#4A2230" strokeWidth="2" />
      <circle cx="55.5" cy="107" r="2.3" fill="#F8C146" stroke="#4A2230" strokeWidth="1.4" />
      <circle cx="84.5" cy="107" r="2.3" fill="#F8C146" stroke="#4A2230" strokeWidth="1.4" />

      {/* Head */}
      <path
        d={headPath}
        fill="#FFFDFD"
        stroke="#4A2230"
        strokeWidth="2.8"
        strokeLinejoin="round"
      />

      {/* Soft pink blush cheeks */}
      <ellipse cx="40" cy="74" rx="5.6" ry="3.1" fill="#F9B3CA" opacity="0.75" />
      <ellipse cx="100" cy="74" rx="5.6" ry="3.1" fill="#F9B3CA" opacity="0.75" />

      {/* Happy winking / bright eyes */}
      <ellipse cx="48" cy="65" rx="3.4" ry="4.7" fill="#4A2230" />
      <path
        d="M 88 65 C 91 61, 95 61, 98 65"
        stroke="#4A2230"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Golden-yellow nose */}
      <ellipse
        cx="70"
        cy="72.5"
        rx="4.6"
        ry="3.2"
        fill="#F8C146"
        stroke="#4A2230"
        strokeWidth="2"
      />

      {/* Whiskers */}
      <path d="M 17 58 L 32 61" stroke="#4A2230" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 15 67 L 31 67" stroke="#4A2230" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 18 76 L 32 73" stroke="#4A2230" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 123 58 L 108 61" stroke="#4A2230" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 125 67 L 109 67" stroke="#4A2230" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 122 76 L 108 73" stroke="#4A2230" strokeWidth="2.5" strokeLinecap="round" />

      {/* Signature pink Hello Kitty bow */}
      <g transform="translate(96, 31) rotate(22)">
        <ellipse
          cx="-10.5"
          cy="0"
          rx="10"
          ry="7.8"
          fill={bowColor}
          stroke="#4A2230"
          strokeWidth="2.4"
        />
        <ellipse
          cx="10.5"
          cy="0"
          rx="10"
          ry="7.8"
          fill={bowColor}
          stroke="#4A2230"
          strokeWidth="2.4"
        />
        <circle cx="-11.5" cy="0" r="2.2" fill="#FFD1E1" opacity="0.85" />
        <circle cx="11.5" cy="0" r="2.2" fill="#FFD1E1" opacity="0.85" />
        <circle cx="0" cy="0" r="5" fill={bowColor} stroke="#4A2230" strokeWidth="2.4" />
      </g>

      {/* Heart held in paw */}
      <path
        d="M 116 92 C 116 88, 121 86, 123.5 89.5 C 126 86, 131 88, 131 92 C 131 97, 123.5 102, 123.5 102 C 123.5 102, 116 97, 116 92 Z"
        fill="#E44D78"
        stroke="#4A2230"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}



