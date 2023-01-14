import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

const initialState = {
  player: {
    name: 'Player Name',
    gravatarEmail: 'player@email.com',
    score: 0,
    assertions: 0,
  }
}

describe('Testa a tela de feedback', () => {
  it('Testa se o botão para jogar denovo aparece na tela', () => {
    renderWithRouterAndRedux(<App />, initialState, "/feedback");
    const playAgainButton = screen.getByTestId('btn-play-again');
    expect(playAgainButton).toBeInTheDocument();
  });

  it('Testa se a mensagem aparece na tela', () => {
    renderWithRouterAndRedux(<App />, initialState, "/feedback");
    const feedbackText = screen.getByTestId('feedback-text');
    expect(feedbackText).toBeInTheDocument();
  });
});
