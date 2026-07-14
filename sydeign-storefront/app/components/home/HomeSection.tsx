import type {ReactNode} from 'react';

interface HomeSectionProps {
  children: React.ReactNode;
  alternate?: boolean;
  className?: string;
}

export function HomeSection({
  children,
  alternate = false,
  className = '',
}: HomeSectionProps) {
  return (
    <section
      className={`
        w-full
        ${alternate ? 'bg-background' : 'bg-white'}
        ${className}
      `}
    >
      {children}
    </section>
  );
}