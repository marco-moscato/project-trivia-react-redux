import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

beforeEach(() => {
  localStorage.clear();

  const player = {
    name: 'Player',
    score: 10,
    picture: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
  };

  const player2 = {
    name: 'Player2',
    score: 5,
    picture: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
  };

  localStorage.setItem('ranking', JSON.stringify([player, player2]));
});

describe('Testa a tela de ranking', () => {
  it('Testa se o botão para jogar denovo aparece na tela', () => {
    renderWithRouterAndRedux(<App />, '', "/ranking");
    const goHomeButton = screen.getByTestId('btn-go-home');
    expect(goHomeButton).toBeInTheDocument();

    const player = screen.getByTestId('player-name');
    expect(player).toBeInTheDocument();
    const score = screen.getByTestId('player-score');
    expect(score).toBeInTheDocument();
  });

  it('Testa se o botão para jogar denovo aparece na tela sem ranking', () => {
    localStorage.clear();
    renderWithRouterAndRedux(<App />, '', "/ranking");
    const goHomeButton = screen.getByTestId('btn-go-home');
    expect(goHomeButton).toBeInTheDocument();
  });
 
});
