module.exports = {
  async up(db, client) {
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});
    await db.collection('roles').insertMany([
      {
        name:'Admin',
      },
      {
        name:'User'
      }
    ])
  },

  async down(db, client) {
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
    await db.collection('roles').deleteMany();
  }
};
