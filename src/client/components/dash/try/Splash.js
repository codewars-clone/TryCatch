import React, { Component } from 'react';
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
            <h1 className="title is-1 ">CHAT NOW</h1> 
          </div>
        </div>
      </section>
    );
  }
}

export default Splash;