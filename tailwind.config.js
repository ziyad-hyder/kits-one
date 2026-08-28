/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./*.html", "./js/**/*.js"],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            colors: {
                accent: {
                    DEFAULT: '#4C8C90',
                    dark: '#5CA3A6',
                },
                coral: {
                    DEFAULT: '#C9827D',
                    text: '#3A1F1D',
                }
            },
            borderRadius: {
                'shell': '16px',
                'card': '12px',
                'btn': '8px',
                'pill': '9999px',
            }
        },
    },
    plugins: [],
}
