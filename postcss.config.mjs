/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    'postcss-import': {}, // Optional, useful for @import directives in CSS
    tailwindcss: {},       // Tailwind CSS plugin
    autoprefixer: {},      // Autoprefixer plugin
  },
};

export default config;
