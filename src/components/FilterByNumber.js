import React, { useContext } from 'react';
import SwContext from '../context/SwContext';

export default function FilterByNumber() {
  const {
    filterValues,
    setFilterValues,
    // filterByNumber,
    setFilterByNumber,
    columns,
    // setColumns,
  } = useContext(SwContext);

  // useEffect(() => {
  //   const filtered = columns
  //     .filter((value) => !filterByNumber.some(({ column }) => column === value));
  //   setColumns(filtered);
  //   setFilterValues(({ comparison }) => ({
  //     column: filtered[0],
  //     comparison,
  //     value: 0,
  //   }));
  // }, [columns, filterByNumber, setColumns, setFilterValues]);

  const onInputChange = ({ target: { name, value } }) => {
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
          onChange={ onInputChange }
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
          onChange={ onInputChange }
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
          onInput={ onInputChange }
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
