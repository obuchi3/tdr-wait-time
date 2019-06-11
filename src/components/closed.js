import React, { Component } from 'react';
import { Accordion, ListGroup, Button } from 'react-bootstrap';
import { Footer } from './footer';

export class Closed extends Component {
  getClosedAttraction = () => (
    <ListGroup>
      {this.props.selectedPark.waitTimes
        .filter(row => !row['active'])
        .map(row => (
          <a
            href={this.props.selectedPark.park.getAttractionUrl(
              row['facilityCode']
            )}
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

  render = () => (
    <Accordion
      defaultActiveKey="0"
      style={
        this.props.selectedPark.waitTimes.length === 0
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
      <Footer lastUpdate={this.props.lastUpdate} />
    </Accordion>
  );
}
