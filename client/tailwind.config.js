/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'cloud-pattern': "url('/cloud-pattern.svg')",
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
