// import mock from '../mock/testData';

const URL = 'https://swapi.dev/api/planets';

const SwAPI = async () => {
  const request = await fetch(URL);
  const response = await request.json();
  const dado = response.results;
  const withoutResidents = dado.filter((item) => delete item.residents);
  // console.log(mock.results);
  return withoutResidents;
};

export default SwAPI;
