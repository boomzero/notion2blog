const FileUtil = require('../utils/file');
const Post = require('../models/Post');

module.exports = class PostService {
  static async getAllPosts() {
    const posts = await Post.find();
    posts.forEach(async (post) => {
      post['content_html'] = await FileUtil.convertMarkdownToHTML(post['content_markdown'])
    })

    return posts;
  }

  static async createPost(title, authorName, authorEmail, privacy, contentMarkdown, cb) {
    const contentHTML = await FileUtil.convertMarkdownToHTML(contentMarkdown);
    Post.create({ title: title, content_html: contentHTML, content_markdown: contentMarkdown, author_name: authorName, author_email: authorEmail, privacy: privacy }, (err, res) => {
      if (err) {
        return cb(err);
      }
      return cb(null, res);
    })
  }
}