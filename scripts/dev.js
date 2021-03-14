const fs = require('fs')
const execa = require('execa')

const target = 'reactivity'

build(target)

async function build(target) {
  await execa('rollup', [
    '-cw',
    '--environment',
    `TARGET:${target}` // 子进程打包信息共享给父进程
  ], { stdio: 'inherit' })
}