import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './index.css';
import axios from 'axios'

class EndGame extends Component {
    constructor() {
        super();
        this.state = {
            score: 0,
        }
    }
    componentDidMount() {
        axios.post('/indexRouter/continue').then(({ data }) => {
          this.setState(data)
          console.log(data)
        })
      }
    render() {
      return (
        <div>
            <div className="container">
                <div className="card text-center">
                <div className="card-body">
                    <h1>End of Questions, great job!</h1>
                    <h1>Final Score: {this.state.score}</h1>
                    <Link to='/'>
                    <button type="button" className="btn hvr-grow large">
                    <h4>Log Out</h4>
                    </button></Link>
                </div>
            </div>
            </div>
        </div>
      );
    }
  }

  export default EndGame;
