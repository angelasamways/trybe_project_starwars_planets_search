import React, { useContext } from 'react';
import SwContext from '../context/SwContext';
import FilterByNumber from './FilterByNumber';

export default function Filters() {
  const {
    setFilterByName,
    filterByName: { name },
  } = useContext(SwContext);

  const onInputNameChange = ({ target: { value } }) => {
    setFilterByName({ name: value });
  };
  return (
    <section>
      <div>
        <label htmlFor="name-filter">
          <input
            data-testid="name-filter"
            type="text"
            id="name-filter"
            name="name"
            value={ name }
            onInput={ onInputNameChange }
          />
        </label>
      </div>
      <FilterByNumber />
    </section>
  );
}
