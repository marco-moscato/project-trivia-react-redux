import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  render() {
    return (
      <Link to="/">
        <button data-testid="btn-go-home" type="button">
          Go home
        </button>
      </Link>
    );
  }
}

export default Ranking;
