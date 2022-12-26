import React, { useContext, useEffect } from 'react';
import SwContext from '../context/SwContext';
import Filters from './Filters';

export default function Table() {
  const {
    getFetch,
    filterByName,
    setAllPlanets,
    allPlanets,
  } = useContext(SwContext);

  const headers = ['name', 'rotation_period', 'orbital_period', 'diameter',
    'climate', 'gravity', 'terrain', 'surface_water', 'population', 'films',
    'created', 'edited', 'url'];

  useEffect(() => {
    const { name: filteredName } = filterByName;
    setAllPlanets(getFetch
      .filter(({ name }) => (name.includes(filteredName) || !filteredName)));
  }, [filterByName, getFetch, setAllPlanets]);
  return (
    <div>
      <Filters />
      <table>
        <thead>
          <tr>
            { headers.map((header, index) => (
              <th key={ index }>{ header }</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {allPlanets.map((planet, index) => (
            <tr key={ index }>
              <td>{ planet.name }</td>
              <td>{ planet.rotation_period }</td>
              <td>{ planet.orbital_period }</td>
              <td>{ planet.diameter }</td>
              <td>{ planet.climate}</td>
              <td>{ planet.gravity }</td>
              <td>{ planet.terrain}</td>
              <td>{ planet.surface_water }</td>
              <td>{ planet.population }</td>
              <td>{ planet.films }</td>
              <td>{ planet.created }</td>
              <td>{ planet.edited }</td>
              <td>{ planet.url }</td>
            </tr>
          )) }
        </tbody>
      </table>
    </div>
  );
}
