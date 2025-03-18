"use client";

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { RichText } from './RichText';

type AlertType = 'info' | 'warning' | 'error' | 'success';

interface AlertBannerProps {
  alertType: AlertType;
  content: any;
  dismissible: boolean;
  localStorageKey?: string;
}

const alertStyles = {
  container: {
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    success: 'bg-green-50 border-green-200 text-green-800',
  },
  icon: {
    info: 'text-blue-500',
    warning: 'text-yellow-500',
    error: 'text-red-500',
    success: 'text-green-500',
  },
  button: {
    info: 'bg-blue-100 hover:bg-blue-200 text-blue-800',
    warning: 'bg-yellow-100 hover:bg-yellow-200 text-yellow-800',
    error: 'bg-red-100 hover:bg-red-200 text-red-800',
    success: 'bg-green-100 hover:bg-green-200 text-green-800',
  }
};

export function AlertBanner({ 
  alertType = 'warning', 
  content, 
  dismissible = true,
  localStorageKey 
}: AlertBannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  // Check local storage on mount to see if this alert has been dismissed
  useEffect(() => {
    if (dismissible && localStorageKey) {
      const isDismissed = localStorage.getItem(localStorageKey) === 'dismissed';
      setIsVisible(!isDismissed);
    }
  }, [dismissible, localStorageKey]);

  const handleDismiss = () => {
    setIsVisible(false);
    if (localStorageKey) {
      localStorage.setItem(localStorageKey, 'dismissed');
    }
  };

  if (!isVisible) return null;

  return (
    <div className={cn(
      "border-t-4 border-b border-l-0 border-r-0 px-4 py-3 sm:px-6",
      alertStyles.container[alertType]
    )}>
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
          <div className="flex-grow prose max-w-none">
            <RichText content={content} />
          </div>
          {dismissible && (
            <div className="mt-2 md:mt-0 md:ml-6 flex-shrink-0">
              <button
                onClick={handleDismiss}
                className={cn(
                  "rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2",
                  alertStyles.button[alertType]
                )}
                aria-label="Dismiss"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 