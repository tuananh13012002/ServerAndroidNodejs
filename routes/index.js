var express = require('express');
var router = express.Router();
var fs=require('fs');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/getUsers',function (req,res){
   fs.readFile('data/data.txt',function (err,data){
       if(err!=null){
           res.send(err.message);
       }else {
           const text = data;
           const myArr = JSON.parse(text)
           res.send(myArr);
       }
   })
});

module.exports = router;
