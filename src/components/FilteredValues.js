import React, { useContext } from 'react';
import propTypes from 'prop-types';
import { FiDelete } from 'react-icons/fi';
import SwContext from '../context/SwContext';

export default function FilteredValues({ filter: { column, comparison, value } }) {
  const { setFilterByNumber } = useContext(SwContext);

  const del = () => {
    setFilterByNumber((prev) => (
      prev.filter(({ column: item }) => item !== column)
    ));
  };

  return (
    <div data-testid="filter">
      <p>{`${column} ${comparison} ${value}`}</p>
      <button
        type="button"
        onClick={ del }
      >
        <FiDelete />
      </button>
    </div>
  );
}

FilteredValues.propTypes = {
  filter: propTypes.objectOf(propTypes.string),
}.isRequired;
