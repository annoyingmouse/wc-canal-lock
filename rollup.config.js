import { terser } from 'rollup-plugin-terser'

export default {
  input: './wc-canal-lock.js',
  output: {
    file: 'dist/wc-canal-lock.min.js',
    format: 'iife',
    sourcemap: 'inline',
  },
  plugins: [
    terser()
  ],
}