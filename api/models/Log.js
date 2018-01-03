const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const schema = mongoose.Schema({
  studentId: { type: String, required: true },
  date: { type: Date, required: true },
  dueDate: { type: Date, required: true },
  goals: { type: String, required: true },
  notes: { type: String, required: true }
});

schema.methods.apiRepr = () => {
  const repr = { id: this._id };

  Object.keys(this).forEach(key => {
    if (key !== '_id') {
      Object.assign(repr, { [key]: this[key] });
    }
  });

  return repr;
}

const Log = mongoose.model('Log', schema);

module.exports = Log;
