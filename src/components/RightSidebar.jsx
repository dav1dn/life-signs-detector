import React from 'react';
import '../RightSidebar.css';

export default class RightSidebar extends React.Component {
  render() {
    const namedList = this.props.lifeSigns
      .filter((element) => element.hasOwnProperty('name'))
      .map((element) => <div>{element.name}</div>)
      .sort((a, b) => a.name > b.name);

    return (
      <div className="RightSidebar">
        <div className="RightSidebar__Module LifeformsDetected">
          <h3>Lifeforms Detected</h3>
          <span>{this.props.lifeSigns.length}</span>
        </div>
        <div className="RightSidebar__Module NamedList">
          {namedList}
        </div>
        {this.props.children}
      </div>
      )
  }
}