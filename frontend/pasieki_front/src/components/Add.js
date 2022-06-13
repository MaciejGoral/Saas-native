import './styling/Add.css';
import React, { useState } from "react";

function Add() {
    const [state, setState] = useState({name:'',date:'',number:''});
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState('');
  
  const submit = e => {
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
          value={state.name.toString()}
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
          name="date" 
          value={state.date}
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
          name="number" 
          min="1"
          value={state.number}
          onChange= {(e) => {
            e.target.value.length<=5 && setState(prevState => ({
              ...prevState,
              number: e.target.value
            }));
          }}
          />
        <input type="submit" className="submitButton" value="Dodaj"/>
        {success && <div className="successMessage">{message}</div>}
        {!success && message!=='' && <div className="errorMessage">{message}</div>}
      </form>
    </div>
  );
}

export default Add;
