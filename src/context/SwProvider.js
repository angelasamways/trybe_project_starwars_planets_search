import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import SwContext from './SwContext';
import SwAPI from '../services/SwAPI';

function SwProvider({ children }) {
  const [getFetch, setGetFetch] = useState([]);
  const [filterByName, setFilterByName] = useState({ name: '' });
  const [allPlanets, setAllPlanets] = useState([]);
  const [filterByNumber, setFilterByNumber] = useState([]);
  const [filterValues, setFilterValues] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });
  const [columns, setColumns] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  const fetch = async () => {
    const getData = await SwAPI();
    setGetFetch(getData);
  };
  useEffect(() => {
    fetch();
  }, []);

  const data = useMemo(() => ({
    getFetch,
    filterByName,
    allPlanets,
    filterByNumber,
    filterValues,
    columns,
    setGetFetch,
    setFilterByName,
    setAllPlanets,
    setFilterByNumber,
    setFilterValues,
    setColumns,
  }), [getFetch, filterByName, allPlanets, filterByNumber, filterValues, columns]);

  return (
    <SwContext.Provider value={ data }>
      { children }
    </SwContext.Provider>
  );
}
SwProvider.propTypes = {
  children: PropTypes.arrayOf({}),
}.isRequired;

export default SwProvider;
