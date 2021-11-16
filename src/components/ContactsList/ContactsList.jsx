import React from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import s from "./ContactsList.module.css";


export default function ContactsList({ filter, localStorageState, onLocalStorageChange  }) {
  
  const [contacts, setContacts] = useState([]);
  
  useEffect(() => {
    const arr = JSON.parse(window.localStorage.getItem('contacts')) ?? [];
    setContacts(arr.filter(contact => contact.uName.toLowerCase().includes(filter.toLowerCase()))); 
  }, [filter, localStorageState])
  

  const onDelete = (id) => {
    const arr = JSON.parse(window.localStorage.getItem('contacts')).filter(contact => contact.id !== id);
    window.localStorage.setItem('contacts', JSON.stringify(arr));
    onLocalStorageChange();
  };
  

  return (
    <ul className={s.list}>
      {contacts.length === 0 ? <h6>Contacts list is empty.</h6> : <h6>Contacts list:</h6>}
        {contacts.map(({id, uName, uNumber}) => (
          <li
            key={id}
            className={s.list_item}
          >

            <a href={"tel:"+{ uNumber }}>
              <span>{uName}&nbsp;:</span>
              <span>{uNumber}</span>
            </a>

            <button
              type="button"
              className={s.btn}
              onClick={() => onDelete(id)}
            >
              <span className="material-icons">delete</span>
            </button>
          </li>
        ))}
      </ul>
  );
}

ContactsList.propTypes = {
  filter: PropTypes.PropTypes.string.isRequired,
  localStorageState: PropTypes.bool.isRequired,
  onLocalStorageChange: PropTypes.func.isRequired,
};


