import React from 'react';
import PropTypes from 'prop-types';
import LifeSign from './LifeSign';
  
import '../LifeSignList.css';

export default class LifeSignList extends React.Component {
  static propTypes = {
    lifeSigns: PropTypes.arrayOf(
      PropTypes.shape({
        bssid: PropTypes.string.isRequired,
        station: PropTypes.string.isRequired,
        pwr: PropTypes.number.isRequired,
        rate: PropTypes.string.isRequired,
        lost: PropTypes.string.isRequired,
        frames: PropTypes.string.isRequired,
        probe: PropTypes.string,
        lastSeen: PropTypes.number,  
      }),     
    ),
  }

  render() {
    const lifeSigns = this.props.lifeSigns
          .sort((a, b) => a.pwr - b.pwr) // sort by signal str
          .sort((a, b) => +a.hasOwnProperty('name')).reverse()
          .map((lifesign, index) => (
            <LifeSign key={lifesign.station} {...lifesign} />
        ));
    return (
      <ul className="LifeSignList">
        {lifeSigns}
      </ul>
    )
  }
}