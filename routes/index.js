var express = require('express');
var router = express.Router();
var fs = require('fs');
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});
router.get('/getUsers', function (req, res) {
    fs.readFile('data/data.txt', function (err, data) {
        if (err != null) {
            res.send(err.message);
        } else {
            const text = data;
            const myArr = JSON.parse(text)
            res.send(myArr);
        }
    })
});
var multer=require('multer');
var storage=multer.diskStorage({
    destination :function (req,file ,cb){
        cb(null,'upload/');
    },
    filename :function (req,file,cb){
        cb(null,Date.now()+'-'+file.originalname);
    }
});
var upload = multer({storage:storage})
router.post('/addUsers',upload.single('avatar'), function (req, res) {
    var email = req.body.email;
    var password = req.body.password;
    var data = {
        email: undefined,
        password: undefined,
        avatar: undefined,
        urlAvatar: undefined
    }
    data.email = email;
    data.password = password;
    data.avatar=req.file.originalname;
    data.urlAvatar=req.file.destination;
    res.send(data);

})

module.exports = router;
