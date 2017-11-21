const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const { Log } = require('./logs');

const studentSchema = mongoose.Schema({
  name: {
    firstName: String,
    lastName: String
  },
  image: {type: String, required: true},
  instrument: {type: String, required: true},
  level: {type: String, required: true},
  username: {type: String, required: true, unique: true},
  bio: {type: String, required: true}
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

studentSchema.methods.logs = function () {
  return Log.find({ studentId: this._id.toString() })
}

const Student = mongoose.model('Student', studentSchema);

module.exports = {Student};
