import React, { Component } from 'react';
class SingleAwait extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      active: ''
    }
    this.handleModal = this.handleModal.bind(this)
    this.removeModal = this.removeModal.bind(this)
  }

  handleModal(){
    this.setState({
      active: 'is-active'
    })
  }

  removeModal(){
    this.setState({
      active: ''
    })
  }

  render() {
    const { name, imageUrl, userId, message } = this.props.prospect
    const { createChat, prospect } = this.props
    const { active } = this.state
    return (
      <div className="box">
        <div className="media">
          <div className="media-content">
            <figure className="image is-64x64">
              <img  src={imageUrl} alt="profile"/>
            </figure>
          </div>
          <div className="media-right">
            <div onClick={()=> {createChat(prospect)}}>
                <div onClick={() => this.props.sendLike(userId)}>
                <h4 className="title is-4" >
                  {name} 
                    <button className='button is-small is-success'> 
                      <i className="far fa-heart"></i> 
                    </button>
                </h4>
                </div>
            </div>
          </div>
        </div>
        <br/>
        {message ? 
          (<div className='wrapper'>
            <button className="button is-link" onClick={()=> {this.handleModal()}}>See Code</button>
          <div className={`modal ${active}`}>
            <div className="modal-background"></div>
            <div className="modal-card">
              <header className="modal-card-head">
                <h2 className="modal-card-title ">Coding Challenge</h2>
                <button className="delete" aria-label="close"></button>
              </header>
              <section className="modal-card-body">
              <pre>{message}</pre>
              </section>
              <footer className="modal-card-foot">
                <button className="button is-danger" onClick={()=> {this.removeModal()}}>Back</button>
              </footer>
            </div>
          </div>
          <div class="media-right" onClick={() => this.props.unLike(userId)}>
                <div className="buttons">
                  <button className="button is-small is-danger">
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
          </div>
        ): 
        (<div className='wrapper'>
          <div></div>
          <div class="media-right" onClick={() => this.props.unLike(userId)}>
                <div className="buttons">
                  <button className="button is-small is-danger">
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
          </div>)}
      </div>
    );
  }
}

export default SingleAwait;
