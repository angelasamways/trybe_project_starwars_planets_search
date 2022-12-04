import React from 'react';
import Table from './components/Table';
import SwProvider from './context/SwProvider';
import './App.css';

function App() {
  return (
    <SwProvider>
      <Table />
    </SwProvider>
  );
}

export default App;
