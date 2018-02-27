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
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    }
});

schema.methods.apiRepr = function () {
  // this = document
  const obj = this.toObject();
  const repr = { id: this._id };

  Object.keys(obj).forEach(key => {
    if (!['_id', 'password', '__v'].includes(key)) {
      Object.assign(repr, { [key]: obj[key] });
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
