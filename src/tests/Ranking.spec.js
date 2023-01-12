import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Testa a tela de ranking', () => {
  it('Testa se o botão para jogar denovo aparece na tela', () => {
    renderWithRouterAndRedux(<App />, '', "/ranking");
    const goHomeButton = screen.getByTestId('btn-go-home');
    expect(goHomeButton).toBeInTheDocument();
  });
});
