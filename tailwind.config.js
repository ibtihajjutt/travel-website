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
                brand: {
                    white: '#FFFFFF',
                    dark: '#1A1A1A',
                    turquoise: '#1FB4B4',
                }
            },
            fontFamily: {
                serif: ['var(--font-cormorant)'],
                sans: ['var(--font-inter)'],
            },
            letterSpacing: {
                'luxury': '0.25em',
            }
        },
    },
    plugins: [],
};
