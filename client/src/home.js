import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './index.css';

class Home extends Component {
    render() {
      return (
        <div>
            <div className="container">
    <div className="card text-center">
        <div className="card-body">
    
        <h3>Phrase in Spanish: Dummy phrase</h3>
            <h3>Literal translation: dummy traslation</h3>
            <h3>What you think it means:</h3>
            <form action="/home" method="POST" className="answers">
                <input type="hidden" name="question_id" value="{{id}}"/>
                <button type="submit" className="btn btn-lg hvr-grow large" name="answer" value="{{answer1}}">Answer 1</button>
                <button type="submit" className="btn btn-lg hvr-grow large" name="answer" value="{{answer2}}">Answer 2</button>
                <button type="submit" className="btn btn-lg hvr-grow large" name="answer" value="{{answer3}}">Answer 3</button>
                <button type="submit" className="btn btn-lg hvr-grow large" name="answer" value="{{answer4}}">Answer 4</button>
            </form>
            <button id="tryAgain" name="redo" className="btn btn-lg hvr-grow small">Try Again</button>
            <button id="nextQuestion" name="continueButton" className="btn btn-lg hvr-grow small">Continue</button>
            <h3>Coreect or incorrect</h3>
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