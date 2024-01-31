import './Background.css';
import React, { useState } from 'react';


const Background = ({ weatherType, currentTime, sunsetTime, children }) => {
    const [timeOfTheDay, setTimeOfTheDay] = useState(currentTime < sunsetTime ? 'day' : 'night');
    const weatherColors = {
        'day': {
            "Clear": "#4bb6fb",//blue
            "Rain": '#658fcb',//blue-grey
            'Sunny': '#fbbc41',//yellow
            "Clouds": '#a3aecd'
        },
        'night': {
            "Cloudy": '#49578c',//
            "Clear": '#524ae2' 
        }
    }

    return (
        <div style={{ backgroundColor: "#a3aecd" //weatherColors[timeOfTheDay][weatherType]
     }} className='background'>
            {children}
        </div>
    );
}

export default Background;