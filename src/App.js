import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import LifeSignList from './components/LifeSignList';
import LifeSignMap from './components/LifeSignMap';
import RightSidebar from './components/RightSidebar';

const URL = '';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lifeSigns: null,
    }
  }

  componentDidMount() {
    this.fetchData().then((res) => {
      this.setState({
        lifeSigns: this.processData(res),
      });
    });
  }

  toggleState() {
    
    const exampleData = [
      {
        bssid: '4A:5D:4C:EA:64:52',
        station: 'B4:99:BA:0A:87:DE',
        pwr: '-400',
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
        pwr: '0',
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
      if (exampleData[lifeSign].pwr < -100) { exampleData[lifeSign].pwr = -100; }
      if (exampleData[lifeSign].pwr > -30) { exampleData[lifeSign].pwr = -30; } 
    }

    this.setState({
      lifeSigns: exampleData, 
    });
  }

  fetchData() {
    // fetch(URL)
    //   .then(res => res.json());
    return new Promise((res, rej) => {
      res({"status":200,"clients":{"B4:99:BA:0A:87:DE":{"bssid":"4A:5D:4C:EA:64:52","station":"B4:99:BA:0A:87:DE","pwr":"-81","rate":"0 - 1","lost":"1","frames":"2","probe":"","lastSeen":1508823732088},"18:5E:0F:F2:EB:76":{"bssid":"BC:14:01:F2:F6:28","station":"18:5E:0F:F2:EB:76","pwr":"-67","rate":"0 - 2e","lost":"0","frames":"1","probe":"","lastSeen":1508823742378},"18:B4:30:2A:24:42":{"bssid":"BC:14:01:F2:F6:28","station":"18:B4:30:2A:24:42","pwr":"-68","rate":"0 - 2","lost":"0","frames":"1","probe":"","lastSeen":new Date(), "name":"Richard"}}});
    })
  }

  processData(res) {
    let data = Object.keys(res.clients).map(key => res.clients[key]);    
    // wew
    for (let lifeSign in data) {
      let minutesAgo = Math.floor((new Date().getTime() - new Date(data[lifeSign].lastSeen)) / 1000 / 60);
      if (minutesAgo > 60) {
        let hoursAgo = Math.floor(minutesAgo / 60);
        data[lifeSign].lastSeen = `${hoursAgo} hour${hoursAgo !== 1 ? 's' : ''} ago`;
      } else if (minutesAgo < 5) {
        data[lifeSign].lastSeen = 'Active Now';
      } else {
        data[lifeSign].lastSeen = `${minutesAgo} minutes ago`;
      }

      if (data[lifeSign].pwr < -100) { data[lifeSign].pwr = -100; }
      if (data[lifeSign].pwr > -30) { data[lifeSign].pwr = -30; } 
    }

    return data;
  }


  render() {

    if (!this.state.lifeSigns) { return (<div>Loading...</div>); }
    else {
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
          <RightSidebar
              lifeSigns={this.state.lifeSigns}
              >          <div className="Button" style={{color: '#fff'}} onClick={() => this.toggleState()}>Hello</div>
</RightSidebar>
        </div>
      );
    }
  }
}

export default App;
