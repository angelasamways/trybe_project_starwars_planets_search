import mock from '../mock/testData';

// const URL = 'https://swapi.dev/api/planets';

const SwAPI = async () => {
  // const request = await fetch(URL);
  // const response = await mockFetch.json();
  // const dado = response.results;
  // const withoutResidents = dado.filter((item) => delete item.residents);
  console.log(mock.results);
  return mock.results;
};

export default SwAPI;
