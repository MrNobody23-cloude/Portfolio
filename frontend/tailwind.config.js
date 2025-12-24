/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                harry: ['"Harry P"', 'serif'],
                magical: ['"Harry P"', 'serif'],
            },
        },
    },
    plugins: [],
}
