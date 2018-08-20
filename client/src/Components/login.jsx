import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import "../index.css";

class Login extends Component {
  render() {
    return (
      <div>
        <div className="container">
          <div className="card text-center">
            <div className="card-body">
              <h1>Welcome to chiSLANGo</h1>
              <h3>
                A language learning game where you get to ignore the grammar and
                focus on what really matters: <br />
                the slang
              </h3>
              <Link to="/login" className="githubButton btn">Login with Github</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
