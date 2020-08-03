module.exports = {
  extension: ['tsx'],
  require: ['esm', 'setup.js', 'ts-node/register', 'ignore-styles'],
  spec: 'stories/**/*.spec.tsx',
  // compilers: 'js:babel-core/register,css:css-dnt-compiler.js'
}