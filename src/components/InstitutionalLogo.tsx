import React from 'react';

export default function InstitutionalLogo({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_0_10px_rgba(204,0,0,0.3)]">
        {/* Outer Ring */}
        <circle cx="100" cy="100" r="98" stroke="#cc0000" strokeWidth="2" fill="white" />
        <circle cx="100" cy="100" r="92" stroke="#cc0000" strokeWidth="1" fill="none" />
        
        {/* Inner quadrants background */}
        <mask id="quadrantsMask">
          <circle cx="100" cy="100" r="80" fill="white" />
        </mask>
        
        <g mask="url(#quadrantsMask)">
          {/* Top Left - Red */}
          <rect x="20" y="20" width="80" height="80" fill="#cc0000" />
          {/* Top Right - Dark Grey */}
          <rect x="100" y="20" width="80" height="80" fill="#4b4b4b" />
          {/* Bottom Left - Dark Grey */}
          <rect x="20" y="100" width="80" height="80" fill="#4b4b4b" />
          {/* Bottom Right - Red */}
          <rect x="100" y="100" width="80" height="80" fill="#cc0000" />
        </g>

        {/* Quadrant Lines */}
        <line x1="20" y1="100" x2="180" y2="100" stroke="white" strokeWidth="2" />
        <line x1="100" y1="20" x2="100" y2="180" stroke="white" strokeWidth="2" />

        {/* Quadrant Icons (Simplified representations) */}
        {/* Top Left - Portrait 1 */}
        <circle cx="60" cy="55" r="15" fill="white" opacity="0.9" />
        <path d="M45 85 Q60 75 75 85" stroke="white" strokeWidth="3" fill="none" />
        
        {/* Top Right - Portrait 2 */}
        <circle cx="140" cy="55" r="15" fill="white" opacity="0.9" />
        <path d="M125 85 Q140 75 155 85" stroke="white" strokeWidth="3" fill="none" />

        {/* Bottom Left - Monument */}
        <rect x="45" y="120" width="30" height="40" fill="white" opacity="0.9" />
        <path d="M45 120 L60 110 L75 120" fill="white" />

        {/* Bottom Right - Education */}
        <path d="M120 140 L140 130 L160 140 L140 150 Z" fill="white" />
        <rect x="135" y="150" width="10" height="15" fill="white" />

        {/* Center Shield */}
        <path d="M85 85 Q100 80 115 85 L115 110 Q100 125 85 110 Z" fill="white" stroke="#cc0000" strokeWidth="1" />
        <path d="M100 90 L103 98 L111 98 L105 103 L107 111 L100 106 L113 111 L95 103 L89 98 L97 98 Z" fill="#cc0000" transform="scale(0.8) translate(25, 25)" />
        <polygon points="100,92 103,99 110,99 105,103 107,110 100,106 93,110 95,103 90,99 97,99" fill="#cc0000" />
        
        {/* Stars */}
        <polygon points="25,100 28,97 32,100 29,103" fill="#cc0000" transform="translate(-10, 0)" />
        <polygon points="175,100 172,97 168,100 171,103" fill="#cc0000" transform="translate(10, 0)" />
        <path d="M22 100 L32 100 M27 95 L27 105" stroke="#cc0000" strokeWidth="2" />
        <path d="M168 100 L178 100 M173 95 L173 105" stroke="#cc0000" strokeWidth="2" />

        {/* Better Stars */}
        <path d="M20 100 L25 93 L30 100 L25 107 Z" fill="#cc0000" />
        <path d="M170 100 L175 93 L180 100 L175 107 Z" fill="#cc0000" />
      </svg>
      {/* Decorative Text Ring using SVG textPath would be ideal, but here we can just ensure the container looks right */}
    </div>
  );
}
