import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import nesting from 'postcss-nesting';

const config = {
  plugins: [
    nesting,
    tailwindcss,
    autoprefixer,
  ],
};

export default config;
