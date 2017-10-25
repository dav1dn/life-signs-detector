import React from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'react-dimensions';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import '../LifeSignMap.css';

class LifeSignMap extends React.Component {
  static makeSectors(size) {
    let sectors2dArray = [];
    for (let i = 0; i < size / 100; i++) {
      let sectorsRow = [];
      for (let j = 0; j < size / 100; j++) {
        sectorsRow.push(<LifeSignMapSector key={`${i}${j}`} top={i*100} left={j*100} />);
      }
      sectors2dArray.push(sectorsRow)
    }
    return sectors2dArray;
  }

  static generateDotLocation(power, size) {
    const strength = +power + 100;
    const magnitude = strength * -1 / 70 + 1;
    const radius = size / 2 * (magnitude);
    const angle = Math.floor(Math.random() * 360) * Math.PI / 180;
    const x = radius * Math.cos(angle) + size / 2;
    const y = radius * Math.sin(angle) + size / 2;   
    return [x, y];
  }

  static makeDots(clients, size) {
    let dotsArray = [];
    for (let client in clients) {
      client = clients[client];  // how do i iterate over the objs themselves?? lazy
      const [x, y] = LifeSignMap.generateDotLocation(client.pwr, size);
      const name = client.name || client.station;
      let position = '';
      if (y > size - 30) { position += '--upper'; }
      else { position += '--lower'; }
      if (x < size / 2) { position += ' --right'; }
      else { position += ' --left' };

      dotsArray.push(<LifeSignMapDot key={client.station} top={y} left={x} name={name} position={position}/>);
    }

    return dotsArray;
  }
  render() {
    let size = Math.min(this.props.containerHeight, this.props.containerWidth);
    size = size - (size % 100); // rounds to nearest 100 (was gonna be 50 but meh)

    const sectors = LifeSignMap.makeSectors(size);
    const dots = LifeSignMap.makeDots(this.props.lifeSigns, size);

    return (
      <div className="LifeSignMap" style={{width: size, height: size}}>
        {sectors}
        {dots}
      </div>
    )
  }
}

export default Dimensions()(LifeSignMap);

class LifeSignMapSector extends React.Component {
  constructor(props) {
    super(props);
    this.state = { // in state if we want to change it later
      animation: LifeSignMapSector.randomAnimation(),
    };
  }

  static randomAnimation() {
    const duration = Math.floor(Math.random() * 1000) + 500;
    const delay = Math.floor(Math.random() * 10000);
    const easings = [
      'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      'ease',
      'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      'cubic-bezier(0.6, -0.28, 0.735, 0.045)',
      'cubic-bezier(0.86, 0, 0.07, 1)'
    ];

    const randomEasing = easings[Math.floor(Math.random()*easings.length)];

    return `${duration}ms ${randomEasing} ${delay}ms infinite normal none running gridPulse`;
  }

  render() {
    const styles = {
      display: 'block',
      width: '100px',
      height: '100px',
      position: 'absolute',
      top: this.props.top,
      left: this.props.left,
      animation: this.state.animation,
    }

    return (
      <div className="LifeSignMapSector" style={styles}>
      </div>
    )
  }
}

class LifeSignMapDot extends React.Component {
  render() {
    const styles = {
      // you'll never be able to center this, give up
      top: this.props.top - 5,
      left: this.props.left - 5,
    }

    return (
      <CSSTransitionGroup transitionName="DotTransition" transitionAppearTimeout={2500} transitionLeaveTimeout={250} transitionAppear={true} transitionEnter={false}>
      <i className="LifeSignMapDot" style={styles}>
        <div className={`LifeSignMapDot__label ${this.props.position}`}>{this.props.name}</div>
      </i>
      </CSSTransitionGroup>
    )
  }
}