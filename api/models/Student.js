const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const Log = require('./Log');

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

studentSchema.methods.apiRepr = () => {
  const repr = { id: this._id };

  Object.keys(this).forEach(key => {
    if (key !== '_id') {
      Object.assign(repr, { [key]: this[key] });
    }
  });

  return repr;
}

studentSchema.methods.logs = function () {
  return Log.find({ studentId: this._id.toString() })
}

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
