import './NextHoursForecast.scss';
import WeatherIcon from '../WeatherIcon/WeatherIcon';
import React, { useState } from 'react';


const NextHoursForecast = ({data}) => {
    return (
        <div className='nextHourWeather'>
           {data.map((nextHour, index) => {
            return (
                <div key={index} className='hourlyWeather'>
                    <p>{nextHour.hour}</p>
                    <WeatherIcon weather={nextHour.weatherCond}/>
                    <p>{nextHour.desc}</p>
                    <p>{nextHour.temp}°</p>
                </div>
            )
           })}
        </div>
    );
};

export default NextHoursForecast;