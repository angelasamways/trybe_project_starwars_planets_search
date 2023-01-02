import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import mockFetch from '../mock/fetch';

describe('Testa se existem campos de filtragem e uma tabela', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
    render(<App />);
  });

  afterEach(() => {
    global.fetch.mockClear();
  });

  test('1-Verifica se possui um input de texto para filtrar por nome', () => {
    expect(screen.getByTestId('name-filter')).toBeInTheDocument();
  })

  test('2-Verifica se filtra por nome', async () => {
    await waitFor(() => expect(screen.getByText(/^Endor$/i, { selector: 'td' })).toBeInTheDocument())
    const planet = screen.getByRole('cell', { name: /^Endor$/i });
    userEvent.type(screen.getByTestId('name-filter'), 'Naboo');
    expect(screen.getByRole('cell', { name: /^Naboo$/i })).toBeInTheDocument();
    expect(screen.getAllByRole('row')).toHaveLength(2);
    expect(planet).not.toBeInTheDocument();
  });

  test('3-Verifica se possui um input de numero para filtrar', () => {
    const col = screen.getByTestId('column-filter');
    const comp = screen.getByTestId('comparison-filter');
    expect(screen.getByTestId('value-filter')).toBeInTheDocument();
    expect(col).toBeInTheDocument();
    expect(col.options).toHaveLength(5);
    expect(comp).toBeInTheDocument();
    expect(comp.options).toHaveLength(3);
    expect(screen.getByTestId('button-filter')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Filtrar/i })).toBeInTheDocument();
  })

  test('4-Verifica todos os itens que compoem a tabela', () => {
    expect(screen.getByText(/^name$/i, { selector: 'th' })).toBeInTheDocument();
    expect(screen.getByText(/^rotation_period$/i, { selector: 'th' })).toBeInTheDocument();
    expect(screen.getByText(/^orbital_period$/i, { selector: 'th' })).toBeInTheDocument();
    expect(screen.getByText(/^diameter$/i, { selector: 'th' })).toBeInTheDocument();
    expect(screen.getByText(/^climate$/i, { selector: 'th' })).toBeInTheDocument();
    expect(screen.getByText(/^gravity$/i, { selector: 'th' })).toBeInTheDocument();
    expect(screen.getByText(/^terrain$/i, { selector: 'th' })).toBeInTheDocument();
    expect(screen.getByText(/^surface_water$/i, { selector: 'th' })).toBeInTheDocument();
    expect(screen.getByText(/^population$/i, { selector: 'th' })).toBeInTheDocument();
    expect(screen.getByText(/^films$/i, { selector: 'th' })).toBeInTheDocument();
    expect(screen.getByText(/^created$/i, { selector: 'th' })).toBeInTheDocument();
    expect(screen.getByText(/^edited$/i, { selector: 'th' })).toBeInTheDocument();
    expect(screen.getByText(/^URL$/i, { selector: 'th' })).toBeInTheDocument();
  })

  test('5-Verifica se todos os planetas são renderizados', async () => {
    expect(await screen.findByText(/^Tatooine$/i, { selector: 'td' })).toBeInTheDocument();
    expect(await screen.findByText(/^Alderaan$/i, { selector: 'td' })).toBeInTheDocument();
    expect(await screen.findByText(/^Yavin IV$/i, { selector: 'td' })).toBeInTheDocument();
    expect(await screen.findByText(/^Hoth$/i, { selector: 'td' })).toBeInTheDocument();
    expect(await screen.findByText(/^Dagobah$/i, { selector: 'td' })).toBeInTheDocument();
    expect(await screen.findByText(/^Bespin$/i, { selector: 'td' })).toBeInTheDocument();
    expect(await screen.findByText(/^Endor$/i, { selector: 'td' })).toBeInTheDocument();
    expect(await screen.findByText(/^Naboo$/i, { selector: 'td' })).toBeInTheDocument();
    expect(await screen.findByText(/^Coruscant$/i, { selector: 'td' })).toBeInTheDocument();
    expect(await screen.findByText(/^Kamino$/i, { selector: 'td' })).toBeInTheDocument();
  })

  test('6-Verifica o filtro de "maior que"', async () => {
    await waitFor(() => expect(screen.getByText(/^Endor$/i, { selector: 'td' })).toBeInTheDocument());
    const planet = screen.getByRole('cell', { name: /^Endor$/i });
    userEvent.selectOptions(screen.getByTestId('column-filter'), 'surface_water');
    userEvent.selectOptions(screen.getByTestId('comparison-filter'), 'maior que');
    userEvent.type(screen.getByTestId('value-filter'), '99');
    userEvent.click(screen.getByRole('button', { name: /Filtrar/i }));
    expect(screen.getByRole('cell', { name: /^Hoth$/i })).toBeInTheDocument();
    expect(planet).not.toBeInTheDocument();
  });

  test('7-Verifica o filtro de "menor que"', async () => {
    await waitFor(() => expect(screen.getByText(/^Endor$/i, { selector: 'td' })).toBeInTheDocument());
    const planet = screen.getByRole('cell', { name: /^Endor$/i });
    userEvent.selectOptions(screen.getByTestId('column-filter'), 'orbital_period');
    userEvent.selectOptions(screen.getByTestId('comparison-filter'), 'menor que');
    userEvent.type(screen.getByTestId('value-filter'), '312');
    userEvent.click(screen.getByRole('button', { name: /Filtrar/i }));
    expect(screen.getByRole('cell', { name: /^Tatooine$/i })).toBeInTheDocument();
    expect(planet).not.toBeInTheDocument();
  });

  test('8-Verifica o filtro de "igual a"', async () => {
    await waitFor(() => expect(screen.getByText(/^Hoth$/i, { selector: 'td' })).toBeInTheDocument());
    const planet = screen.getByRole('cell', { name: /^Hoth$/i });
    userEvent.selectOptions(screen.getByTestId('column-filter'), 'diameter');
    userEvent.selectOptions(screen.getByTestId('comparison-filter'), 'igual a');
    userEvent.type(screen.getByTestId('value-filter'), '4900');
    userEvent.click(screen.getByRole('button', { name: /Filtrar/i }));
    expect(screen.getByRole('cell', { name: /^Endor$/i })).toBeInTheDocument();
    expect(planet).not.toBeInTheDocument();
  });

  test('9-Verifica se, ao clicar no botão "Remover todas filtragens", remove as filtragens', async () => {
    await waitFor(() => expect(screen.getByText(/^Endor$/i, { selector: 'td' })).toBeInTheDocument());
    const planet = screen.getByRole('cell', { name: /^Endor$/i });
    userEvent.selectOptions(screen.getByTestId('column-filter'), 'rotation_period');
    userEvent.type(screen.getByTestId('value-filter'), '25');
    userEvent.click(screen.getByRole('button', { name: /Filtrar/i }));
    userEvent.selectOptions(screen.getByTestId('column-filter'), 'orbital_period');
    userEvent.selectOptions(screen.getByTestId('comparison-filter'), 'menor que');
    userEvent.type(screen.getByTestId('value-filter'), '350');
    userEvent.click(screen.getByRole('button', { name: /Filtrar/i }));
    expect(screen.getByRole('cell', { name: /^Naboo$/i })).toBeInTheDocument();
    expect(planet).not.toBeInTheDocument();
    userEvent.click(screen.getByRole('button', { name: /Remover todas filtragens/i }));
    expect(screen.getByRole('cell', { name: /^Kamino$/i })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: /^Naboo$/i })).toBeInTheDocument();
  });

});
