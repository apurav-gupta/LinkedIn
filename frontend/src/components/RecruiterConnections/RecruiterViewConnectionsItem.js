import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Messages from "./Messages";


class RecruiterViewConnectionsItem extends Component {

  render() {
    const { ownerhome } = this.props;

    return (
      
      <div className="card card-body bg-light mb-3">

        <Messages membername={ownerhome.acceptedFrom}/>
    
    </div>
      
    );
  }
}

RecruiterViewConnectionsItem.propTypes = {
  ownerhome: PropTypes.object.isRequired
};

export default RecruiterViewConnectionsItem;
