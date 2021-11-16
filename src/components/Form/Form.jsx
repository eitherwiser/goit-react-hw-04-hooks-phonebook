import { useState } from "react";
import PropTypes from "prop-types";
import { v4 as uuid } from 'uuid';
import s from "./Form.module.css";

export default function ContactForm({onLocalStorageChange}) {

  const [name, setName] = useState('')
  const [number, setNumber] = useState('')

  const handleOnChange = (e) => {
    const { type, value } = e.target;
    switch(type) {
      case 'text':
        setName(value);
        break;
      case 'tel':
        setNumber(value);
        break;
      default:
        break;
    }
  };

  const onSubmit = (e) => {
    const arr = JSON.parse(window.localStorage.getItem('contacts')) || [];
    if (arr.some(contact => contact.uName === name)) {
      alert(`${name} is already in your phonebook.`)
      return;
    } else if (arr.some(contact => contact.uNumber === number)) {
      alert(`Person with number ${number} is already in your phonebook.`)
      return;
    }
    window.localStorage.setItem('contacts', JSON.stringify(arr.concat([{ id: uuid(), uName: name, uNumber: number }])));
    setName('');
    setNumber('');
    e.preventDefault();
    onLocalStorageChange();
  };


      return (
      <div>
          <form onSubmit={onSubmit} className={s.form}>
          <label className={s.label}>
            Name &nbsp;&nbsp;&nbsp;
            <input
              className={s.input}
              type="text"
              onChange={handleOnChange}
              value={name}
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
              required
            />
            </label>
    
          <label className={s.label}>
            Number &nbsp;
            <input
              className={s.input}
              type="tel"
              onChange={handleOnChange}
              name="number"
              value={number}
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
              required
            />
            </label>

            <button className={s.btn} type="onSubmit">
              Add contact
            </button>
          </form>
      </div>
      
    );

}


ContactForm.propTypes = {
  onLocalStorageChange: PropTypes.func.isRequired,
};