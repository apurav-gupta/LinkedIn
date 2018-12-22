import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Messages from "./Messages";


class ViewConnectionsItem extends Component {

  render() {
    const { ownerhome } = this.props;

    return (
      
      <div className="card card-body bg-light mb-3">

        <Messages membername={ownerhome.acceptedFrom}/>
    
    </div>
      
    );
  }
}

ViewConnectionsItem.propTypes = {
  ownerhome: PropTypes.object.isRequired
};

export default ViewConnectionsItem;
