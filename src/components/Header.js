import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  chave: valor,
});

class Header extends React.Component {
  render() {
    return (
      <div>
        <img data-testid="header-profile-picture" src="src" alt="imagem" />
        <p data-testid="header-player-name">Nome</p>
        <p data-testid="header-score">Score</p>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Header);
