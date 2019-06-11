import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import {
  Navbar,
  Nav,
  Accordion,
  Button,
  ListGroup,
  Badge
} from 'react-bootstrap';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

library.add(faChevronUp, faChevronDown);

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tdl: [],
      tds: [],
      selectedPark: 'tdl',
      isAscSort: true,
      lastUpdate: new Date().toString()
    };
  }

  getUrl = park =>
    park === 'tds'
      ? 'https://tdr-wait-time.tk/tds.json'
      : 'https://tdr-wait-time.tk/tdl.json';

  getWaitTime = async park => (await axios.get(this.getUrl(park))).data;

  setWaitTime = async () => {
    this.setState({
      tdl: await this.getWaitTime('tdl'),
      tds: await this.getWaitTime('tds')
    });
    const updateDate = new Date(this.state.tdl[0]['lastUpdate']);
    this.setState({
      lastUpdate: `${updateDate.toLocaleDateString()} ${updateDate.toLocaleTimeString()}`
    });
  };

  setSort = () => {
    this.setState({
      isAscSort: !this.state.isAscSort
    });
  };

  componentDidMount = async () => {
    await this.setWaitTime();
  };

  getSelectedParkWaitTimes = () => {
    const selectedPark = this.state.selectedPark;
    return selectedPark === 'tds' ? this.state.tds : this.state.tdl;
  };

  showWaitTime = () => (
    <ListGroup variant="flush">
      {this.getSelectedParkWaitTimes()
        .filter(row => row['active'])
        .sort((a, b) => {
          if (this.state.isAscSort) {
            if (a['waitTime'] < b['waitTime']) return -1;
            if (a['waitTime'] > b['waitTime']) return 1;
          } else {
            if (a['waitTime'] < b['waitTime']) return 1;
            if (a['waitTime'] > b['waitTime']) return -1;
          }
          return 0;
        })
        .map(row => (
          <a
            href={this.getAttractionUrl(row['facilityCode'])}
            target="_blank"
            rel="noopener noreferrer"
            className="attraction-list"
            key={row['id']}
          >
            <ListGroup.Item key={row['id']}>
              <span className="badge-wait-time">
                <Badge pill variant="primary">
                  {row['waitTime']}
                </Badge>
              </span>
              <span className="attraction-name">{row['name']}</span>
              <span className="badge-fast-pass">
                <Badge pill variant="info">
                  {row['fastPass'] ? 'FP' : ''}
                </Badge>
              </span>
            </ListGroup.Item>
          </a>
        ))}
    </ListGroup>
  );

  getClosedAttraction = () => (
    <ListGroup>
      {this.getSelectedParkWaitTimes()
        .filter(row => !row['active'])
        .map(row => (
          <a
            href={this.getAttractionUrl(row['facilityCode'])}
            target="_blank"
            rel="noopener noreferrer"
            className="attraction-list"
            key={row['id']}
          >
            <ListGroup.Item key={row['id']}>{row['name']}</ListGroup.Item>
          </a>
        ))}
    </ListGroup>
  );

  getAttractionUrl = facilityCode =>
    `https://www.tokyodisneyresort.jp/${
      this.state.selectedPark
    }/attraction/detail/${facilityCode}/`;

  render = () => (
    <div>
      <Navbar bg="primary" variant="dark" expand="lg" sticky="top">
        <Navbar.Brand>TDR Wait Times</Navbar.Brand>
        <Button onClick={() => this.setSort()}>
          <FontAwesomeIcon
            icon={this.state.isAscSort ? faChevronUp : faChevronDown}
          />
        </Button>
      </Navbar>
      <Nav fill variant="tabs" defaultActiveKey={this.state.selectedPark}>
        <Nav.Item>
          <Nav.Link
            eventKey="tdl"
            onSelect={e => this.setState({ selectedPark: e })}
          >
            東京ディズニーランド
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="tds"
            onSelect={e => this.setState({ selectedPark: e })}
          >
            東京ディズニーシー
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <this.showWaitTime />
      <Accordion
        defaultActiveKey="0"
        style={
          this.state.tdl.length === 0
            ? { display: 'none' }
            : { display: 'block' }
        }
      >
        <Accordion.Toggle as={Button} variant="link" eventKey="1">
          休止中のアトラクション
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="1">
          {this.getClosedAttraction()}
        </Accordion.Collapse>
        <div style={{ textAlign: 'right' }}>
          最終データ取得時刻：{this.state.lastUpdate}
        </div>
      </Accordion>
    </div>
  );
}
