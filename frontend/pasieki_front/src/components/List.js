import './styling/List.css';
import React, { useEffect, useState } from "react"
import {API_URL} from '../index.js'

function List() {
  const [listOfApiaries, setListOfApiaries] = useState([])
  const [dateRange, setDateRange] = useState({from: '', to: ''})
  const [sort, setSort] = useState("default");


  useEffect(() => {
    fetch(API_URL+"/list", {
      method: 'POST',
      body: JSON.stringify({ dateRange }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res =>res.json())
      .then(data=>{
        setListOfApiaries(data);
        setSort("default")
      })
  }, [dateRange])

  const sortTable = (s) => {
    setSort(s)
    if (s === "name")
    {
      setListOfApiaries(listOfApiaries.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      }))
    }
    else if (s === "date")
    {
      setListOfApiaries(listOfApiaries.sort((a, b) => {
        if (a.date < b.date) return -1;
        if (a.date > b.date) return 1;
        return 0;
      }))
    }
  }

  return (
    <div className="List">
      <div className='search'>
        <label>Od:</label>
        <input 
          type="date" 
          className='filter'
          value={dateRange.from}
          onChange= {(e) => {
            setDateRange(prevState => ({
                ...prevState,
                from: e.target.value
              }))
          }}
        />
        <label>Do:</label>
        <input 
          type="date" 
          className='filter'
          value={dateRange.to}
          onChange= {(e) => {
            setDateRange(prevState => ({
                ...prevState,
                to: e.target.value
              }))
          }}
        />
        <select 
          value={sort}
          onChange={(e) => {
              sortTable(e.target.value);
          }}>
          <option value="default"disabled hidden>Sortuj po</option>
          <option value="name">Nazwa</option>
          <option value="date">Data</option>
        </select>
      </div>
      {
        listOfApiaries.length!==0 &&      //ukrywa tabel?? je??li nie ma pasiek
        <table className="styled-table">
          <thead>
              <tr>
                  <th>Nazwa</th>
                  <th>Data dodania</th>
                  <th>Numer</th>
              </tr>
          </thead>
          <tbody>
          {listOfApiaries.map((item, i) => (
                      <tr key={i}>
                          <td>{item.name}</td>
                          <td>{item.date}</td>
                          <td>{item.number}</td>
                      </tr>
                  ))}
          </tbody>
        </table>
      }
      {
        listOfApiaries.length===0 &&
        <h1>Nie znaleziono wynik??w</h1>
      }
    </div>
  );
}

export default List;