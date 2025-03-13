import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Dental practice theme colors
export const themeColors = {
  // Primary colors - clean blue tones for a professional, clinical feel
  primary: {
    50: '#eef7ff',
    100: '#d9edff',
    200: '#bce0ff',
    300: '#8ecdff',
    400: '#59b0ff',
    500: '#3494fd',
    600: '#1e77f3',
    700: '#1a63e3',
    800: '#1c51b8',
    900: '#1d4590',
    950: '#162a55',
  },
  
  // Secondary colors - teal/mint tones for a fresh, clean feel
  secondary: {
    50: '#eefcf7',
    100: '#d6f7ed',
    200: '#b0eedc',
    300: '#7ddec5',
    400: '#47c6a9',
    500: '#2aab8f',
    600: '#1e8a75',
    700: '#1c6f60',
    800: '#1b584e',
    900: '#194941',
    950: '#0a2a26',
  },
  
  // Accent colors - warm, friendly orange tones
  accent: {
    50: '#fff8ed',
    100: '#ffefd4',
    200: '#ffdca8',
    300: '#ffc170',
    400: '#ff9d38',
    500: '#ff7e11',
    600: '#ff6205',
    700: '#cc4406',
    800: '#a1360d',
    900: '#82300f',
    950: '#461604',
  },
  
  // Neutral colors - soft grays with a slight blue tint
  neutral: {
    50: '#f7f9fb',
    100: '#eef1f5',
    200: '#d9e0e8',
    300: '#b9c5d3',
    400: '#94a3b8',
    500: '#76859a',
    600: '#5f6c80',
    700: '#4d5869',
    800: '#424a57',
    900: '#383f4a',
    950: '#24282f',
  },
}

// Font families
export const fontFamily = {
  sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
  heading: ['var(--font-heading)', 'system-ui', 'sans-serif'],
}

// Typography scale
export const typography = {
  h1: 'text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl',
  h2: 'text-3xl font-bold tracking-tight sm:text-4xl',
  h3: 'text-2xl font-bold tracking-tight sm:text-3xl',
  h4: 'text-xl font-bold tracking-tight',
  h5: 'text-lg font-bold tracking-tight',
  h6: 'text-base font-bold tracking-tight',
  p: 'text-base leading-7',
  small: 'text-sm leading-6',
  tiny: 'text-xs leading-5',
}

// Spacing scale
export const spacing = {
  section: {
    sm: 'py-8 md:py-12',
    md: 'py-12 md:py-16',
    lg: 'py-16 md:py-24',
  },
  container: {
    sm: 'px-4 sm:px-6 lg:px-8',
    md: 'px-6 sm:px-8 lg:px-12',
    lg: 'px-8 sm:px-12 lg:px-16',
  },
}

// Border radius
export const borderRadius = {
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  full: 'rounded-full',
}

// Shadows
export const shadows = {
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
  '2xl': 'shadow-2xl',
  inner: 'shadow-inner',
}

// Transitions
export const transitions = {
  fast: 'transition-all duration-150 ease-in-out',
  medium: 'transition-all duration-300 ease-in-out',
  slow: 'transition-all duration-500 ease-in-out',
} 