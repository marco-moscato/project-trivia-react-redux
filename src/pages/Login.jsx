import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { player } from '../redux/actions';
import { apiTrivia } from '../services/api';

class Login extends Component {
  state = {
    email: '',
    name: '',
    block: true,
  };

  validateForm = () => {
    const { email, name } = this.state;
    const total = 1;
    const validateEmail = /[^@ \n]+@[^@ \n]+\.[^@ \n]/;

    if (validateEmail.test(email) && name.length >= total) {
      this.setState({ block: false });
    } else {
      this.setState({ block: true });
    }
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.validateForm());
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { email, name } = this.state;
    const { dispatch, history } = this.props;
    const tokenApi = await apiTrivia();
    dispatch(player(email, name));
    localStorage.setItem('token', tokenApi);
    history.push('/game');
  };

  settingsScreen = (event) => {
    event.preventDefault();
    const { history } = this.props;
    history.push('/settings');
  };

  // onClickBtnPlay = async (event) => {
  //   event.preventDefault();

  //   const { history } = this.props;
  //   const tokenApi = await apiTrivia();

  //   localStorage.setItem('token', tokenApi);
  //   history.push('/game');
  // };

  render() {
    const { name, email, block } = this.state;
    return (
      <div>
        <form onSubmit={ this.handleSubmit }>
          <input
            data-testid="input-player-name"
            type="text"
            name="name"
            value={ name }
            onChange={ this.handleChange }
          />
          <input
            data-testid="input-gravatar-email"
            type="email"
            name="email"
            value={ email }
            onChange={ this.handleChange }
          />
          <button
            data-testid="btn-play"
            type="submit"
            disabled={ block }
            // onClick={ this.onClickBtnPlay }
          >
            Play
          </button>
        </form>
        <button
          data-testid="btn-settings"
          type="submit"
          onClick={ this.settingsScreen }
        >
          Configurações
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  dispatch: PropTypes.func,
}.isRequired;

export default connect()(Login);
