const express =require('express');
// eslint-disable-next-line new-cap
const router=express.Router();


router.get('/', (req, res)=>{
  // eslint-disable-next-line max-len
  res.render('home', {title: 'Brijesh\'s Node Assignment', message: 'Please follow below link  and read readme.txt file to begin '});
});

module.exports=router;
