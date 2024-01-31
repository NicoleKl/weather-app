import './WeatherIcon.css';
import React, { useState } from 'react';
import { WiDaySunny, WiCloudy, WiFog, WiNightClear, WiRain } from 'weather-icons-react';

const url = {
    Clear: 'weather/clear-day.svg',
    Thunderstorm: 'weather/thunderstorms.svg',
    Drizzle: 'weather/drizzle.svg',
    Rain: 'weather/rain.svg',
    Snow: 'weather/snow.svg',
    Clouds: 'weather/cloudy.svg',
    Atmosphere: 'weather/haze.svg',

}
const WeatherIcon = ({ weather, size }) => {
    const iconSize = size || 'm';
    const iconDimentions = {
        s: '40px',
        m: '60px',
        l: '80px',
        xl: '220px'
    }

    const project = () => {
        switch (weather) {

            case "Sunny": return <WiDaySunny size={54} color='#000' />;
            case "Rain": return <WiRain size={54} color='#000' />;
            case "Cloudy": return <WiCloudy size={54} color='#000' />;
            case "Clouds": return <WiCloudy size={54} color='#000' />;
            case "Fog": return <WiFog size={54} color='#000' />;
            case "Clear": return <WiNightClear size={54} color='#000' />;

            default: return <WiCloudy size={54} color='#000' />;
        }
    };

    return (
        <img src={url[weather]} width={iconDimentions[iconSize]} height={iconDimentions[iconSize]} alt=""/>
    );
};

export default WeatherIcon;