var express = require("express");
var router = express.Router();
const models = require("../models");
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();

router.use(bodyParser({urlencoded:true}))

const app = express();
app.use(express.static("public"));

router.get('/test', function(req, res, next) {
  if(req.isAuthenticated()){
    models.user.findById(req.user,{
    }).then((data)=>{res.json({data, loggedIn: true})})
  }else{
     res.json({loggedIn: false})
  }
})

router.get('/test/:id', function(req, res, next) {
  const id = Number(req.params.id);
  models.user.findById(id,{})
  .then((data)=>{res.json({data, loggedIn: false})
  })
})

/*// serve the homepage
app.get("/home", (req, res) => {
  res.sendFile(__dirname + "/home.hbs");
});*/

//const setupAuth = require('./auth');
const shuffleArray = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

/* GET home page. */
/*router.get("/", function(req, res, next) {
  res.render("index", { title: "Chislango" });
});*/

router.get("/login", function(req, res, next) {
  //res.render('login', { title: 'stuff here for github' });
});

let shuffledQuestions;
let answers;
let score = 0;
let previousQuestion;
let remainQuestions;
let tryAgain = "disabled";
let answerStatus = "";
let tyButton;
let continueButton;

/*router.get("/", function(req, res, next) {
  // res.sendFile(__dirname + '/index.hbs');
  /*models.Question.findAll().then(questions => {
    shuffleArray(questions);
    shuffledQuestions = questions;
    answers = [
      questions[0].option_1,
      questions[0].option_2,
      questions[0].option_3,
      questions[0].correct_answer
    ];
    shuffleArray(answers);

    res.json({
      phrase: questions[0].phrase,
      literal_translation: questions[0].literal_translation,
      answer1: answers[0],
      answer2: answers[1],
      answer3: answers[2],
      answer4: answers[3],
      score: score,
      tryAgain: tryAgain,
      answerStatus: answerStatus
    });
  });
});*/

router.post("/continue", function(req, res, next){
  models.Question.findAll().then(questions => {
    shuffleArray(questions);
    shuffledQuestions = questions;
    answers = [
      questions[0].option_1,
      questions[0].option_2,
      questions[0].option_3,
      questions[0].correct_answer
    ];
    shuffleArray(answers);

    res.json({
      phrase: questions[0].phrase,
      literal_translation: questions[0].literal_translation,
      answer1: answers[0],
      answer2: answers[1],
      answer3: answers[2],
      answer4: answers[3],
      score: score,
      tryAgain: tryAgain,
      answerStatus: ""
    });
  });

})

router.post("/answer", function(req, res, next){
  //previousQuestion = shuffledQuestions.shift();

  /*if (shuffledQuestions.length == 0) {
    if (req.body.answer == previousQuestion.correct_answer) {
      score += 1;
    }
    res.render("endGame", {
      answerStatus: "End of questions!",
      score: score
    });
    score = 0;
  }*/
  if (req.body.answer == req.body.correct_answer) {
    score += 1;
    answerStatus = "Correct!";
    tryAgain = "disabled";
    res.json({
      tryAgain: tryAgain,
      answerStatus: answerStatus
    })

  } else if (req.body.answer != req.body.correct_answer) {
    answerStatus = "Incorrect";
    score = data.score;
    tryAgain = "";
    res.json({
      tryAgain: tryAgain,
      answerStatus: answerStatus
    })
  }

});

module.exports = router;
