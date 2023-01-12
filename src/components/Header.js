import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
  state = {
    picture: '',
  };

  fetchItem = async (email) => {
    const toHash = md5(email).toString();
    const endpoint = `https://www.gravatar.com/avatar/${toHash}`;
    const response = await fetch(endpoint);
    const data = await response.json();
    this.setState({ picture: data });
  };

  render() {
    const { name, score, picture } = this.props;
    const { picture } = this.state;
    return (
      <div>
        <img data-testid="header-profile-picture" src={ picture } alt="imagem" />
        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">{ score }</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
  gravatarEmail: state.player.gravatarEmail,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  picture: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
