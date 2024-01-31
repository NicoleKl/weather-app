import './DailyForecast.scss';
import WeatherIcon from '../WeatherIcon/WeatherIcon';
import React, { useEffect, useState } from 'react';

const DailyForecast = ({data, units}) => {

    return (
        <div className='dailyWeather'>
           {data.map((dailyWeather) => {
                return (
                    <div className='dayWeather'>
                        <div className='dayWeather-day'>
                            <p className='dayWeather__date'>{dailyWeather.date}</p>
                            <p className='dayWeather__weekDay'>{dailyWeather.weekDay}</p>
                        </div>
                        <div className='dayWeather-weather'>
                            <div className='dayWeather-temp'>
                                <p className='dayWeather-temp__highTemp'>{dailyWeather.highTemp}° {units === 'metric' ? 'C' : 'F'}</p>
                                <p className='dayWeather-temp__lowTemp'>{dailyWeather.lowTemp}° {units === 'metric' ? 'C' : 'F'}</p>
                            </div>
                            <WeatherIcon weather={dailyWeather.mainCond}/>
                        </div>
                        {/* <p>{dailyWeather.mainCond}</p> */}
                  </div>
                )
            })}
        </div>
    );
};

export default DailyForecast;