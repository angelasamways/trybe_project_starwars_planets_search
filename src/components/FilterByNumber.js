import React, { useContext, useEffect, useState } from 'react';
import SwContext from '../context/SwContext';

const COLUMNS = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

export default function FilterByNumber() {
  const {
    filterByNumber,
    setFilterByNumber,
  } = useContext(SwContext);

  const [columns, setColumns] = useState(COLUMNS);
  const [filterValues, setFilterValues] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  useEffect(() => {
    const filtered = COLUMNS
      .filter((value) => !filterByNumber.some(({ column }) => column === value));
    setColumns(filtered);
    setFilterValues(({ comparison }) => ({
      column: filtered[0],
      comparison,
      value: 0,
    }));
  }, [filterByNumber]);

  const onInputNumberChange = ({ target: { name, value } }) => {
    setFilterValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const setFilter = () => {
    setFilterByNumber((prev) => [
      ...prev,
      filterValues,
    ]);
  };

  const { column, comparison, value } = filterValues;

  return (
    <form>
      <label htmlFor="column-filter">
        Coluna
        <select
          name="column"
          id="column-filter"
          data-testid="column-filter"
          value={ column }
          onChange={ onInputNumberChange }
        >
          {
            columns.map((item) => (<option key={ item } value={ item }>{ item }</option>))
          }
        </select>
      </label>
      <label htmlFor="comparison-filter">
        Operador
        <select
          name="comparison"
          id="comparison-filter"
          data-testid="comparison-filter"
          value={ comparison }
          onChange={ onInputNumberChange }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>
      <label htmlFor="value-filter">
        <input
          type="number"
          name="value"
          id="value-filter"
          data-testid="value-filter"
          value={ value }
          onInput={ onInputNumberChange }
        />
      </label>
      <button
        data-testid="button-filter"
        type="button"
        onClick={ setFilter }
      >
        Filtrar
      </button>
    </form>
  );
}
