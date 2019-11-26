import React, { Component } from 'react';
import { SingleCatch } from '../../index'
class AllCatch extends Component {

  render() { 
    return (  
      <section className="section">
        <div className="container">
          <h1 className="title is-1">Catch</h1>
          <hr/>
          <SingleCatch />
        </div>
      </section>

    );
  }
}

export default AllCatch;