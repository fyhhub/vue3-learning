const fs = require('fs')
const execa = require('execa')
const targets = fs.readdirSync('packages').filter(f => {
  return fs.statSync(`packages/${f}`).isDirectory();
})

async function build(target) {
  await execa('rollup', [
    '-c',
    '--environment',
    `TARGET:${target}` // 子进程打包信息共享给父进程
  ], { stdio: 'inherit' })
}

function runParallel(targets, iteratorFn) {
  const res = []
  for (const item of targets) {
    const p = iteratorFn(item)
    res.push(p)
  }
  return Promise.all(res)
}

runParallel(targets, build).then(() => {

})