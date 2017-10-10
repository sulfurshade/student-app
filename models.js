const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
  name: {
    firstName: String,
    lastName: String
  },
  instrument: {type: String, required: true},
  level: {type: String, required: true},
  username: {type: String, required: true, unique: true},
  logs: [{notes:String, goals:String, date:Date, dueDate:Date}]
});


studentSchema.virtual('studentName').get(function() {
  return `${this.name.firstName} ${this.name.lastName}`.trim();
});

studentSchema.methods.apiRepr = function() {
  return {
    id: this._id,
    name: this.studentName,
    instrument: this.instrument,
    level: this.level,
    username: this.username
  };
}

const Student = mongoose.model('Student', studentSchema);

module.exports = {Student};
