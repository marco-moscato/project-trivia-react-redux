import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Game extends Component {
  render() {
    return (
      <>
        <Header />
        <div>Game</div>
      </>
    );
  }
}

export default connect()(Game);
