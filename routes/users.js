const express =require('express');
// eslint-disable-next-line new-cap
const useerRouter=express.Router();
const authenticate=require('../middleware/authentication');
const {User, validateUser} = require('../models/userModel');
const {Login} = require('../models/loginModel');


useerRouter.post('/createUser/:userId', authenticate, (req, res)=> {
  const {error} =validateUser(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const createdby=req.body.createdby;
  let isPublished;
  if (createdby===1) {
    isPublished= true;
  } else isPublished= false;

  const user = new User({
    userId: req.body.userId,
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
    RoleId: req.body.RoleId,
    PersonUniqueueId: req.body.PersonUniqueueId,
    isPublished: isPublished,
  });


  const login = new Login({
    UserName: req.body.userName,
    RoleId: req.body.RoleId,
    DateTime: new Date(),
  });

  login.save()
      .catch((err) => {
        res.status(500).send({
          message: err.message ||
      'Some error occurred while creating the Login details.',
        });
      });


  // Save User in the database
  user.save()
      .then((data) => {
        res.send(data);
      }).catch((err) => {
        res.status(500).send({
          message: err.message ||
          'Some error occurred while creating the User.',
        });
      });
});

// get all users
useerRouter.get('/getUsers/:userId', authenticate, (req, res)=>{
  User.find({isPublished: true})
      .then((users) => {
        res.send(users);
      }).catch((err) => {
        return res.status(500).send({
          message: 'Some error occurred while retrieving Users',
        });
      });
});

// get user by id
useerRouter.get('/getUser//:userId/:id', authenticate, (req, res)=>{
  User.findById(req.params.id)
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: 'User not found with id ' + req.params.id,
          });
        }
        res.send(user);
      }).catch((err) => {
        if (err.kind === 'ObjectId') {
          return res.status(404).send({
            message: 'User not found with id ' + req.params.id,
          });
        }
        return res.status(500).send({
          message: 'Error retrieving User with id ' + req.params.id,
        });
      });
});

// remove roles
useerRouter.delete('/:userId/:id', authenticate, (req, res) =>{
  User.findById(req.params.id)
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: 'User not found with id ' + req.params.id,
          });
        }
        user.delete();
        res.send(user);
      }).catch((err) => {
        if (err.kind === 'ObjectId') {
          return res.status(404).send({
            message: 'User not found with id ' + req.params.id,
          });
        }
        return res.status(500).send({
          message: 'Error retrieving User with id ' + req.params.id,
        });
      });
});

// update roles
useerRouter.put('/:userId/:id', authenticate, (req, res) => {
  // Validate Request
  const {error} =validateUser(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const createdby=req.body.createdby;
  let isPublished;
  if (createdby===1) {
    isPublished= true;
  } else isPublished= false;
  // Find user and update it with the request body
  User.findByIdAndUpdate(req.params.id, {
    userId: req.body.userId,
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
    RoleId: req.body.RoleId,
    isPublished: isPublished,
  }, {new: true})
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: 'User not found with id ' + req.params.id,
          });
        }
        res.send(user);
      }).catch((err) => {
        if (err.kind === 'ObjectId') {
          return res.status(404).send({
            message: 'User not found with id ' + req.params.id,
          });
        }
        return res.status(500).send({
          message: 'Error updating User with id ' + req.params.id,
        });
      });
});


module.exports=useerRouter;
