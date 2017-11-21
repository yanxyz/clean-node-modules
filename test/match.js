const assert = require('assert')
const match = require('../lib/match')

const files = [
  'docs',
  'test',
  '.npmignore',
  'CHANGELOG.md',
  'LICENSE',
  'package.json',
  'README.md',
]
const list = match(files)
assert.equal(list.length, files.length - 1)
assert(!list.includes('package.json'))
