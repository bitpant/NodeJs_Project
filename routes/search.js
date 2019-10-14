/* eslint-disable spaced-comment */
/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
const {Person} = require('../models/personModel');
const express =require('express');
// eslint-disable-next-line new-cap
const searchRouter=express.Router();
// const PersonObj = require('./modals.js').personSchema;
const authenticate=require('../middleware/authentication');
async function findByName(name) {
  const persons = await Person.find(
      {'fullName.firstName': name}

  );
  //console.log('Person list ', persons);
  return persons;
}

async function findByAge(age) {
  const persons = await Person.find({age: age});
  //console.log('Person list ', persons);
  return persons;
}

async function findByCity(city) {
  const persons = await Person.find({city: city});
  //console.log(persons);
  return persons;
}

async function findByNameAndAge(name, age) {
  const persons = await Person.find({'fullName.firstName': name, 'age': age});
  //console.log(persons);
  return persons;
}

async function findByCityAndAge(city, age) {
  const persons = await Person.find({city: city, age: age});
  //console.log(persons);
  return persons;
}


async function findByNameAndCity(name, city) {
  const persons = await Person.find({'fullName.firstName': name, 'city': city});
  //console.log(persons);
  return persons;
}

async function findByNameAndCityAndAge(name, city, age) {
  const persons = await Person.find({'fullName.firstName': name, 'city': city, 'age': age});
  //console.log(persons);
  return persons;
}

searchRouter.put('/:userId', authenticate, (req, res)=>{
  if ((req.body.fullName.firstName != null||'') && (req.body.city != null||'')) {
    findByNameAndCity(req.body.fullName.firstName, req.body.city).then((persons)=>res.send(persons)).catch((err) => console.log(err.message));
  } else if ((req.body.city != null || '') && (req.body.age != null||'')) {
    findByCityAndAge(req.body.city, req.body.age).then((persons)=>res.send(persons)).catch((err) => console.log(err.message));
  } else if ( (req.body.fullName.firstName !='') && (req.body.age != null||'')) {
    findByNameAndAge(req.body.fullName.firsName, req.body.age).then((persons) => res.send(persons)).catch((err) => console.log(err.message));
  } else if (req.body.city != null||'') {
    findByCity(req.body.city).then((persons)=>res.send(persons)).catch((err) => console.log(err.message));
  } else if (req.body.age !=null) {
    findByAge(req.body.age).then((persons)=>res.send(persons)).catch((err) => console.log(err.message));
  } else if (req.body.fullName.firstName!='') {
    findByName(req.body.fullName.firstName).then((persons)=>res.send(persons)).catch((err) => console.log(err.message));
  } else {
    findByNameAndCityAndAge(req.body.fullName.firstName, req.body.city, req.body.age).then((persons)=>res.send(persons)).catch((err) => console.log(err.message));
  }
});


module.exports=searchRouter;
