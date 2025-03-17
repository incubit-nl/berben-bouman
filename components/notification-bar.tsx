"use client";

import { useState, useEffect, useRef } from 'react';
import { AlertTriangle, Info, Check, AlertCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NotificationBarProps {
  title?: string;
  content: string;
  variant?: 'warning' | 'info' | 'success' | 'error';
  isDismissible?: boolean;
  className?: string;
  speed?: 'slow' | 'medium' | 'fast';
}

export function NotificationBar({
  title,
  content,
  variant = 'warning',
  isDismissible = true,
  className,
  speed = 'medium'
}: NotificationBarProps) {
  const [isVisible, setIsVisible] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const speedValues = {
    slow: 60,
    medium: 80,
    fast: 120
  };

  useEffect(() => {
    if (!scrollRef.current) return;
    
    const container = scrollRef.current;
    const textWidth = container.scrollWidth;
    const containerWidth = container.clientWidth;
    
    if (textWidth <= containerWidth) return;
    
    const animation = container.animate(
      [
        { transform: 'translateX(0)' },
        { transform: `translateX(-${textWidth - containerWidth}px)` }
      ],
      {
        duration: (textWidth / speedValues[speed]) * 1000,
        iterations: Infinity,
        direction: 'alternate',
        easing: 'ease-in-out'
      }
    );
    
    return () => {
      animation.cancel();
    };
  }, [content, speed]);

  if (!isVisible) return null;

  const variantStyles = {
    warning: 'bg-accent-500 text-white',
    info: 'bg-primary-100 text-primary-800',
    success: 'bg-secondary-100 text-secondary-800',
    error: 'bg-rose-500 text-white',
  };
  
  const variantIcons = {
    warning: <AlertTriangle className="h-4 w-4 flex-shrink-0" />, // Slightly larger icon
    info: <Info className="h-4 w-4 flex-shrink-0" />,
    success: <Check className="h-4 w-4 flex-shrink-0" />,
    error: <AlertCircle className="h-4 w-4 flex-shrink-0" />,
  };

  return (
    <div className={cn(variantStyles[variant], "py-1 px-2", className)}>
      <div className="container mx-auto px-2">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center flex-1 overflow-hidden">
            <div className="flex-shrink-0 mr-3 w-6 flex items-center justify-center">
              {variantIcons[variant]}
            </div>
            <div 
              ref={scrollRef}
              className="text-xs font-medium whitespace-nowrap overflow-hidden flex-1"
              style={{ marginLeft: '0.5rem' }} // Added margin to ensure separation
            >
              {title && <span className="font-bold mr-1">{title}</span>}
              <span>{content}</span>
            </div>
          </div>
          
          {isDismissible && (
            <button 
              onClick={() => setIsVisible(false)}
              className="flex-shrink-0 ml-1 p-0.5 rounded-full hover:bg-white/20 transition-colors"
              aria-label="Close notification"
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}