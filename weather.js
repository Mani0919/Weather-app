import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './weather.css';

function Weather() {
  const [store, setStore] = useState('');
  const [res, setRes] = useState('');

  const changeHandler = (e) => {
    setStore(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${store}&appid=d885aa1d783fd13a55050afeef620fcb`)
      .then((response) => response.json())
      .then((data) => {
        const kelvin = data.main.temp;
        const celsius = kelvin - 273.15;
        setRes("Tempature is "+celsius.toFixed(2)+"°C"); 
        setStore("")
      }).catch((error) => {
        setRes('Error fetching data');
      });
  };

  return (
    <>
      <center>
        <div className='card'>
          <div className='card-body'>
            <h5 className='card-title'>Weather</h5>
            <form onSubmit={submitHandler}>
              <input type='text' onChange={changeHandler} value={store} /> &nbsp;
              <input type='submit' />
            </form>
            <h5>{res}</h5>
          </div>
        </div>
      </center>
    </>
  );
}

export default Weather;
