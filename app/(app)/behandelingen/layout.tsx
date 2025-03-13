import { ReactNode } from 'react';

interface TreatmentsLayoutProps {
  children: ReactNode;
}

export default function TreatmentsLayout({ children }: TreatmentsLayoutProps) {
  return (
    <main className="min-h-screen flex flex-col">
      {children}
    </main>
  );
} 