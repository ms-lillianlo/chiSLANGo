import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './index.css';

class EndGame extends Component {
    render() {
      return (
        <div>
            <div className="container">
    <div className="card text-center">
        <div className="card-body">
        <h1>End of Questions, great job!</h1>
            <h1>Final Score: Score</h1>
            <Link to='/about'><button type="button" className="btn hvr-grow large"><h4>Log Out</h4></button></Link>
        </div>
    </div>
</div>    
        </div>
      );
    }
  }
  
  export default EndGame;