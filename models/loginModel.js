const mongoose = require('mongoose');
const LoginSchema = new mongoose.Schema(
    {
      LoginStatusId: Number,
      UserName: String,
      RoleId: Number,
      DateTime: String,
    },
    {timestamps: true}
);

const Login= mongoose.model('LoginDetails', LoginSchema);

module.exports.Login = Login;
