module.exports = {
  async up(db, client) {
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    await db.collection('posts').updateMany({}, {$rename: {'content': 'content_markdown'}});
    await db.collection('posts').updateMany({}, {$set: {"content_html": ""}});
  },

  async down(db, client) {
    await db.collection('posts').updateMany({}, {$rename: {'content_markdown': 'content'}});
    console.log("Run `unset` operation to remove `content_html` column.");
  }
};
