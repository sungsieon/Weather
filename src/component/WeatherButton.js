import React from 'react'
import {useState,useEffect} from 'react'
import { Button } from 'react-bootstrap';

const WeatherButton = ({cities,setCity,handleCityChange}) => {
    console.log(cities);
    


  return (
    <div className="btnBox">
        <Button variant="warning" onClick={() => handleCityChange("current")}>Current Location</Button>{' '}
        
        {cities.map((item,index) => (
            <Button variant="warning" 
            key={index}
            onClick={() => setCity(item)} 
            className="Btn"
            >{item}
            </Button>
        ))}
    </div>
  )
}

export default WeatherButton