import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';
import Login from '../pages/Login';
import App from '../App';
import Game from '../pages/Game';

const emailEx = 'fulano@gmail.com';

const tokenResponse = {
  "response_code":0,
  "response_message":"Token Generated Successfully!",
  "token":"f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6"
};


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

  it('Testa se o botão de play redireciona o usuário ao Game', () => {
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

  it('Testa se a requisição do token', () => {
    renderWithRouterAndRedux(<App />)

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(tokenResponse),
    });

    const email = screen.getByTestId('input-gravatar-email');
    const namePlayer = screen.getByTestId('input-player-name');
    const buttonPlay = screen.getByRole('button', { name: /play/i })

    userEvent.type(namePlayer, 'teste');
    userEvent.type(email, emailEx);
    userEvent.click(buttonPlay);

    waitFor(() => {
      expect(global.fetch).toBeCalled();
    });
  });

});
