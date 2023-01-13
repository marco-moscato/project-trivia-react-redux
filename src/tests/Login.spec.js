import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';
import Login from '../pages/Login';
import App from '../App';
import Game from '../pages/Game';

const emailEx = 'fulano@gmail.com';

describe('Testa a tela de login', () => {
  it('Testa os campos que aparecem na tela', () => {
    renderWithRouterAndRedux(<Login />);
    const email = screen.getByTestId('input-gravatar-email');
    const namePlayer = screen.getByTestId('input-player-name');
    const buttonSettings = screen.getByRole('button', {  name: /configurações/i})
    const buttonPlay = screen.getByRole('button', { name: /play/i })

    expect(email).toBeInTheDocument();
    expect(namePlayer).toBeInTheDocument();
    expect(buttonSettings).toBeInTheDocument();
    expect(buttonPlay).toBeInTheDocument();
    expect(buttonPlay).not.toBeEnabled();
  });

  it('Testa se está na rota /', () => {
    const { history } = renderWithRouterAndRedux(<Login />);
    const buttonPlay = screen.getByRole('button', { name: /play/i })
    const { pathname } = history.location;
    expect(pathname).toBe('/');
    expect(buttonPlay).not.toBeEnabled();
  })

  it('Testa se o botão play está desabilitado', () => {
    renderWithRouterAndRedux(<Login />)
    const email = screen.getByTestId('input-gravatar-email');
    const namePlayer = screen.getByTestId('input-player-name');
    const buttonPlay = screen.getByRole('button', { name: /play/i })

    userEvent.type(namePlayer, 'teste');
    userEvent.type(email, emailEx);

    expect(email).toHaveValue('fulano@gmail.com')
    expect(buttonPlay).toBeEnabled();
  })

  it('Verifica se o botão configuração renderiza para /settings', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const buttonSettings = screen.getByRole('button', {  name: /configurações/i})

    expect(buttonSettings).toBeInTheDocument();

    userEvent.click(buttonSettings);
    const { pathname } = history.location;
    expect(pathname).toBe("/settings");
  });

  it('Testa se Game é renderizado', () => {
    const { history } = renderWithRouterAndRedux(<Login />)
    const email = screen.getByTestId('input-gravatar-email');
    const namePlayer = screen.getByTestId('input-player-name');
    const buttonPlay = screen.getByRole('button', { name: /play/i })

    userEvent.type(namePlayer, 'teste');
    expect(buttonPlay).not.toBeEnabled();

    userEvent.type(email, emailEx);
    expect(buttonPlay).toBeEnabled();
    userEvent.click(buttonPlay);

    const { pathname } = history.location;
    setTimeout(() => {
      expect(pathname).toBe("/game");
    }, 3000);
  });

  it('Verifica se Game é renderizado', () => {
    renderWithRouterAndRedux(<Game />);
    expect(screen.getByText('Game')).toBeInTheDocument();
    expect(screen.getByTestId('header-profile-picture')).toBeInTheDocument();
    expect(screen.getByTestId('header-score')).toBeInTheDocument();
  });

});
