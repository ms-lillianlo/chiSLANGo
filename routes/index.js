var express = require("express");
var router = express.Router();
const models = require("../models");
const app = express();
app.use(express.static("public"));

//function to shuffle questions
const shuffleArray = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

/* router.get("/login", function(req, res, next) {
}); */

let shuffledQuestions;
let answers;
let score = 0;
let previousQuestion;
let remainQuestions;
let answerStatus = "";
let tyButton;
let continueButton;
let correctAnswer;
let isButton1Disabled = false;
let isButton2Disabled = false;
let isButton3Disabled = false;
let isButton4Disabled = false;
let questionsRemaining;

router.post("/getquestions", function(req, res, next){
  //gets and shuffles questions from database
  models.Question.findAll().then(questions => {
    shuffleArray(questions);
    shuffledQuestions = questions;
    //gets and shuffles answers
    answers = [
      questions[0].option_1,
      questions[0].option_2,
      questions[0].option_3,
      questions[0].correct_answer
    ];

    shuffleArray(answers);
    correctAnswer = questions[0].correct_answer;
    answerStatus = "";
    questionsRemaining = shuffledQuestions.length;
    //sends data to update state
    res.json({
      phrase: questions[0].phrase,
      literal_translation: questions[0].literal_translation,
      answer1: answers[0],
      answer2: answers[1],
      answer3: answers[2],
      answer4: answers[3],
      score: score,
      answerStatus: answerStatus,
      correctAnswer: correctAnswer,
      isButton1Disabled: isButton1Disabled,
      isButton2Disabled: isButton2Disabled,
      isButton3Disabled: isButton3Disabled,
      isButton4Disabled: isButton4Disabled,
      questionsRemaining: questionsRemaining,
    });
  });
});

router.post("/continue", function(req, res, next){
  questionsRemaining = shuffledQuestions.length;
  console.log(shuffledQuestions.length)

  if (questionsRemaining === 1){
    console.log(questionsRemaining)
    {res.json({
        questionsRemaining: questionsRemaining,
        score: score,
      })
    }
  }

  else{
   //shifts to next question in array
    shuffledQuestions.shift()

    //defines and shuffles answers
    answers = [
      shuffledQuestions[0].option_1,
      shuffledQuestions[0].option_2,
      shuffledQuestions[0].option_3,
      shuffledQuestions[0].correct_answer
    ];
    shuffleArray(answers);

    //defines variabeles for state
    correctAnswer = shuffledQuestions[0].correct_answer;
    answerStatus = "";
    phrase = shuffledQuestions[0].phrase;
    literal_translation = shuffledQuestions[0].literal_translation;
    answer1 = answers[0];
    answer2 = answers[1];
    answer3 = answers[2];
    answer4 = answers[3];
    questionsRemaining = shuffledQuestions.length;

    //sends data to update state
    res.json({
      phrase: phrase,
      literal_translation: literal_translation,
      answer1: answer1,
      answer2: answer2,
      answer3: answer3,
      answer4: answer4,
      score: score,
      answerStatus: answerStatus,
      correctAnswer: correctAnswer,
      isButton1Disabled: isButton1Disabled,
      isButton2Disabled: isButton2Disabled,
      isButton3Disabled: isButton3Disabled,
      isButton4Disabled: isButton4Disabled,
      questionsRemaining: questionsRemaining,
    });
  }
  });

router.post("/answer", function(req, res, next){
  //updates state depending on if answer is correct or not
  if (req.body.answer == correctAnswer) {
    score += 1;
    answerStatus = "Correct!";
    res.json({
      answerStatus: answerStatus,
      score: score
    })

  } else {
    answerStatus = "Incorrect";
    res.json({
      answerStatus: answerStatus
    })
  }

});
module.exports = router;
