const mongoose = require('mongoose');
const schema = mongoose.Schema;

// TODO: add validator
const postSchema = schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  content_html: {
    type: String,
    required: true,
  },
  content_markdown: {
    type: String,
    required: true,
    default: "",
  },
  author_name: {
    type: String,
    require: false,
  },
  privacy: {
    type: String,
    require: false,
    default: 'private',
  },
  author_email: {
    type: String,
    require: false
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  modified_at: {
    type: Date,
    default: Date.now(),
  }
});

module.exports = Post = mongoose.model("Post", postSchema);