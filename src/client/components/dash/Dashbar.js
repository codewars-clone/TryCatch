import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Dashbar extends Component {
  render() {

    return (
      <footer>
        <div>
          <Link to="/try">
            <i className="fas fa-users fa-2x" ></i>
          </Link>
        </div>
        <div>
          <Link to="/await">
          <i class="fas fa-heart fa-2x"></i>
          </Link>
        </div>
        <div>
          <Link to="/catch">
            <i className="far fa-comment fa-2x"></i>
          </Link>
        </div>
        <div>
          <Link to="/settings">
            <i className="fas fa-cogs fa-2x"></i>
          </Link>
        </div>
      </footer>
    );
  }
}

