/* eslint-disable require-jsdoc */
const mongoose= require('mongoose');
const Joi = require('joi');
const roleSchema =new mongoose.Schema({
  RoleId: Number,
  RoleName: String,
  date: {type: Date, default: Date.now},
  createdby: Number,
  isPublished: {type: Boolean, default: false},
});


const Roles= mongoose.model('Role', roleSchema);


function validateRole(role) {
  const schema ={
    RoleId: Joi.number(),
    RoleName: Joi.string().valid(['Administrator', 'Operator', 'AccessUser']).
        required(),
    createdby: Joi.number(),
    isPublished: Joi.bool(),
  };

  return Joi.validate(role, schema);
}


module.exports.Roles = Roles;
module.exports.validateRole = validateRole;
