const fs = require('fs-extra')
const path = require('path')
const match = require('./match')
const { modules } = require('./patterns')

const rulesDir = path.join(__dirname, 'rules')
const rules = fs.readdirSync(rulesDir)

module.exports = function (root = './node_modules') {
  return walk(root)
}

async function walk(root, opts) {
  const list = await fs.readdir(root)
  await Promise.all(list.map(mapper))

  async function mapper(item) {
    if (item === '.bin') return

    const dir = path.join(root, item)
    if (modules.includes(item)) {
      return fs.remove(dir)
    }

    if (rules.includes(item + '.js')) {
      await rm(dir, require(path.join(rulesDir, item)))
    } else {
      await removeByPatterns(dir)
    }

    const sub = path.join(dir, 'node_modules')
    return walk(sub).catch(() => {})
  }
}

function rm(root, list) {
  if (!list.length) return
  return Promise.all(list.map(item => {
    return fs.remove(path.join(root, item)).catch(() => { })
  }))
}

async function removeByPatterns(root) {
  // root 可能是文件
  let files
  try {
    files = await fs.readdir(root)
  } catch (err) {
    return
  }

  const list = match(files)
  return rm(root, list)
}
