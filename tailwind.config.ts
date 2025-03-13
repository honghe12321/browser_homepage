import type {Config} from 'tailwindcss'

const config: Config = {
    content: [
        './src/**/*.html',
        './src/**/*.js',
        './src/**/*.jsx',
        './src/**/*.ts',
        './src/**/*.tsx',
    ],
    theme: {
        extend: {
            colors: {
                white: '#FFFFFF',
                primary: 'hsl(var(--accent))',
            },
        },
    },
    plugins: [],
};

export default config;
