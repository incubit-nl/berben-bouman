import { ReactNode } from 'react';

interface ContactLayoutProps {
  children: ReactNode;
}

export default function ContactLayout({ children }: ContactLayoutProps) {
  return (
    <main className="min-h-screen flex flex-col">
      {children}
    </main>
  );
} 