import path from 'path'
import ts from 'rollup-plugin-typescript2'
import nodeResolve from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'
// packages目录
const packagesDir = path.resolve(__dirname, 'packages')

// 找到包目录
// process.env.TARGET为build时注入
const packageDir = path.resolve(packagesDir, process.env.TARGET);


// 可以直接获取包下的文件路径
const resolve = (key) => path.resolve(packageDir, key)

// 获取package.json
const pkg = require(resolve('package.json'))

const name = path.basename(packageDir) // 取文件名

// 输出类型
const outputConfig = {
  'esm-bundler': {
    file: resolve(`dist/${name}.esm-bundler.js`),
    format: 'es'
  },
  'cjs': {
    file: resolve(`dist/${name}.cjs.js`)
  },
  'global': {
    file: resolve(`dist/${name}.global.js`),
    format: 'iife'
  }
}

// package.json中自定义选项
const options = pkg.buildOptions


function createConfig(format, output) {
  output.name = options.name
  output.sourcemap = true
  return {
    input: resolve('src/index.ts'),
    output,
    plugins: [
      json(),
      ts({
        tsconfig: path.resolve(__dirname, 'tsconfig.json')
      }),
      nodeResolve()
    ]
  }
}


// 导出配置
const config = options.formats.map(format => createConfig(format, outputConfig[format]))
export default config