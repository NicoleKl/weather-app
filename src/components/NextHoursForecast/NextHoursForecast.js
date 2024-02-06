import './NextHoursForecast.scss';
import WeatherIcon from '../WeatherIcon/WeatherIcon';
import React, { useState } from 'react';


const NextHoursForecast = ({data}) => {
    return (
        <div className='nextHourWeather'>
           {data.map((nextHour, index) => {
            return (
                <div key={index} className='hourlyWeather'>
                    <div>
                    <p className='hourlyWeather__hour'>{nextHour.hour}</p>
                    <WeatherIcon weather={nextHour.weatherCond}/>
                    {/* <p>{nextHour.desc}</p> */}
                        </div>
                   
                    <p className='hourlyWeather__temp'>{nextHour.temp}°</p>
                </div>
            )
           })}
        </div>
    );
};

export default NextHoursForecast;