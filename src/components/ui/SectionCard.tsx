import type { ReactNode } from 'react';

type SectionCardProps = {
  children: ReactNode;
  className?: string;
};

export function SectionCard({ children, className = '' }: SectionCardProps) {
  return (
    <section className={`rounded-[28px] border border-slate-100 bg-white p-5 shadow-sm sm:p-7 ${className}`}>
      {children}
    </section>
  );
}
