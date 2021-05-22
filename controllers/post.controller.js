const PostService = require('../services/PostService');

module.exports = class Post {
  static async apiGetAllPosts(req, res, next) {
    const posts = await PostService.getAllPosts();
    return res.render('posts', { 'title': posts[0].title, 'content': posts[0].content });
    // return res.send(posts[0].content);
  }

  static async fetchNewPostForm(req, res, next) {
    return res.render('new-post-form', { 'title': 'Create new post' });
  }

  static async apiCreatePosts(req, res, next) {
    // {
    //   title: 'First post',
    //   authorName: 'Vu Phong',
    //   authorEmail: 'phong.vq.198@gmail.com',
    //   privacy: 'private',
    //   content: 'Test'
    // }
    const post = req.body
    console.log(post);
    if (post.title == '' || post.content == '') {
      return next({status: 400, statusMessage: 'Title and Content is empty.'});
    }

    const {title, authorName, authorEmail, privacy, content} = post;
    await PostService.createPost(title, authorName, authorEmail, privacy, content, (err, result) => {
      if (err) return next(err);
      return res.send(result);
    });
  }
}
