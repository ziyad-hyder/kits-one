/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./*.html", "./js/**/*.js"],
    theme: {
        extend: {
            colors: {
                inception: {
                    primary: '#173541',
                    secondary: '#557C86',
                    tertiary: '#7299A8',
                    light: '#85ADBB',
                    accent: '#B49796',
                    bg: '#FAFAF8',
                }
            }
        },
    },
    plugins: [],
}

