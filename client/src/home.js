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
    }
  }

  componentDidMount() {
    axios.get('/indexRouter').then(({ data }) => {
      console.log(data)
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
              <form action="/home" method="POST" className="answers">
                <input type="hidden" name="question_id" value="{{id}}" />
                <button type="submit" className="btn btn-lg hvr-grow large" name="answer" value="{{answer1}}">{this.state.answer1}</button>
                <button type="submit" className="btn btn-lg hvr-grow large" name="answer" value="{{answer2}}">{this.state.answer2}</button>
                <button type="submit" className="btn btn-lg hvr-grow large" name="answer" value="{{answer3}}">{this.state.answer3}</button>
                <button type="submit" className="btn btn-lg hvr-grow large" name="answer" value="{{answer4}}">{this.state.answer4}</button>
              </form>
              <button id="tryAgain" name="redo" className="btn btn-lg hvr-grow small">Try Again</button>
              <button id="nextQuestion" name="continueButton" className="btn btn-lg hvr-grow small">Continue</button>
              <h3>Correct/incorrect</h3>
              <h1>SCORE: A number</h1>
              <Link to="/" className="btn btn-lg hvr-grow large">Log Out</Link>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

  export default Home;
