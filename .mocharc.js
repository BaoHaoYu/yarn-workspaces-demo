module.exports = {
  extension: ['tsx'],
  spec: 'stories/**/*.spec.tsx',
  require: ['esm', 'setup.js', 'ts-node/register', 'ignore-styles'],
  // compilers: 'js:babel-core/register,css:css-dnt-compiler.js'
}