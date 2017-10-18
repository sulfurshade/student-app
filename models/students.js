const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
  name: {
    firstName: String,
    lastName: String
  },
  image: {type: String, required: true},
  instrument: {type: String, required: true},
  level: {type: String, required: true},
  username: {type: String, required: true, unique: true},
  bio: {type: String, required: true},
  logs: [{notes:String, goals:String, date:Date, dueDate:Date}]
});

studentSchema.virtual('studentName').get(function() {
  return `${this.name.firstName} ${this.name.lastName}`.trim();
});

studentSchema.methods.apiRepr = function() {
  return {
    id: this._id,
    name: this.studentName,
    image: this.image,
    instrument: this.instrument,
    level: this.level,
    bio: this.bio,
    username: this.username
  };
}

const Student = mongoose.model('Student', studentSchema);

module.exports = {Student};
