import React from 'react';
import '../RightSidebar.css';

export default class RightSidebar extends React.Component {
  render() {
    return (
      <div className="RightSidebar">
        <div className="RightSidebar__Module LifeformsDetected">
          <h3>Lifeforms Detected</h3>
          <span>{this.props.lifeSigns.length}</span>
        </div>
        {this.props.children}
      </div>
      )
  }
}