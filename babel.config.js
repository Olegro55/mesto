module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'entry',
        corejs: 3,
        targets: {
          chrome: 90,
          ie: 10,
          firefox: '50',
          chrome: '64',
          safari: '11.1'
        }
      }
    ]
  ]
};
