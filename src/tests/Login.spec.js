import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Testa a tela de login', () => {
  it('Testa se o campo de input para email aparece na tela', () => {
    renderWithRouterAndRedux(<App />);
    const email = screen.getByTestId('input-gravatar-email');
    expect(email).toBeInTheDocument();
  });
});