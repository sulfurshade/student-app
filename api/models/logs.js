const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const schema = mongoose.Schema({
  studentId: { type: String, required: true },
  date: { type: Date, required: true },
  dueDate: { type: Date, required: true },
  goals: { type: String },
  notes: { type: String }
});

schema.methods.apiRepr = function() {
  return {
    id: this._id,
    studentId: this.studentId,
    date: this.date,
    dueDate: this.dueDate,
    goals: this.goals,
    notes: this.notes
  };
}

const Log = mongoose.model('Log', schema);

module.exports = {Log};