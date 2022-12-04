import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import SwContext from './SwContext';
import SwAPI from '../services/SwAPI';

function SwProvider({ children }) {
  const [getFetch, setGetFetch] = useState([]);

  const fetch = async () => {
    const getData = await SwAPI();
    setGetFetch(getData);
  };
  useEffect(() => {
    fetch();
  }, []);

  const data = useMemo(() => ({
    getFetch,
    setGetFetch,
  }), [getFetch, setGetFetch]);

  return (
    <SwContext.Provider value={ data }>
      { children }
    </SwContext.Provider>
  );
}
SwProvider.propTypes = {
  children: PropTypes.shape({}),
}.isRequired;

export default SwProvider;
