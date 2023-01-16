import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { tQuestions } from '../services/api';
import Logo from '../trivia.png';
import { updateScore } from '../redux/actions';

class Game extends Component {
  state = {
    response: [1, 2],
    questionIndex: 0,
    isLoading: true,
    answered: false,
    timeout: false,
    assertions: 0,
    score: 0,
  };

  async componentDidMount() {
    const { history } = this.props;
    const token = localStorage.getItem('token');
    const api = await tQuestions(token);
    if (api.length === 0) {
      localStorage.removeItem('token');
      history.push('/');
    }
    this.setState({
      response: api,
      isLoading: false,
    });
  }

  startTimer = () => {
    const THIRTY_SECONDS = 30000;
    setTimeout(() => this.setState({
      timeout: true,
    }), THIRTY_SECONDS);
  };

  handleNext = () => {
    const { questionIndex } = this.state;
    const { history } = this.props;
    const questionNumber = 4;
    if (questionIndex === questionNumber) { history.push('/feedback'); } else {
      this.setState({
        questionIndex: questionIndex + 1,
        answered: false,
        timeout: false,
      });
    }
  };

  // Funcão para corrigir sinais gráficos como aspas e apóstrofos; Ref: https://tertiumnon.medium.com/js-how-to-decode-html-entities-8ea807a140e5

  decodeHTMLEntities = (text) => {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
  };

  scoreUpdate = () => {
    const { assertions, score } = this.state;
    const { dispatch } = this.props;
    dispatch(updateScore(assertions, score));
  };

  handleClick = ({ target: { value } }) => {
    const { response, questionIndex, assertions, score } = this.state;
    if (value === response[questionIndex].correct_answer) {
      this.setState({
        assertions: assertions + 1,
        score: score + 1,
      }, this.scoreUpdate);
    }
    this.setState({
      answered: true,
    });
  };

  shuffle = (array) => {
    const random = 0.5;
    return array.sort(() => Math.random() - random);
  };

  render() {
    const { response, questionIndex, isLoading, answered, timeout } = this.state;
    this.startTimer();
    return (
      <>
        <Header />
        <img src={ Logo } alt="logo" className="logo" />
        <div>
          {
            isLoading ? 'carregando'
              : (
                <>
                  <h2 data-testid="question-category">
                    {response[questionIndex].category}
                  </h2>
                  <h2 data-testid="question-text">
                    {this.decodeHTMLEntities(response[questionIndex].question)}
                  </h2>
                  <div data-testid="answer-options" className="answers">
                    {this.shuffle(response[questionIndex].incorrect_answers
                      .concat(response[questionIndex].correct_answer))
                      .map((answer, index) => (
                        <button
                          type="button"
                          key={ index }
                          value={ answer }
                          disabled={ timeout }
                          onClick={ this.handleClick }
                          style={ answered
                            ? { border: answer === response[questionIndex]
                              .correct_answer
                              ? '3px solid rgb(6, 240, 15)' : '3px solid red' }
                            : { border: '3px solid black' } }
                          data-testid={ answer === response[questionIndex].correct_answer
                            ? 'correct-answer' : `wrong-answer-${index}` }
                        >
                          {this.decodeHTMLEntities(answer)}
                        </button>))}

                  </div>

                </>
              )
          }
          { answered || timeout ? (
            <button
              type="button"
              data-testid="btn-next"
              onClick={ this.handleNext }
            >
              Next
            </button>) : ''}

        </div>
      </>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect()(Game);
