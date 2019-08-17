var express = require('express');
var router = express.Router();
var userModule=require('../modules/user');

var fun=function checkEmail(req,res,next){
  var email=req.body.email;
  var checkExistEmail=userModule.find({email:email});
  checkExistEmail.exec((err,data)=>{
    if(err) throw err;
    if(data)
    {
      return res.render('signup', { title: 'Password Management',msg:'Email existed' });
    }
      next();
  });
}


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Password Management' });
});

router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Password Management',msg:'' });
});

router.post('/signup',fun, function(req, res, next) {
var username=req.body.uname;
var email=req.body.email;
var password=req.body.psw;
var confpassword=req.body.cpsw;

var userDetails=new userModule({
  username:username,
  email:email,
  password:password,
});
userDetails.save((err,res)=>{
if(err) throw err;
res.render('signup', { title: 'Password Management',msg:'User registered Successfully' });
})

});

router.get('/passcat', function(req, res, next) {
  res.render('password-category', { title: 'Password Management' });
});

router.get('/AddNewCategory', function(req, res, next) {
  res.render('AddNewCategory', { title: 'Password Management' });
});

router.get('/AddNewPassword', function(req, res, next) {
  res.render('AddNewPassword', { title: 'Password Management' });
});

router.get('/ViewAllPassword', function(req, res, next) {
  res.render('ViewAllPassword', { title: 'Password Management' });
});

module.exports = router;