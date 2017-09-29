const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
  name: {
    firstName: String,
    lastName: String
  },
  instrument: {type: String, required: true},
  username: {type: String, unique: true},
  logs: [{notes:String, goals:String, date:Date, dueDate:Date}]
});


// blogPostSchema.virtual('authorName').get(function() {
//   return `${this.author.firstName} ${this.author.lastName}`.trim();
// });

// blogPostSchema.methods.apiRepr = function() {
//   return {
//     id: this._id,
//     author: this.authorName,
//     content: this.content,
//     title: this.title,
//     created: this.created
//   };
// }

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

module.exports = {BlogPost};
