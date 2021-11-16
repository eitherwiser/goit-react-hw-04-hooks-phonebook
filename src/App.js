import React from 'react';
import { useState } from 'react';
import ContactForm from './components/Form/Form.jsx';
import Filter from './components/Filter/Filter.jsx';
import ContactsList from './components/ContactsList/ContactsList.jsx';
import './App.css';

export default function App() {
  const [filter, setFilter] = useState('');
  const [localStorageState, setLocalStorageState] = useState(true);

  const onFilterChange = e => setFilter(e.currentTarget.value);

  const onLocalStorageChange = () => {
    setLocalStorageState(pre => !pre);
  };

  return (
    <>
      <h2>Phonebook</h2>

      <Filter filter={filter} onFilterChange={onFilterChange} />

      <ContactForm onLocalStorageChange={onLocalStorageChange} />

      <ContactsList
        filter={filter}
        localStorageState={localStorageState}
        onLocalStorageChange={onLocalStorageChange}
      />
    </>
  );
}
