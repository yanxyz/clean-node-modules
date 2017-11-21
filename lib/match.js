const { patterns } = require('./patterns')
const re = createRe()

function createRe() {
  const arr = patterns.map(x => {
    x = x.trim()
    if (!x) {
      throw new Error('Empty pattern')
    }
    x = x
      .replace(/\./g, '\\.')
      .replace(/\*/g, '.*')
      .replace(/\?/g, '.?')
    return x
  })
  const pattern = '^(?:' + arr.join('|') + ')$'
  // console.log(pattern)
  return new RegExp(pattern, 'i')
}

module.exports = function (files) {
  return files.filter(re.test, re)
}
