import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Testa a tela de configurações', () => {
  it('Testa se o título aparece', () => {
    renderWithRouterAndRedux(<App />, '', "/settings")
    const title = screen.getByTestId('settings-title');
    expect(title).toBeInTheDocument();
  });
});
