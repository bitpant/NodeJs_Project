/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
const {User} = require('../models/userModel');
const {Person} = require('../models/personModel');
function accessAuthenticate(req, res, next) {
  let roleId;
  let isPersonalInfo;
  let PersonUniqueueId;
  let PersonUniqueueIdPerson;

  Person.findById(req.params.id)
      .then((person) => {
        PersonUniqueueIdPerson=person.PersonUniqueueId;
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
        if (isPersonalInfo===false) {
          return res.status(500).send({
            // eslint-disable-next-line max-len
            message: 'User\'s personal info profile is not created by Admin or Operator.Please wait for profile creation then you can see and edit your profile',
          });
        } else if (parseInt(roleId)===3 && PersonUniqueueId!=PersonUniqueueIdPerson) {
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


module.exports=accessAuthenticate;

