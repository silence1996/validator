import { babel } from '@rollup/plugin-babel'
import pkg from './package.json' assert { type: 'json' }

export default {
  input: './src/main.js',
  output: [
    { file: pkg.main, format: 'cjs' },
    { file: pkg.module, format: 'es' },
    { file: pkg.browser, format: 'umd', name: 'Validator' }
  ],
  plugins: [babel({ exclude: 'node_modules/**' })]
}