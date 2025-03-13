import { ReactNode } from 'react';

interface TeamLayoutProps {
  children: ReactNode;
}

export default function TeamLayout({ children }: TeamLayoutProps) {
  return (
    <main className="min-h-screen flex flex-col">
      {children}
    </main>
  );
} 