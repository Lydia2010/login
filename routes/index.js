let express = require('express');
let router = express.Router();
let rando = require('random-words') // added package
let jwt = require('jsonwebtoken');
require('dotenv').config(); // load environment variable

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/word', (req, res) => {
  let token = req.query.token;
  try {
    jwt.verify(token, process.env.SECRET);
    let word = rando(1);
    res.send({word: word});
  } catch(err){
    res.send({error: "invalid token", details: err})
  }


});

router.get('/words/:count', (req, res) => {
  let count = Number(req.params.count);
  console.log(count)
  let words = rando({exactly: count, join: ' '});
  console.log(words)
  res.send({words: words});
});

router.get('/sentence', (req, res) => {
 // console.log ( req);
  min = (isNaN(Number(req.query.min))) ? 1 : Number(req.query.min);
  max = (isNaN(Number(req.query.max))) ? min+1 : Number(req.query.max);
  let sentence = rando ( {min: min, max: max, join: ' '});
  res.send({sentence: sentence});


});

router.post('/word',(req,res) => {
  res.send({word: "Funny"})
});

router.get('/secret', (req, res) => {
  res.send({secret: process.env.SECRET})
});

// create login

router.post('/login', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  //Verify username and password
  if(username === 'fred' && password === process.env.PASSWORD) {
    let token = jwt.sign({
      username: username},
        process.env.SECRET,
        {expiresIn: '10 minutes'
    });
    res.send({token: token})
  }else {
    res.send({error: "Invalid login credentials"})
  }
});


module.exports = router;
