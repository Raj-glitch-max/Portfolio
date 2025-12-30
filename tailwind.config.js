/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Primary Colors (Neon)
                'cyan-neon': '#00d9ff',
                'magenta-neon': '#ff006e',
                'yellow-neon': '#ffbe0b',

                // Background Colors
                'deep-navy': '#0a0e27',
                'dark-gray': '#161b22',
                'darker-gray': '#21262d',

                // Text Colors
                'text-primary': '#f0f0f0',
                'text-secondary': '#8b949e',
                'text-muted': '#6e7681',

                // Status Colors
                'success-green': '#00ff41',
                'error-red': '#ff4444',
                'loading-blue': '#0066ff',
            },
            fontFamily: {
                'mono': ['JetBrains Mono', 'Fira Code', 'monospace'],
                'code': ['Fira Code', 'monospace'],
                'sans': ['Inter', 'system-ui', 'sans-serif'],
            },
            spacing: {
                '4': '4px',
                '8': '8px',
                '16': '16px',
                '24': '24px',
                '32': '32px',
                '48': '48px',
            },
            borderRadius: {
                'sm': '4px',
                'md': '8px',
                'lg': '12px',
                'xl': '16px',
            },
            boxShadow: {
                'glow-cyan': '0 0 20px rgba(0, 217, 255, 0.4)',
                'glow-magenta': '0 0 20px rgba(255, 0, 110, 0.4)',
                'glow-green': '0 0 20px rgba(0, 255, 65, 0.4)',
                'card': '0 4px 16px rgba(0, 217, 255, 0.15)',
                'modal': '0 0 40px rgba(0, 217, 255, 0.3)',
            },
            animation: {
                'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
                'glitch': 'glitch 0.2s ease-in-out',
                'scan': 'scan 8s linear infinite',
            },
            keyframes: {
                'pulse-glow': {
                    '0%, 100%': { opacity: '0.3' },
                    '50%': { opacity: '0.5' },
                },
                'glitch': {
                    '0%': { transform: 'translate(0)' },
                    '20%': { transform: 'translate(-2px, 2px)' },
                    '40%': { transform: 'translate(-2px, -2px)' },
                    '60%': { transform: 'translate(2px, 2px)' },
                    '80%': { transform: 'translate(2px, -2px)' },
                    '100%': { transform: 'translate(0)' },
                },
                'scan': {
                    '0%': { transform: 'translateY(-100%)' },
                    '100%': { transform: 'translateY(100vh)' },
                },
            },
        },
    },
    plugins: [],
}
