const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const schema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {type: String, default: ''},
    lastName: {type: String, default: ''}
});

schema.methods.apiRepr = () => {
  const repr = { id: this._id };

  Object.keys(this).forEach(key => {
    if (key !== '_id') {
      Object.assign(repr, { [key]: this[key] });
    }
  })

  return repr;
}

schema.methods.validatePassword = function(password) {
    return bcrypt.compare(password, this.password);
};

schema.statics.hashPassword = function(password) {
    return bcrypt.hash(password, 10);
};

const User = mongoose.model('User', schema);

module.exports = User;
