import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getChatsThunk } from '../../store/reducers/chat';

class Dashbar extends Component {
  render() {
    let likes = this.props.chats.length;
    //let likes = 0;
    console.log('My props ===>', this.props);
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
            <div className="icon-wrapper">
              <i className="fas fa-pause"></i>
              <h4>AWAIT</h4>
              <span className="badge">10</span>
            </div>
          </Link>
        </div>
        <div>
          {likes ? (
            <Link to="/catch">
              <div className="icon-wrapper">
                <i className="far fa-comment"></i>
                <h4>CATCH</h4>
                <span className="badge">{likes}</span>
              </div>
            </Link>
          ) : (
            <Link to="/catch">
              <div>
                <i className="far fa-comment"></i>
                <h4>CATCH</h4>
              </div>
            </Link>
          )}
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

const mapStateToProps = state => {
  return {
    chats: state.chat.chats,
    user: state.firebase.profile,
    auth: state.firebase.auth,
    likes: state.likes.likes,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getChatsThunk: () => {
      dispatch(getChatsThunk());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashbar);
