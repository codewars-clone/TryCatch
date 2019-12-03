import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Dashbar extends Component {
  render() {
    return (
      <footer className="footer">
        <div>
          <Link to="/try">
            <i className="fas fa-users"></i>
            <h4>TRY</h4>
          </Link>
        </div>
        <div>
          <Link to="/await">
            <i className="fas fa-pause"></i>
            <h4>AWAIT</h4>
          </Link>
        </div>
        <div>
          <Link to="/catch">
            <i className="far fa-comment"></i>
            <h4>CATCH</h4>
          </Link>
        </div>
        <div>
          <Link to="/settings">
            <i className="fas fa-cogs"></i>
            <h4>SETTINGS</h4>
          </Link>
        </div>
      </footer>
    );
  }
}

