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
      className={`home-section ${alternate ? 'home-section-alt' : 'home-section-default'} ${className}`}
    >
      {children}
    </section>
  );
}