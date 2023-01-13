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
      isLoading: true,
    };
  }

  async componentDidMount() {
    const token = localStorage.getItem('token');
    const api = await tQuestions(token);
    this.setState({
      response: api,
      isLoading: false,
    });
  }

  handleNext = () => {
    const { questionIndex } = this.state;
    this.setState({
      questionIndex: questionIndex + 1,
    });
  };

  shuffle = (array) => {
    const random = 0.5;
    return array.sort(() => Math.random() - random);
  };

  render() {
    const { response, questionIndex, isLoading } = this.state;
    return (
      <>
        <Header />
        <div>Game</div>
        <div>
          {
            isLoading ? 'carregando'
              : (
                <>
                  <h2 data-testid="question-category">
                    {response[questionIndex].category}
                  </h2>
                  <h2 data-testid="question-text">{response[questionIndex].question}</h2>
                  {console.log(response[questionIndex].incorrect_answers)}
                  {this.shuffle(response[questionIndex].incorrect_answers)
                    .map((answer, index) => (
                      <button
                        type="button"
                        key={ index }
                      >
                        {answer}
                      </button>))}
                  <button type="button">{response[questionIndex].correct_answer}</button>
                  <button
                    type="button"
                    onClick={ this.handleNext }
                  >
                    Next
                  </button>
                </>
              )
          }

        </div>
      </>
    );
  }
}

export default connect()(Game);
