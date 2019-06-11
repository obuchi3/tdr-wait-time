import React, { Component } from 'react';
import { Nav } from 'react-bootstrap';

export class Navigator extends Component {
  render = () => (
    <Nav fill variant="tabs" defaultActiveKey={this.props.selectedPark}>
      <Nav.Item>
        <Nav.Link eventKey="tdl" onSelect={e => this.props.setSelectedPark(e)}>
          東京ディズニーランド
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="tds" onSelect={e => this.props.setSelectedPark(e)}>
          東京ディズニーシー
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}
