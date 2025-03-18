import React from 'react';

type PageWrapperProps = {
  children: React.ReactNode;
};

export function PageWrapper({ children }: PageWrapperProps) {
  return (
    <div>
      {children}
    </div>
  );
} 