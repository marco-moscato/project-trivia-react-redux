import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { tQuestions } from '../services/api';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      response: [1, 2],
    };
  }

  async componentDidMount() {
    const token = localStorage.getItem('token');
    const api = await tQuestions(token);
    this.setState({
      response: api,
    });
  }

  render() {
    const { response } = this.state;
    return (
      <>
        <Header />
        <div>Game</div>
        <div>
          { response
            .map(({ category, question }, index) => (
              <div key={ index }>
                <p data-testid="question-category">{category}</p>
                <p data-testid="question-text">{question}</p>
              </div>
            ))}
        </div>
      </>
    );
  }
}

export default connect()(Game);
