import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

const CORRECT_ANSWER = 'correct-answer';
const NEXT_BUTTON = 'btn-next';
const emailEx = 'fulano@gmail.com';

describe('Testa a tela de jogo', () => {
  it('Testa se o usuário volta para tela de login com um token inválido', async () => {
    const { history } = renderWithRouterAndRedux(<App />, '', "/game");
    localStorage.setItem('token', 'inválido');
    await waitFor(() => expect(history.location.pathname).toBe('/'));
  });

  it('Testa se o usuário volta para tela de feedback ao responder 5 perguntas', async () => {
    const { history } = renderWithRouterAndRedux(<App />)
    const email = screen.getByTestId('input-gravatar-email');
    const namePlayer = screen.getByTestId('input-player-name');
    const buttonPlay = screen.getByRole('button', { name: /play/i })

    userEvent.type(namePlayer, 'teste');
    expect(buttonPlay).not.toBeEnabled();

    userEvent.type(email, emailEx);
    expect(buttonPlay).toBeEnabled();
    userEvent.click(buttonPlay);
    await waitFor(() => expect(history.location.pathname).toBe('/game'));
    localStorage.setItem('token', '4de3eccf89c72fc8d951565a09858c6c46c21e55016e31108e58dfa74cc07a42');
    
    const answer = await screen.findByTestId(CORRECT_ANSWER);

    userEvent.click(answer);

    const button = await screen.findByTestId(NEXT_BUTTON);

    userEvent.click(button);

    const answer2 = await screen.findByTestId(CORRECT_ANSWER);

    userEvent.click(answer2);

    const button2 = await screen.findByTestId(NEXT_BUTTON);

    userEvent.click(button2);

    const answer3 = await screen.findByTestId(CORRECT_ANSWER);

    userEvent.click(answer3);

    const button3 = await screen.findByTestId(NEXT_BUTTON);

    userEvent.click(button3);

    const answer4 = await screen.findByTestId(CORRECT_ANSWER);

    userEvent.click(answer4);

    const button4 = await screen.findByTestId(NEXT_BUTTON);

    userEvent.click(button4);

    const answer5 = await screen.findByTestId(CORRECT_ANSWER);

    userEvent.click(answer5);

    const button5 = await screen.findByTestId(NEXT_BUTTON);

    userEvent.click(button5);




    await waitFor(() => expect(history.location.pathname).toBe('/feedback'));
  });
});
