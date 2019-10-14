const mongoose= require('mongoose');
const Joi = require('joi');

const userSchema =new mongoose.Schema({
  userId: String,
  userName: String,
  date: {type: Date, default: Date.now},
  email: String,
  password: String,
  RoleId: {type: Number, default: 3},
  isPersonalInfo: {type: Boolean, default: false},
  PersonUniqueueId: Number,
  createdby: Number,
  isPublished: {type: Boolean, default: false},
});


const User= mongoose.model('Users', userSchema);

// eslint-disable-next-line require-jsdoc
function validateUser(user) {
  const schema ={
    userId: Joi.string().required(),
    userName: Joi.string().min(5).max(30).required(),
    date: Joi.date(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).max(30).required(),
    RoleId: Joi.number(),
    isPersonalInfo: Joi.bool(),
    PersonUniqueueId: Joi.number(),
    createdby: Joi.number(),
    isPublished: Joi.bool(),
  };

  return Joi.validate(user, schema);
}

module.exports.User = User;
module.exports.validateUser = validateUser;
