import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { tQuestions } from '../services/api';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      response: [1, 2],
      questionIndex: 0,
    };
  }

  async componentDidMount() {
    const token = localStorage.getItem('token');
    const api = await tQuestions(token);
    this.setState({
      response: api,
    });
  }

  handleNext = () => {
    const { questionIndex } = this.state;
    this.setState({
      questionIndex: questionIndex + 1,
    });
  };

  render() {
    const { response, questionIndex } = this.state;
    return (
      <>
        <Header />
        <div>Game</div>
        <div>
          {/* { response
            .map(({ category, question }, index) => (
              <div key={ index }>
                <p data-testid="question-category">{category}</p>
                <p data-testid="question-text">{question}</p>
              </div>
            ))} */}
          <h2 data-testid="question-category">{response[questionIndex].category}</h2>
          <h2 data-testid="question-text">{response[questionIndex].question}</h2>
          <button
            type="button"
            onClick={ this.handleNext }
          >
            Next
          </button>
          { console.log(response[0]) }
        </div>
      </>
    );
  }
}

export default connect()(Game);
