import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import LifeSignList from './components/LifeSignList';
import LifeSignMap from './components/LifeSignMap';

class App extends Component {
  constructor(props) {
    super(props);

    let exampleData = [
      {
        bssid: '4A:5D:4C:EA:64:52',
        station: 'B4:99:BA:0A:87:DE',
        pwr: '-30',
        rate: '0 - 1',
        lost: '1',
        frames: '2',
        probe: '',
        lastSeen: 1508823732088,
      },
      {
        bssid: 'BC:14:01:F2:F6:28',
        station: '18:5E:0F:F2:EB:76',
        pwr: '-55',
        rate: '0 - 2e',
        lost: '0',
        frames: '1',
        probe: '',
        lastSeen: 1508823742378,
      },
      {
        bssid: 'BC:14:01:F2:F6:28',
        station: '18:B4:30:2A:24:42',
        pwr: '-90',
        rate: '0 - 2',
        lost: '0',
        frames: '1',
        probe:'',
        lastSeen: 1508823751861,
        name:'Richard',
      },
      {
        bssid: 'BC:14:01:F2:F6:28',
        station: '18:B4:30:2A:24:33',
        pwr: '-100',
        rate: '0 - 2',
        lost: '0',
        frames: '1',
        probe:'',
        lastSeen: 1508823751861,
        name:'Woah',
      },
    ];
    
    // wew
    for (let lifeSign in exampleData) {
      let minutesAgo = Math.floor((new Date().getTime() - new Date(exampleData[lifeSign].lastSeen)) / 1000 / 60);
      if (minutesAgo > 60) {
        let hoursAgo = Math.floor(minutesAgo / 60);
        exampleData[lifeSign].lastSeen = `${hoursAgo} hour${hoursAgo !== 1 ? 's' : ''} ago`;
      } else if (minutesAgo < 5) {
        exampleData[lifeSign].lastSeen = 'Active Now';
      } else {
        exampleData[lifeSign].lastSeen = `${minutesAgo} minutes ago`;
      }
    }

    this.state = {
      lifeSigns: exampleData,
    }
  }

  toggleState() {
    
    const exampleData = [
      {
        bssid: '4A:5D:4C:EA:64:52',
        station: 'B4:99:BA:0A:87:DE',
        pwr: '-48',
        rate: '0 - 1',
        lost: '1',
        frames: '2',
        probe: '',
        lastSeen: 1508823993088,
      },
      {
        bssid: 'BC:14:01:F2:F6:28',
        station: '18:5E:0F:F2:EB:76',
        pwr: '-33',
        rate: '0 - 2e',
        lost: '0',
        frames: '1',
        probe: '',
        lastSeen: 1508823992378,
      },
      {
        bssid: 'BC:14:01:F2:F6:28',
        station: '18:B4:30:2A:24:42',
        pwr: '-78',
        rate: '0 - 2',
        lost: '0',
        frames: '1',
        probe:'',
        lastSeen: 1508823751861,
        name:'Richard',
      },
      {
        bssid: 'BC:14:01:F2:F6:23',
        station: '18:B4:30:2A:21:38',
        pwr: '-30',
        rate: '0 - 2',
        lost: '0',
        frames: '1',
        probe:'',
        lastSeen: 1508899751861,
        name:'Aaah!!!',
      },
    ];
    for (let lifeSign in exampleData) {
      let minutesAgo = Math.floor((new Date().getTime() - new Date(exampleData[lifeSign].lastSeen)) / 1000 / 60);
      if (minutesAgo > 60) {
        let hoursAgo = Math.floor(minutesAgo / 60);
        exampleData[lifeSign].lastSeen = `${hoursAgo} hour${hoursAgo !== 1 ? 's' : ''} ago`;
      } else if (minutesAgo < 5) {
        exampleData[lifeSign].lastSeen = 'Active Now';
      } else {
        exampleData[lifeSign].lastSeen = `${minutesAgo} minutes ago`;
      }
    }

    this.setState({
      lifeSigns: exampleData, 
    });
  }

  render() {
    return (
      <div className="Container">
        <div className="LifeSignListContainer">
          <LifeSignList
            lifeSigns={this.state.lifeSigns} 
          />
        </div>
        <div className="LifeSignMapContainer">
          <LifeSignMap 
            lifeSigns={this.state.lifeSigns}
            />
        </div>
        <div className="RightSidebar">
          <div className="Button" style={{color: '#fff'}} onClick={() => this.toggleState()}>Hello</div>
        </div>
      </div>
    );
  }
}

export default App;
