import React, { Component } from 'react';
//import { connect } from 'react-redux'
import axios from 'axios';
//display photo, name, age... description later
//how to randomize which user is displayed, based on preferences
export class Try extends Component {
  constructor(){
    super();
    this.state = {
      user: {}
    };
  };
  async componentDidMount(){
    const response = await axios.get(`/server/user/${id}`);
    const user = response.data;
    this.setState({user});
  }
  render() {
    return (
      <div>
        <img src ={this.state.user.imageUrl} />
        <h4>{this.state.user.name}</h4>
        <h4>{this.state.user.age}</h4>
      </div>
    )
  }
}

// const mapStateToProps = (state) => ({

// })

// const mapDispatchToProps = {

// }

// export default connect(mapStateToProps, mapDispatchToProps)(Try)


