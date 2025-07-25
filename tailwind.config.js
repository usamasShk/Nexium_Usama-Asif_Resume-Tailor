/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-bg': '#18182f',
        'secondary-bg': '#23233a',
        'accent': '#7c3aed',
        'accent-hover': '#6d28d9',
        'text-light': '#FFFFFF',
        'text-dark': '#18182f',
        'success': '#34C759',
      },
      fontFamily: {
        'main': ['var(--font-inter)', 'system-ui', 'sans-serif'],
        'mono': ['var(--font-jetbrains-mono)', 'monospace'],
      },
      boxShadow: {
        'glow': '0 0 20px rgba(162, 89, 255, 0.5)',
        'card': '0 0 32px 0 rgba(162, 89, 255, 0.33)',
      },
    },
  },
  plugins: [],
}
