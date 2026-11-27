import React from 'react';

interface AiNeuralLogoProps {
  className?: string;
  size?: number;
  glow?: boolean;
}

export function AiNeuralLogo({ className = 'w-6 h-6', size = 24, glow = true }: AiNeuralLogoProps) {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {glow && (
        <span 
          className="absolute inset-0 rounded-full blur-md bg-gradient-to-tr from-[#FF9E2C]/50 via-[#FFD08A]/40 to-[#FF9E2C]/20 pointer-events-none animate-pulse"
          style={{ transform: 'scale(1.25)' }}
        />
      )}
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 drop-shadow-[0_2px_8px_rgba(255,173,73,0.4)]"
      >
        <defs>
          {/* Main Gold/Amber Holographic Gradient */}
          <linearGradient id="neuralGoldMain" x1="2" y1="2" x2="30" y2="30" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFF4D9" />
            <stop offset="25%" stopColor="#FFC876" />
            <stop offset="60%" stopColor="#FF9F2E" />
            <stop offset="100%" stopColor="#C46B00" />
          </linearGradient>

          {/* Accent Core Glow */}
          <radialGradient id="neuralCoreGlow" cx="16" cy="16" r="10" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="40%" stopColor="#FFD08A" stopOpacity="0.8" />
            <stop offset="80%" stopColor="#FF9F2E" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#FF9F2E" stopOpacity="0" />
          </radialGradient>

          {/* Deep Shadow Facet Gradient */}
          <linearGradient id="neuralFacetDark" x1="8" y1="8" x2="24" y2="24" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#2A241B" />
            <stop offset="100%" stopColor="#14120E" />
          </linearGradient>
        </defs>

        {/* Outer Hexagonal Shield / Quantum Diamond */}
        <path
          d="M16 2.5L28.5 9.7V22.3L16 29.5L3.5 22.3V9.7L16 2.5Z"
          fill="url(#neuralFacetDark)"
          stroke="url(#neuralGoldMain)"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />

        {/* Inner Geometric Refraction Facets */}
        <path
          d="M16 2.5L28.5 22.3H3.5L16 2.5Z"
          stroke="url(#neuralGoldMain)"
          strokeWidth="0.75"
          strokeOpacity="0.45"
        />
        <path
          d="M16 29.5L3.5 9.7H28.5L16 29.5Z"
          stroke="url(#neuralGoldMain)"
          strokeWidth="0.75"
          strokeOpacity="0.45"
        />

        {/* Ambient Core Radial Flash */}
        <circle cx="16" cy="16" r="8" fill="url(#neuralCoreGlow)" />

        {/* Dynamic 4-Point Radiant Intelligence Star */}
        <path
          d="M16 7C16 11.8 12.8 16 7 16C12.8 16 16 20.2 16 25C16 20.2 19.2 16 25 16C19.2 16 16 11.8 16 7Z"
          fill="url(#neuralGoldMain)"
        />

        {/* Center Quantum Node */}
        <circle cx="16" cy="16" r="2.2" fill="#FFFFFF" />
        <circle cx="16" cy="16" r="1.2" fill="#161514" />

        {/* Orbiting Synaptic Energy Micro-Nodes */}
        <circle cx="16" cy="4.5" r="1" fill="#FFF4D9" />
        <circle cx="26.5" cy="10.5" r="1" fill="#FFC876" />
        <circle cx="26.5" cy="21.5" r="1" fill="#FF9F2E" />
        <circle cx="16" cy="27.5" r="1" fill="#FFC876" />
        <circle cx="5.5" cy="21.5" r="1" fill="#FF9F2E" />
        <circle cx="5.5" cy="10.5" r="1" fill="#FFF4D9" />
      </svg>
    </div>
  );
}
