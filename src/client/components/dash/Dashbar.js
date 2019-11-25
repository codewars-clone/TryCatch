import React, { Component } from 'react';

export default class Dashbar extends Component {
  render() {
    return(
      <footer className="footer">
          <div>
            <i class="fas fa-users"></i> 
            <h4>TRY</h4>
          </div>
          <div>
            <i class="fas fa-pause"></i>
            <h4>AWAIT</h4>
          </div>
          <div>
            <i class="fas fa-equals"></i>
            <h4>CATCH</h4>
          </div>
          <div>
            <i class="fas fa-cogs"></i> 
            <h4>SETTINGS</h4>
          </div>
      </footer>
    )
  }
}