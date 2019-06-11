import React, { Component } from 'react';
import { Navbar, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(faChevronUp, faChevronDown);

export class Header extends Component {
  render = () => (
    <Navbar bg="primary" variant="dark" expand="lg" sticky="top">
      <Navbar.Brand>TDR Wait Times</Navbar.Brand>
      <Button onClick={() => this.props.setSort()}>
        <FontAwesomeIcon
          icon={this.props.isAscSort ? faChevronUp : faChevronDown}
        />
      </Button>
    </Navbar>
  );
}
