import React from 'react';
import PropTypes from 'prop-types';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import '../LifeSign.css';

const EMPTY_BAR_TICK = <i className="BarTick EmptyBarTick"></i>;
const FULL_BAR_TICK = <i className="BarTick FullBarTick"></i>;

export default class LifeSign extends React.Component {
  static propTypes = {
    bssid: PropTypes.string.isRequired,
    station: PropTypes.string.isRequired,
    pwr: PropTypes.string.isRequired,
    rate: PropTypes.string.isRequired,
    lost: PropTypes.string.isRequired,
    frames: PropTypes.string.isRequired,
    probe: PropTypes.string,
    lastSeen: PropTypes.string, 
    name: PropTypes.string,
  }

  static signalStrengthIndicator(dBm) {
    // let's assume dBm is anywhere from -100 to -30,
    // with -30 being the "strongest" with a full bar
    // with 10 steps, each step represents a -7 chg
    const adjustedDBm = +dBm + 100;
    // full strength = 70, min strength = 0
    let strength = Math.floor(adjustedDBm / 7);
    if (strength > 70) { strength = 70; }
    if (strength < 0) { strength = 0; }

    let barArray = [];
    for (let i = 0; i < strength; i++) {
      barArray.push(FULL_BAR_TICK);
    }
    for (let i = 0; i < 10 - strength; i++) {
      barArray.push(EMPTY_BAR_TICK);
    }
    
    return barArray;
  }

  render() {
    let identifier = null;
    if (this.props.name) {
      identifier =
        <div>
          <h5 className="LifeSign__name LifeSign__name--known">{this.props.name}</h5>
          <span className="LifeSign__subname">{this.props.station}</span>
        </div>
    } else {
      identifier = 
        <div>
          <h5 className="LifeSign__name LifeSign__name--known">{this.props.station}</h5>
          <span className="LifeSign__subname">Unknown User</span>
        </div>
    }

    const signalStrengthBar = LifeSign.signalStrengthIndicator(this.props.pwr);

    return (
      <CSSTransitionGroup transitionName="ListItemTransition" transitionAppearTimeout={700} transitionLeaveTimeout={250} transitionAppear={true} transitionEnter={false}>
      <li className="LifeSign">  
        <div>
          {identifier}
          <div className="LifeSign__signalStrength">
            <span className="signalStrength__info">{this.props.pwr}<span>dBm</span></span>
            <span className="signalStrength__bar">{signalStrengthBar}</span>            
          </div>
          <div className="LifeSign__lastSeen LifeSign__subname">
            Last Seen: {this.props.lastSeenString}
          </div>
        </div>
      </li>
      </CSSTransitionGroup>
    );
  }
}