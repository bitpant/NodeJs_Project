/* eslint-disable spaced-comment */
/* eslint-disable require-jsdoc */
/* eslint-disable no-unused-vars */
const express =require('express');

const {User} = require('../models/userModel');
// eslint-disable-next-line new-cap
const personRouter=express.Router();
const {Person, validatePerson} = require('../models/personModel');
const authenticate=require('../middleware/authentication');
const accessAuthenticate=require('../middleware/accessUserAuth');
const personAuthenticate=require('../middleware/personUpdateAuth');

personRouter.post('/createPerson/:userId', authenticate, (req, res)=> {
  const {error} =validatePerson(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  let countPerson;
  async function getCount() {
    countPerson=await Person.find().count();
    return countPerson;
  }
  let c;
  getCount().then((count)=>{
    c=count;
    console.log('count:'+c);
  });

  const createdby=req.body.createdby;
  let isPublished;
  let PersonUniqueueId;
  if (createdby===1) {
    isPublished= true;
    PersonUniqueueId=c+1; // parseInt(countPerson)+1;
  } else {
    isPublished= false;
    PersonUniqueueId=null;
  };

  const person = new Person({
    PersonUniqueueId: PersonUniqueueId,
    fullName: {
      firstName: req.body.fullName.firstName,
      middleName: req.body.fullName.middleName,
      lastName: req.body.fullName.lastName,
    },
    gender: req.body.gender,
    dob: req.body.dob,
    age: req.body.age,
    address: {
      flatNumber: req.body.address.flatNumber,
      societyName: req.body.address.societyName,
      streetName: req.body.address.streetName,
    },
    city: req.body.city,
    state: req.body.state,
    pincode: req.body.pincode,
    mobileNumber: req.body.mobileNumber,
    physicalDisability: req.body.physicalDisability,
    maritalStatus: req.body.maritalStatus,
    educationStatus: req.body.educationStatus,
    birthSign: req.body.birthSign,
    isPublished: isPublished,
    userId: req.body.userId,
  });


  User.findByIdAndUpdate(req.body.userId, {
    isPersonalInfo: true,
    PersonUniqueueId: PersonUniqueueId,
  }, {new: true})
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: 'User not found with id ' + req.body.userId,
          });
        } else {
          console.log('print');
        }
      }).catch((err) => {
        if (err.kind === 'ObjectId') {
          return res.status(404).send({
            message: 'User not found with id ' + req.body.userId,
          });
        }
        return res.status(500).send({
          message: 'Error retrieving User with id ' + req.body.userId,
        });
      });
  // Save User in the database
  person.save()
      .then((data) => {
        res.send(data);
      }).catch((err) => {
        res.status(500).send({
          message: err.message ||
            'Some error occurred while creating the person.',
        });
      });
});


// get all roles
personRouter.get('/getPersons/:userId', authenticate, (req, res)=>{
  Person.find({isPublished: true})
      .then((persons) => {
        res.send(persons);
      }).catch((err) => {
        return res.status(500).send({
          message: 'Some error occurred while retrieving Person Info',
        });
      });
});

// get PersonInfo by id
personRouter.get('/getPerson/:userId/:id', accessAuthenticate, (req, res)=>{
  Person.findById(req.params.id)
      .then((person) => {
        if (!person) {
          return res.status(404).send({
            message: 'Person not found with id ' + req.params.id,
          });
        }
        res.send(person);
      }).catch((err) => {
        if (err.kind === 'ObjectId') {
          return res.status(404).send({
            message: 'Person not found with id ' + req.params.id,
          });
        }
        return res.status(500).send({
          message: 'Error retrieving Person with id ' + req.params.id,
        });
      });
});

// update PersonInfo
personRouter.put('/:userId/:id', personAuthenticate, (req, res) => {
  // Validate Request
  const {error} =validatePerson(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  let Personinfoid; let PersonUniqueueId;
  async function getCount() {
    return await Person.find().count();
  }
  let c;
  const createdby=req.body.createdby;
  let isPublished;
  if (createdby===1) {
    isPublished= true;
  } else {
    isPublished= false;
  }


  async function a() {
    await Person.findById(req.params.id)
        .then((person) => {
          Personinfoid=person.PersonUniqueueId;
        });


    await getCount().then((count)=>{
      c=count;
      console.log('count:'+c);
      if (Personinfoid===null) {
        if (createdby===1) {
          PersonUniqueueId=c+1;
        } else {
          PersonUniqueueId=null;
        }
      } else {
        PersonUniqueueId=Personinfoid;
      }
      console.log('PersonUniqueueId:'+PersonUniqueueId);
    });
    await User.findByIdAndUpdate(req.body.userId, {
      isPersonalInfo: true,
      PersonUniqueueId: PersonUniqueueId,
    }, {new: true})
        .then((user) => {
          console.log('hello');
          if (!user) {
            return res.status(404).send({
              message: 'User not found with id ' + req.body.userId,
            });
          } else {
            console.log('print');
          }
        }).catch((err) => {
          if (err.kind === 'ObjectId') {
            return res.status(404).send({
              message: 'User not found with id ' + req.body.userId,
            });
          }
          return res.status(500).send({
            message: 'Error retrieving User with id ' + req.body.userId,
          });
        });

    // Find user and update it with the request body
    await Person.findByIdAndUpdate(req.params.id, {
      PersonUniqueueId: PersonUniqueueId,
      fullName: {
        firstName: req.body.fullName.firstName,
        middleName: req.body.fullName.middleName,
        lastName: req.body.fullName.lastName,
      },
      gender: req.body.gender,
      dob: req.body.dob,
      age: req.body.age,
      address: {
        flatNumber: req.body.address.flatNumber,
        societyName: req.body.address.societyName,
        streetName: req.body.address.streetName,
      },
      city: req.body.city,
      state: req.body.state,
      pincode: req.body.pincode,
      mobileNumber: req.body.mobileNumber,
      physicalDisability: req.body.physicalDisability,
      maritalStatus: req.body.maritalStatus,
      educationStatus: req.body.educationStatus,
      birthSign: req.body.birthSign,
      isPublished: isPublished,
      userId: req.body.userId,
    }, {new: true})
        .then((person) => {
          if (!person) {
            return res.status(404).send({
              message: 'Person not found with id ' + req.params.id,
            });
          }
          res.send(person);
        }).catch((err) => {
          if (err.kind === 'ObjectId') {
            return res.status(404).send({
              message: 'Person not found with id ' + req.params.id,
            });
          }
          return res.status(500).send({
            message: 'Error updating Person with id ' + req.params.id,
          });
        });
  }
  a();
});

// remove PersonInfo
personRouter.delete('/:userId/:id', authenticate, (req, res) =>{
  Person.findById(req.params.id)
      .then((person) => {
        if (!person) {
          return res.status(404).send({
            message: 'Person not found with id ' + req.params.id,
          });
        }
        person.delete();
        res.send(person);
      }).catch((err) => {
        if (err.kind === 'ObjectId') {
          return res.status(404).send({
            message: 'Person not found with id ' + req.params.id,
          });
        }
        return res.status(500).send({
          message: 'Error retrieving Person with id ' + req.params.id,
        });
      });
});


module.exports=personRouter;
