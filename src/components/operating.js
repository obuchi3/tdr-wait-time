import React, { Component } from 'react';
import { ListGroup, Badge } from 'react-bootstrap';

export class Operating extends Component {
  render = () => (
    <ListGroup variant="flush">
      {this.props.selectedPark.waitTimes
        .filter(row => row['active'])
        .sort((a, b) => {
          if (this.props.isAscSort) {
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
}
