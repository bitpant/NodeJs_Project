/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
/* eslint-disable no-unused-vars */
const express =require('express');
const mongoose= require('mongoose');
const roleRouter=express.Router();
const authenticate=require('../middleware/authentication');
const {Roles, validateRole} = require('../models/roleModel');


async function createRole(id, name, createdby) {
  let isPublished;
  if (createdby===1) {
    isPublished= true;
  } else isPublished= false;
  const role=new Roles({
    RoleId: id,
    RoleName: name,
    isPublished: isPublished,
  });
  const result=await role.save();
  return result;
}

// create roles
roleRouter.post('/createRole/:userId', authenticate, (req, res)=> {
  const {error} =validateRole(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  let id;
  const name=req.body.RoleName;
  const createdby=req.body.createdby;
  console.log(createdby);
  if (name==='Administrator') id= 1;
  else if (name==='Operator') id= 2;
  else id=3;
  // eslint-disable-next-line max-len
  createRole(id, name, createdby).then((roles)=>res.send(JSON.stringify(roles)));
});

// get all roles
roleRouter.get('/getRoles/:userId', authenticate, (req, res)=>{
  Roles.find({isPublished: true})
      .then((roles) => {
        res.send(roles);
      }).catch((err) => {
        return res.status(500).send({
          message: 'Some error occurred while retrieving Roles',
        });
      });
});

// get role by id
roleRouter.get('/:userId/:roleId', authenticate, (req, res)=>{
  Roles.findById(req.params.roleId)
      .then((role) => {
        if (!role) {
          return res.status(404).send({
            message: 'Role not found with id ' + req.params.roleId,
          });
        }
        res.send(role);
      }).catch((err) => {
        if (err.kind === 'ObjectId') {
          return res.status(404).send({
            message: 'Role not found with id ' + req.params.roleId,
          });
        }
        return res.status(500).send({
          message: 'Error retrieving role with id ' + req.params.roleId,
        });
      });
});

// update roles
roleRouter.put('/:userId/:roleId', authenticate, (req, res) => {
  // Validate Request
  const {error} =validateRole(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  let isPublished;
  if (req.body.createdby==='Administrator') {
    isPublished= true;
  } else isPublished= false;
  let id;
  const name=req.body.RoleName;
  if (name==='Administrator') id= 1;
  else if (name==='Operator') id= 2;
  else id=3;
  // Find role and update it with the request body
  Roles.findByIdAndUpdate(req.params.roleId, {
    RoleId: id,
    RoleName: req.body.RoleName,
    isPublished: isPublished,
  }, {new: true})
      .then((role) => {
        if (!role) {
          return res.status(404).send({
            message: 'role not found with id ' + req.params.roleId,
          });
        }
        res.send(role);
      }).catch((err) => {
        if (err.kind === 'ObjectId') {
          return res.status(404).send({
            message: 'role not found with id ' + req.params.roleId,
          });
        }
        return res.status(500).send({
          message: 'Error updating role with id ' + req.params.roleId,
        });
      });
});


// remove roles
roleRouter.delete('/:userId/:roleId', authenticate, (req, res) =>{
  Roles.findById(req.params.roleId)
      .then((role) => {
        if (!role) {
          return res.status(404).send({
            message: 'Role not found with id ' + req.params.roleId,
          });
        }
        role.delete();
        res.send(role);
      }).catch((err) => {
        if (err.kind === 'ObjectId') {
          return res.status(404).send({
            message: 'Role not found with id ' + req.params.roleId,
          });
        }
        return res.status(500).send({
          message: 'Error retrieving role with id ' + req.params.roleId,
        });
      });
});


module.exports=roleRouter;
