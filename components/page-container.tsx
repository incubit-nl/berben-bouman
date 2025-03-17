"use client";

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PageContainerProps {
  children: ReactNode;
  className?: string;
  withHeaderOffset?: boolean;
  withNotificationBar?: boolean;
}

/**
 * A consistent container for pages that handles proper spacing
 * with respect to the header and notification bar
 */
export function PageContainer({
  children,
  className,
  withHeaderOffset = true,
  withNotificationBar = false
}: PageContainerProps) {
  return (
    <div
      className={cn(
        withHeaderOffset && "pt-24 lg:pt-32",
        withNotificationBar && "pt-8",
        className
      )}
    >
      {children}
    </div>
  );
} 