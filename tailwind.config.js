/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0F172A', // Dark blue/slate as base
          light: '#1E293B',
          dark: '#020617',
          50: 'rgba(15, 23, 42, 0.05)',
          100: 'rgba(15, 23, 42, 0.1)',
        },
        secondary: {
          DEFAULT: '#3B82F6', // Professional blue
          light: '#60A5FA',
          dark: '#2563EB',
          50: 'rgba(59, 130, 246, 0.05)',
          100: 'rgba(59, 130, 246, 0.1)',
          200: 'rgba(59, 130, 246, 0.2)',
          300: 'rgba(59, 130, 246, 0.3)',
          400: 'rgba(59, 130, 246, 0.4)',
        },
        accent: {
          DEFAULT: '#8B5CF6', // Purple for accents
          light: '#A78BFA',
          dark: '#7C3AED',
        },
        success: {
          DEFAULT: '#10B981', // Green for success states
          light: '#34D399',
          dark: '#059669',
        },
        warning: {
          DEFAULT: '#F59E0B', // Amber for warnings
          light: '#FBBF24',
          dark: '#D97706',
        },
        danger: {
          DEFAULT: '#EF4444', // Red for danger/errors
          light: '#F87171',
          dark: '#DC2626',
        },
        dark: {
          DEFAULT: '#0F172A', // Slate-900
          lighter: '#1E293B', // Slate-800
          lightest: '#334155', // Slate-700
          card: '#1E293B', // Slate-800
        },
        light: {
          DEFAULT: '#F8FAFC', // Slate-50
          darker: '#F1F5F9', // Slate-100
          darkest: '#E2E8F0', // Slate-200
        },
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      boxShadow: {
        card: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        highlight: '0 0 0 3px rgba(59, 130, 246, 0.4)',
        'soft': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        'elevated': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 3s infinite',
        'spin-slow': 'spin 3s linear infinite',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
  ],
};