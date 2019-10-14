/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
const {User} = require('../models/userModel');
const {Person} = require('../models/personModel');
function personAuthenticate(req, res, next) {
  let roleId;
  // let userId;
  Person.findById(req.params.id)
      .then((person) => {
        userId=person.userId;
        // console.log(userId);
      });

  User.findById(req.params.userId)
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: 'User not found with id ' + req.params.userId,
          });
        }
        roleId=user.RoleId;
        isPersonalInfo=user.isPersonalInfo;
        PersonUniqueueId=user.PersonUniqueueId;
        req.body.createdby=user.RoleId;
        if (parseInt(roleId)===3 && req.params.userId!=userId) {
          return res.status(500).send({
            message: 'Access User can only access his/her profile only.',
          });
        } else {
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


module.exports=personAuthenticate;

