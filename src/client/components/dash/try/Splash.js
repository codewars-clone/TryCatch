import React, { Component } from 'react';
import { NextButton } from '../../index'
import { Link } from 'react-router-dom'
class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return ( 
      <section className="section">
        <div className="container">
          <div className="box">
            <h1 className="title is-1">It's a Catch</h1> 
            <hr/>
            <Link to='/chat'>
              <h1 className="title is-1 ">CHAT NOW</h1> 
            </Link>
          </div>
          <Link to="/try">
            <NextButton />
          </Link>
        </div>
      </section>
    );
  }
}

export default Splash;