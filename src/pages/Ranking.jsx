import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  render() {
    const rankingArray = JSON.parse(localStorage.getItem('ranking')) || [];
    rankingArray.sort((a, b) => b.score - a.score);

    return (
      <>
        <h1 data-testid="ranking-title">Título</h1>
        <Link to="/">

          <button data-testid="btn-go-home" type="button">
            Go home
          </button>
        </Link>
        {rankingArray.map((player, index) => (
          <div key={ player.name }>
            <img src={ player.picture } alt={ player.name } />
            <p data-testid={ `player-name-${index}` }>{player.name}</p>
            <p data-testid={ `player-score-${index}` }>{player.score}</p>
          </div>
        ))}

      </>

    );
  }
}

export default Ranking;
