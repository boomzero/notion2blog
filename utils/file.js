const showdown = require('showdown')

module.exports = class FileUtil {
  static convertMarkdownToHTML(data) {
    return new Promise((resolve, reject) => {
      const converter = new showdown.Converter();
      const htmlContent = converter.makeHtml(data);
      resolve(htmlContent);
    })
  }
}