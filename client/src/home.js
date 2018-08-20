import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.css';
import axios from 'axios'

class Home extends Component {
  constructor() {
    super();
    this.state = {
      phrase: [],
      literal_translation: [],
      answer1: [],
      answer2: [],
      answer3: [],
      answer4: [],
      score: 0,
      tryAgain: "disabled",
      answerStatus: ""
    }
  }

  componentDidMount() {
    axios.post('/indexRouter/continue').then(({ data }) => {
      this.setState(data)
    })

  }

answer(e){
  e.preventDefault();
  /*if(e.target.id === "button1"){
    var answer = this.state.answer1
  }
  else if(e.target.id === "button2"){
    var answer = this.state.answer2
  }
  else if(e.target.id === "button3"){
    var answer = this.state.answer3
  }
  else if(e.target.id === "button4"){
    var answer = this.state.answer4
  } */
  axios.post('/indexRouter/answer').then(({ data }) => {
  this.setState({score: data.score,
        tryAgain: data.tryAgain,
        answerStatus: data.answerStatus})
    })
  }
  continue(){axios.post('/indexRouter/continue').then(({ data }) => {
    this.setState(data)
  })
}

  render() {
    return (
      <div>
        <div className="container">
          <div className="card text-center">
            <div className="card-body">

              <h3>Phrase in Spanish: {this.state.phrase}</h3>
              <h3>Literal translation: {this.state.literal_translation}</h3>
              <h3>What you think it means:</h3>
              <form className="answers">
                <button id="button1" onClick={this.answer.bind(this)} className="btn btn-lg hvr-grow large" name="answer" value={this.state.answer1}>{this.state.answer1}</button>
                <button id="button2" onClick={this.answer.bind(this)} className="btn btn-lg hvr-grow large" name="answer" value={this.state.answer2}>{this.state.answer2}</button>
                <button id="button3" onClick={this.answer.bind(this)} className="btn btn-lg hvr-grow large" name="answer" value={this.state.answer3}>{this.state.answer3}</button>
                <button id="button4" onClick={this.answer.bind(this)} className="btn btn-lg hvr-grow large" name="answer" value={this.state.answer4}>{this.state.answer4}</button>
              </form>
              <button id="tryAgain" name="redo" className="btn btn-lg hvr-grow  small {this.state.tryAgain}">Try Again</button>
              <button onClick={this.continue.bind(this)} id="nextQuestion" name="continueButton" className="btn btn-lg hvr-grow small">Continue</button>
              <h3>{this.state.answerStatus}</h3>
              <h1>SCORE: {this.state.score}</h1>
              <Link to="/" className="btn btn-lg hvr-grow large">Log Out</Link>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

  export default Home;
