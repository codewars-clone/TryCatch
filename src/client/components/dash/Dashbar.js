import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getChatsThunk } from '../../store/reducers/chat';

class Dashbar extends Component {
  render() {

    let likes = this.props.chats.length;
    return (
      <footer>
        <div>
          <Link to="/try">
            <i className="fas fa-users fa-2x" ></i>
          </Link>
        </div>
        <div>
          <Link to="/await">
            <div className="icon-wrapper">
              <i class="fas fa-heart fa-2x"></i>
              <span className="badge">10</span>
            </div>
          </Link>
        </div>
        <div>
          {likes ? (
            <Link to="/catch">
              <div className="icon-wrapper">
                <i className="far fa-comment fa-2x"></i>
                <span className="badge">{likes}</span>
              </div>
            </Link>
          ) : (
            <Link to="/catch">
              <div>
                <i className="far fa-comment fa-2x"></i>
              </div>
            </Link>
          )}
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
