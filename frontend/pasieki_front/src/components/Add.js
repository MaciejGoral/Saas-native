import './styling/Add.css';
import React, { useState } from "react";

function Add() {
    const [state, setState] = useState({name:'',date:'',number:''});
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState('');
  
  const submit = e => {
    setSuccess(false);
    setMessage('');
    e.preventDefault()
    fetch('http://localhost:3000', {
      method: 'POST',
      body: JSON.stringify({ state }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res =>res.json())
      .then(res=>{
        setSuccess(res.success);
        setMessage(res.message)
      })
  }

  return (
    <div className="Add">
      <form onSubmit={submit}>
        <label>Nazwa pasieki</label>
        <input 
          required
          maxLength={30}
          name="name"  
          placeholder="Nazwa" 
          value={state.name}
          onChange= {(e) => {
            setState(prevState => ({
                ...prevState,
                name: e.target.value
              }));
          }}
        />
        <label>Data dodania</label> 
        <input 
          required
          type="date" 
          min='1899-01-01' 
          max='2100-12-12'
          value={state.date}        //w prawdziwej aplikacji data byłaby ustawiana na dzisiejszą datę, ale w ramach testów jest wpisywana przez uzytkownika
          onChange= {(e) => {
            setState(prevState => ({
              ...prevState,
              date: e.target.value
            }));
          }}
          />
        <label>Numer (opcjonalnie)</label>
        <input 
          type="number" 
          placeholder='00000' 
          min="1"
          max="99999"
          value={state.number}
          onChange= {(e) => {
            e.target.value.length<=5 && setState(prevState => ({ //ograniczenie długości numeru, maxLength nie działa dla pola typu number
              ...prevState,
              number: e.target.value
            }));
          }}
          />
        <input 
          type="submit" 
          className="submitButton" 
          value="Dodaj"
        />
        {success && <div className="successMessage">{message}</div>}
        {!success && message!=='' && <div className="errorMessage">{message}</div>}
      </form>
    </div>
  );
}

export default Add;