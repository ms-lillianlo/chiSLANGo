const express = require('express');
const router = express.Router();
const models = require ('../../models');
const ensureAuthenticated = require('../../auth').ensureAuthenticated;
const bodyParser = require('body-parser');

router.use(bodyParser({urlencoded:true}))
// router.all('*', ensureAuthenticated);

router.get('/', function(req, res, next) {
  res.redirect('/home');
});

/* GET home page. */
router.get('/home', function(req, res, next) {
  if(req.isAuthenticated()){
    models.user.findById(req.user,{
    }).then((data)=>{res.json({data, loggedIn: true})})
  }else{
    res.json({loggedIn: false})
  }
})

module.exports = router;
