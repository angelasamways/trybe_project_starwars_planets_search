import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import SwContext from './SwContext';
import SwAPI from '../services/SwAPI';

function SwProvider({ children }) {
  const [getFetch, setGetFetch] = useState([]);
  const [filterByName, setFilterByName] = useState({ name: '' });
  const [allPlanets, setAllPlanets] = useState([]);
  const [filterByNumber, setFilterByNumber] = useState([]);

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
    setGetFetch,
    setFilterByName,
    setAllPlanets,
    setFilterByNumber,
  }), [getFetch, filterByName, allPlanets, filterByNumber]);

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
