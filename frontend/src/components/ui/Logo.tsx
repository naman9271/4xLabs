import Image from 'next/image';
import { cn } from '@/lib/utils';

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export function Logo({ width = 24, height = 24, className }: LogoProps) {
  return (
    <Image
      src="/4xlabs-logo.svg"
      alt="4xLabs Logo"
      width={width}
      height={height}
      className={cn("object-contain", className)}
      priority
    />
  );
}
