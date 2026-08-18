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
            colors: {
                slate: {
                    50: 'var(--color-text-primary, #E8E3D7)',
                    100: 'var(--color-text-primary, #E8E3D7)',
                    200: 'var(--color-text-secondary, #C4BFAF)',
                    300: 'var(--color-text-secondary, #C4BFAF)',
                    400: 'var(--color-text-muted, #8E8D82)',
                    500: 'var(--color-text-muted, #8E8D82)',
                    600: 'var(--color-text-disabled, #62645D)',
                    700: 'var(--color-surface-elevated, #2B3029)',
                    800: 'var(--color-surface-secondary, #252A24)',
                    900: 'var(--color-surface-primary, #20241F)',
                    950: 'var(--color-bg-primary, #111311)',
                }
            }
        },
    },
    plugins: [],
}

