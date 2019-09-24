import React, { Component } from 'react';

class Bill extends Component {
  constructor(){
    super()
    this.state = {}
  }

  render(){
    return(
      <div>
        {this.props.bill.name}
      </div>
    )
  }
}

export default Bill