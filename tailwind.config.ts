import type {Config} from 'tailwindcss'

const config: Config = {
    content: [
        './src/**/*.{js,ts,jsx,tsx}',
        './index.html',
    ],
    theme: {
        colors: {
            primary: 'hsl(var(--accent))',
        },
        extend: {},
    },
    plugins: [],
};

export default config;
