'use client';

import Image from 'next/image';

type LogoProps = {
  size?: number;
  className?: string;
  showText?: boolean;
  animated?: boolean;
};

export default function Logo({ size = 36, className = '', showText = true }: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <Image 
        src="/logo.png" 
        alt="Zelvio Logo" 
        width={size} 
        height={size} 
        className="object-contain"
      />
      {showText && (
        <span className="font-bold text-xl tracking-tight">Zelvio</span>
      )}
    </div>
  );
}
