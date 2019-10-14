/* eslint-disable require-jsdoc */
const {User} = require('../models/userModel');
function authenticate(req, res, next) {
  /* console.log(req.params.userId);
  if (!req.params.userId) {
    return res.status(404).send({
      message: 'UserId parameter cannot be empty ',
    });
  } */
  let roleId;
  User.findById(req.params.userId)
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: 'User not found with id ' + req.params.userId,
          });
        }
        roleId=user.RoleId;
        if (parseInt(roleId)===3) {
          return res.status(500).send({
            message: 'Access User cannot perform this operation: ',
          });
        } else {
          req.body.createdby=user.RoleId;
          next();
        }
      }).catch((err) => {
        if (err.kind === 'ObjectId') {
          return res.status(404).send({
            message: 'User not found with id ' + req.params.userId,
          });
        }
        return res.status(500).send({
          message: 'Error retrieving User with id ' + req.params.userId,
        });
      });
}


module.exports=authenticate;

