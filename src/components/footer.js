import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(faTwitter, faGithub);

export class Footer extends Component {
  render = () => (
    <div style={{ textAlign: 'center' }}>
      LastUpdate：{this.props.lastUpdate}
      <span style={{ marginLeft: '10px' }}>
        <a
          href="https://twitter.com/_obuchi3"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faTwitter} />
        </a>
      </span>
      <span style={{ marginLeft: '10px' }}>
        <a
          href="https://github.com/obuchi3/tdr-wait-time"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#333' }}
        >
          <FontAwesomeIcon icon={faGithub} />
        </a>
      </span>
    </div>
  );
}
