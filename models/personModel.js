const mongoose= require('mongoose');
const Joi = require('joi');

const personSchema =new mongoose.Schema({
  PersonUniqueueId: Number,
  fullName: {
    firstName: String,
    middleName: String,
    lastName: String,
  },
  gender: String,
  dob: Date,
  age: Number,
  address: {
    flatNumber: String,
    societyName: String,
    streetName: String,
  },
  city: String,
  state: String,
  pincode: Number,
  mobileNumber: Number,
  physicalDisability: String,
  maritalStatus: String,
  educationStatus: String,
  birthSign: String,
  createdby: Number,
  isPublished: {type: Boolean, default: false},
  userId: String,
});


const Person= mongoose.model('PersonInfo', personSchema);

// eslint-disable-next-line require-jsdoc
function validatePerson(person) {
  const schema ={
    PersonUniqueueId: Joi.number(),
    fullName: Joi.object().required(),
    fullName: Joi.object().keys({
      firstName: Joi.string().max(30).required(),
      middleName: Joi.string().max(30),
      lastName: Joi.string().max(30),
    }),
    gender: Joi.string().required(),
    dob: Joi.date(),
    age: Joi.number().required(),
    pincode: Joi.number().required(),
    mobileNumber: Joi.number().required(),
    address: Joi.object().required(),
    address: Joi.object().keys({
      flatNumber: Joi.string().required(),
      societyName: Joi.string().required(),
      streetName: Joi.string().required(),
    }),
    city: Joi.string().required(),
    state: Joi.string().required(),
    maritalStatus: Joi.string().
        valid(['Married', 'Unmarried', 'Divorced', 'Widow', 'Widower']),
    educationStatus: Joi.string(),
    birthSign: Joi.string(),
    createdby: Joi.number(),
    isPublished: Joi.bool(),
    userId: Joi.string().required(),
    physicalDisability: Joi.string(),
  };

  return Joi.validate(person, schema);
}

module.exports.Person = Person;
module.exports.validatePerson = validatePerson;
