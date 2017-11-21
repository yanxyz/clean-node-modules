module.exports = {
  // 这些模块整体删除
  modules: [
    'nan',
    'prebuild-install',
  ],
  // wild pattern
  // 常见的放在前面
  patterns: [
    '*.md',
    '.*',
    'license*',
    'changelog*',
    'history*',
    // 目录
    'test',
    'tests',
    'docs',
    'doc',
    'examples',
    'example',
    'images',
    'benchmark',
    // 其它
    'contributing*',
    'contributors*',
    'makefile',
    // 临时文件
    // '*.bak',
    // '*~',
  ]
}
