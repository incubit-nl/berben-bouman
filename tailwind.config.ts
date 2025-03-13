import type { Config } from 'tailwindcss';
import { themeColors } from './lib/theme';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-heading)', 'var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1.16' }],
        '6xl': ['3.75rem', { lineHeight: '1.12' }],
      },
      spacing: {
        container: '2rem',
        'container-lg': '4rem',
        'section-sm': '3rem',
        'section-md': '5rem',
        'section-lg': '7rem',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        // Dental practice theme colors
        primary: 'hsl(var(--primary))',
        secondary: themeColors.secondary,
        accent: 'hsl(var(--accent))',
        neutral: themeColors.neutral,
        
        // Custom colors from :root
        brown: 'hsl(var(--color-brown))',        // #8d4e2f
        coral: 'hsl(var(--color-coral))',        // #da8660
        peach: 'hsl(var(--color-peach))',        // #dfae8e
        sage: 'hsl(var(--color-sage))',          // #a3a284
        olive: 'hsl(var(--color-olive))',        // #686230
        'peach-light': 'hsl(var(--color-peach-light))', // Light peach
        'peach-dark': 'hsl(var(--color-peach-dark))',   // Darker peach
        
        // Base theme colors for shadcn components
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        
        card: 'hsl(var(--card))',
        'card-foreground': 'hsl(var(--card-foreground))',
        
        popover: 'hsl(var(--popover))',
        'popover-foreground': 'hsl(var(--popover-foreground))',
        
        'primary-shadcn': 'hsl(var(--primary))',
        'primary-foreground': 'hsl(var(--primary-foreground))',
        
        'secondary-shadcn': 'hsl(var(--secondary))',
        'secondary-foreground': 'hsl(var(--secondary-foreground))',
        
        muted: 'hsl(var(--muted))',
        'muted-foreground': 'hsl(var(--muted-foreground))',
        
        'accent-shadcn': 'hsl(var(--accent))',
        'accent-foreground': 'hsl(var(--accent-foreground))',
        
        destructive: 'hsl(var(--destructive))',
        'destructive-foreground': 'hsl(var(--destructive-foreground))',
        
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        
        // Dental specific colors
        enamel: '#f5f5f5',
        dentin: '#e6d7c3',
        gingiva: '#e58e8e',
        
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      transitionDuration: {
        '2000': '2000ms',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;