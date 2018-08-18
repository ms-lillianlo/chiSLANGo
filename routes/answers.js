const apiRouter = require(".router/api");
var express = require("express");
var router = express.Router();
const models = require("../models");

app.use("/api", apiRouter);

router.post("/post", function(req, res, err) {
  models.Answer.create({
    is_answer_correct: req.body.is_answer_correct,
    UserId: req.user,
    QuestionId: req.body.question
  }).then(answer => {
    res.redirect("/posts");
  });
});
module.exports = router;
