const showdown = require('showdown')

module.exports = class FileUtil {
  static convertMarkdownToHTML(data) {
    const converter = new showdown.Converter();

    return converter.makeHtml(data);
  }
}