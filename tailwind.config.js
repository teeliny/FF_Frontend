/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{html,js,ts,jsx,tsx}",
    "./pages/*.{html,js,ts,jsx,tsx}",
    "./components/**/*.{html,js,ts,jsx,tsx}",
    "./components/*.{html,js,ts,jsx,tsx}",
  ],
  safelist: [
    'w-[128px]',
    'w-[90%]',
    'bg-[#0A3085]',
    'bg-[#FFEAEA]',
    'bg-[#636463]',
    'border-[#0A3085]',
    'border-[#F32525]',
    'accent-[#0A3085]',
    'text-[#0A3085]',
    'text-[#F32525]',
    'text-[#FFACAC]',
    'text-[#1A191999]',
    'rounded-[40px]',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

