import React, { Component } from 'react';
import { connect } from 'react-redux'

//display photo, name, age... description later
export class Try extends Component {
  render() {
    return (
      <div>
        {}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Try)


