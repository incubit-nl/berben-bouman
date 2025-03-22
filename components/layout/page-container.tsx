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
        "w-full",
        withHeaderOffset && "mt-2 sm:mt-4",
        withNotificationBar && "mt-4 sm:mt-8",
        className
      )}
    >
      {children}
    </div>
  );
} 