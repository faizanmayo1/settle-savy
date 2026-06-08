import animate from 'tailwindcss-animate'

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: { '2xl': '1400px' },
    },
    extend: {
      fontFamily: {
        sans: ['"Hanken Grotesk"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Fraunces"', 'ui-serif', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        // shadcn semantic tokens (via CSS variables)
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },

        // SettleSavvy brand palette (literal hex — Tailwind utilities only)
        canvas: {
          DEFAULT: '#F6F8F8',
          subtle: '#EDF1F1',
          raised: '#FFFFFF',
        },
        ink: {
          DEFAULT: '#0F1B22',
          muted: '#41525B',
          subtle: '#6B7C85',
          faint: '#A6B3BA',
        },
        hairline: {
          DEFAULT: '#E2E8E9',
          strong: '#CFD8D9',
        },
        // Primary — deep teal (structure)
        teal: {
          DEFAULT: '#0F766E',
          50: '#ECFBF8',
          100: '#CFF4ED',
          200: '#9FE7DC',
          300: '#5FD3C4',
          400: '#2BB7A6',
          500: '#129A8B',
          600: '#0F7C70',
          700: '#0F766E',
          800: '#115E59',
          900: '#0E4843',
        },
        // Accent — iris indigo (AI / intelligence only)
        iris: {
          DEFAULT: '#6366F1',
          soft: '#ECEDFE',
          deep: '#4F46E5',
          50: '#F4F5FF',
        },
        signal: {
          positive: '#16A34A',
          'positive-soft': '#DCFCE7',
          warning: '#D97706',
          'warning-soft': '#FEF3C7',
          risk: '#DC2626',
          'risk-soft': '#FEE2E2',
          info: '#0E92C7',
          'info-soft': '#DBF1FB',
          neutral: '#64748B',
          'neutral-soft': '#F1F5F9',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      boxShadow: {
        'card-sm': '0 1px 2px rgba(15, 27, 34, 0.04), 0 1px 1px rgba(15, 27, 34, 0.02)',
        card: '0 1px 3px rgba(15, 27, 34, 0.06), 0 1px 2px rgba(15, 27, 34, 0.04)',
        'card-md': '0 4px 12px rgba(15, 27, 34, 0.07), 0 2px 4px rgba(15, 27, 34, 0.04)',
        'card-lg': '0 12px 32px rgba(15, 27, 34, 0.10), 0 4px 8px rgba(15, 27, 34, 0.05)',
        inset: 'inset 0 0 0 1px rgba(15, 27, 34, 0.06)',
      },
      letterSpacing: {
        'tight-bank': '-0.018em',
        'wide-eyebrow': '0.08em',
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
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(4px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'scan-sweep': {
          '0%': { transform: 'translateY(-120%)' },
          '100%': { transform: 'translateY(420%)' },
        },
        'pin-drop': {
          '0%': { opacity: '0', transform: 'translateY(-8px) scale(0.9)' },
          '60%': { opacity: '1', transform: 'translateY(1px) scale(1.02)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.4s ease-out both',
        shimmer: 'shimmer 2.4s linear infinite',
        'scan-sweep': 'scan-sweep 1.6s ease-in-out infinite',
        'pin-drop': 'pin-drop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both',
      },
    },
  },
  plugins: [animate],
}
