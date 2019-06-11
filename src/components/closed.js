import React, { Component } from 'react';
import { Accordion, ListGroup, Button, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { Footer } from './footer';

library.add(faBan);

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
            <ListGroup.Item key={row['id']}>
              <span className="badge-wait-time">
                <Badge pill variant="danger">
                  <FontAwesomeIcon icon={faBan} />
                </Badge>
              </span>
              <span className="attraction-name">{row['name']}</span>
            </ListGroup.Item>
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
