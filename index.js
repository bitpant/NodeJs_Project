/* eslint-disable no-unused-vars */
const express =require('express');
const app = express();
const morgan=require('morgan');
const roles=require('./routes/roles');
const users=require('./routes/users');
const home=require('./routes/home');
const search=require('./routes/search');
const personinfo=require('./routes/personinfo');
const port= process.env.PORT || 5050;
const config=require('config');
const mongoose= require('mongoose');

mongoose.connect('mongodb://localhost/Node_Assignment')
    .then(()=>console.log('Connected to MongoDB...'))
    .catch((err)=>console.log('Error in connecttion'));


app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(express.static('public'));

// Configration
console.log(`NODE_ENV:${process.env.NODE_ENV}`);
console.log(`app:${app.get('env')}`);
console.log(`Appliacation Name:${config.get('name')}`);

if (app.get('env')==='development') {
  app.use(morgan('tiny'));
  console.log(`Morgan enabled...`);
}

app.use('/api/roles', roles);
app.use('/', home);
app.use('/api/users', users);
app.use('/api/person', personinfo);
app.use('/api/search', search);
app.listen(port, ()=> console.log(`Listening on port ${port}.....`));
