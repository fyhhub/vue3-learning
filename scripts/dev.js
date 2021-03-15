const fs = require('fs')
const execa = require('execa')

const target = 'shared'

build(target)

async function build(target) {
  await execa('rollup', [
    '-cw',
    '--environment',
    `TARGET:${target}` // 子进程打包信息共享给父进程
  ], { stdio: 'inherit' })
}