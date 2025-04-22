/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        syne: ['"Syne"', 'sans-serif'],
      },
    },
  },
  plugins: [],
  safelist: [
    'bg-[#D5D5A7]',
    'bg-[#FF9C4A]',
    'bg-[#8FB6FF]',
    'bg-[#FFEB66]',
    'bg-[#A8E87D]',
    'bg-[#CFF4F2]',
    'bg-[#E35A50]',
    'bg-[#CC63C6]',
    'bg-[#F3D68C]',
    'bg-[#C5B4F9]',
    'bg-[#FF82A8]',
    'bg-[#C4D44D]',
    'bg-[#D8C75D]',
    'bg-[#A288C0]',
    'bg-[#9B6CFF]',
    'bg-[#A39083]',
    'bg-[#D1D1E6]',
    'bg-[#F4AFCB]' 
  ],
}


