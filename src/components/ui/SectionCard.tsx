import type { ReactNode } from 'react';

type SectionCardProps = {
  children: ReactNode;
  className?: string;
};

export function SectionCard({ children, className = '' }: SectionCardProps) {
  return (
    <section className={`rounded-[30px] border border-white/80 bg-white/90 p-5 shadow-[0_18px_45px_rgba(251,146,60,0.08)] ring-1 ring-orange-100/60 backdrop-blur sm:p-7 ${className}`}>
      {children}
    </section>
  );
}
