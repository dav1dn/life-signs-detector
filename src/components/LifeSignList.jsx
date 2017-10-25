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
        pwr: PropTypes.string.isRequired,
        rate: PropTypes.string.isRequired,
        lost: PropTypes.string.isRequired,
        frames: PropTypes.string.isRequired,
        probe: PropTypes.string,
        lastSeen: PropTypes.string,  
      }),     
    ),
  }

  render() {
    const lifeSigns = this.props.lifeSigns
          .sort((a, b) => b.pwr - a.pwr) // sort by signal str
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