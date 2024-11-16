module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // 确保Tailwind能够扫描到你的React组件
    "./public/index.html",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};