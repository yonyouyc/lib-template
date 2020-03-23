import babel from 'rollup-plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import { uglify } from 'rollup-plugin-uglify'
module.exports = {
  input: './package/index.js',
  external: ['jquery'], // 外部依赖
  output: {
    file: 'lib/index.min.js',
    format: 'umd', // 一般cjs就可以 表示commonjs 
    name: 'yourtargetlibname' // umd需要，
  },
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    resolve({
      preferBuiltins: true
    }),
    uglify(),
    commonjs(),
    
  ]
}
