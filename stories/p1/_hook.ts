import hook from 'css-modules-require-hook'
import sass from 'sass'
/**
 * 参考https://github.com/css-modules/css-modules-require-hook,
 * 必须在样式文件前引用
 */
hook({
  extensions: ['.scss'],
  generateScopedName: '[name]__[local]___[hash:base64:5]',
  // 预处理css,返回css字符
  preprocessCss: (css: string, filename: string) => {
    return sass.renderSync({ file: filename }).css.toString('utf8')
  },
})
