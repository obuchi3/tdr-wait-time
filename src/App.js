import React, { Component } from 'react';
import './App.css';

import { Park } from './components/park';
import { Header } from './components/header';
import { Navigator } from './components/navigator';
import { Operating } from './components/operating';
import { Closed } from './components/closed';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tdl: {
        park: new Park('tdl'),
        waitTimes: []
      },
      tds: {
        park: new Park('tds'),
        waitTimes: []
      },
      selectedPark: 'tdl',
      isAscSort: true,
      lastUpdate: new Date().toString()
    };
  }

  setWaitTimes = async () => {
    const tdlWaitTimes = await this.state.tdl.park.getWaitTimes();
    const tdsWaitTimes = await this.state.tds.park.getWaitTimes();
    const updateDate = new Date(tdlWaitTimes[0]['lastUpdate']);

    this.setState({
      tdl: { park: this.state.tdl.park, waitTimes: tdlWaitTimes },
      tds: { park: this.state.tds.park, waitTimes: tdsWaitTimes },
      lastUpdate: `${updateDate.toLocaleDateString()} ${updateDate.toLocaleTimeString()}`
    });
  };

  setSort = () => {
    this.setState({
      isAscSort: !this.state.isAscSort
    });
  };

  getSelectedPark = () =>
    this.state.selectedPark === 'tds' ? this.state.tds : this.state.tdl;

  setSelectedPark = e => {
    this.setState({ selectedPark: e });
  };

  componentDidMount = async () => {
    await this.setWaitTimes();
  };

  render = () => (
    <div>
      <Header isAscSort={this.state.isAscSort} setSort={() => this.setSort()} />
      <Navigator
        selectedPark={this.state.selectedPark}
        setSelectedPark={e => this.setSelectedPark(e)}
      />
      <Operating
        selectedPark={this.getSelectedPark()}
        isAscSort={this.state.isAscSort}
      />
      <Closed
        selectedPark={this.getSelectedPark()}
        lastUpdate={this.state.lastUpdate}
      />
    </div>
  );
}
