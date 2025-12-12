module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新功能(feature)
        'fix', // 修补bug
        'docs', // Document(documentation)
        'style', // 格式、styles(不影响代码Run的变动)
        'refactor', // 重构(即不是新增功能，也不是修改BUG的代码)
        'perf', // 优化相关，比如提升性能、体验
        'test', // Add测试
        'ci', // 持续集成修改
        'chore', // 构建过程或辅助工具的变动
        'revert', // 回滚到上一个Version
        'workflow', // 工作流改进
        'mod', // 不确定分class的修改
        'wip', // 开发中
        'types', // type修改
        'release' // Version发布
      ]
    ],
    'subject-full-stop': [0, 'never'],
    'subject-case': [0, 'never']
  }
}
