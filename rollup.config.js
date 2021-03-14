import path from 'path'

// packages目录
const packagesDir = path.resolve(__dirname, 'packages')
console.log('%c 🍌 packagesDir: ', 'font-size:20px;background-color: #6EC1C2;color:#fff;', packagesDir);

// 找到包目录
// process.env.TARGET为build时注入
const packageDir = path.resolve(packagesDir, process.env.TARGET);


// 可以直接获取包下的文件路径
const resolve = (key) => path.resolve(packageDir, key)

// 获取package.json
const pkg = require(resolve('package.json'))