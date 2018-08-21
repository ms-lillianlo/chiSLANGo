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
      disabled: "true",
      answerStatus: ""
    }
  }

//sets state when page loads for first question
  componentDidMount() {
    axios.post('/indexRouter/continue').then(({ data }) => {
      this.setState(data)
    })
  }
  
//sends answer to backend
answer(e){
  e.preventDefault();
  if(e.target.id === "button1"){
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
  } 
  //sets state depending on if answer if correct or not
  axios.post('/indexRouter/answer', {answer: answer}).then(({ data }) => {  
  this.setState({isabled: data.disabled,
    answerStatus: data.answerStatus, 
    score: data.score || this.state.score})
    })
  }
  //sets state for next question
  continue(){axios.post('/indexRouter/continue').then(({ data }) => {
    this.setState(data);
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
                <button id="button1" onClick={this.answer.bind(this)} className="btn btn-lg hvr-grow large">{this.state.answer1}</button>
                <button id="button2" onClick={this.answer.bind(this)} className="btn btn-lg hvr-grow large">{this.state.answer2}</button>
                <button id="button3" onClick={this.answer.bind(this)} className="btn btn-lg hvr-grow large">{this.state.answer3}</button>
                <button id="button4" onClick={this.answer.bind(this)} className="btn btn-lg hvr-grow large">{this.state.answer4}</button>
              </form>
              <button id="tryAgain" name="redo" className="btn btn-lg hvr-grow  small" disabled={this.state.disabled}>Try Again</button>
              <button id="nextQuestion" name="continueButton" onClick={this.continue.bind(this)} className="btn btn-lg hvr-grow small">Continue</button>
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