import './App.css';
import { useFetchCurrentWeather } from './helpers/useFetchCurrentWeather';
import { useFetchForecast } from './helpers/useFetchForecast';
import { useFetchCityByCoord } from './helpers/useFetchCityByCoord';
import Background from './components/Background/Background';
import CurrentWeather from './components/CurrentWeather/CurrentWeather';
import UnitsToggle from './components/Units/UnitsToggle';
import NextHoursForecast from './components/NextHoursForecast/NextHoursForecast';
import DailyForecast from './components/DailyForecast/DailyForecast';
import CitySearch from './components/CitySearch/CitySearch'
import GetLocationButton from './components/GetLocationButton/GetLocationButton';
import { Box } from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';


import { useEffect, useState } from 'react';

function App() {
  const [city, setCity] = useState('Vancouver, British Columbia, Canada');
  const [cityCoord, setCityCoord] = useState(['-123.12', '49.28']);
  const [units, setUnits] = useState('metric');
  const [yourCity, setYourCity] = useState();
  const [yourLocation, setYourLocation] = useState(['0','0']);
  const { currentWeather, loadingCurrentWeather, errorCurrentWeather } = useFetchCurrentWeather(cityCoord, units);
  const { hourlyForecast, dailyForecast, loadingForecast, errorForecast } = useFetchForecast(cityCoord, units);
  const [x, setX] = useState(0);
  const [y, setY] = useState(1);

  const onChangeUnits = (units) => {
    setUnits(units);
  }
  
  const handleCityChange = (newCity, coordinates) => {
    setCity(newCity);
    setCityCoord(coordinates);
  }
  
  const setGeo = (lat, long) => {
    setYourCity()
    setCityCoord([long, lat])
    setX(lat);
    setY(long)
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setYourLocation([(Math.round(position.coords.longitude * 100) / 100).toFixed(2), (Math.round(position.coords.latitude * 100) / 100).toFixed(2)]);
    });  
  }, [])

  return (
    <div className="App">
      {loadingCurrentWeather || loadingForecast ? <p>loading</p> : (
        <Background weatherType={currentWeather?.weather[0]?.main} currentTime={2} sunsetTime={5}>
          <Box className="leftActionBox">
            <CitySearch handleSearch={handleCityChange} />
            <GetLocationButton updateOnClick={handleCityChange} coord={yourLocation}/>
          </Box>
          <Box className="rightActionBox">
            <UnitsToggle defaultUnits={units} handleChangeUnits={onChangeUnits}/>
          </Box>
          <Box className="mainContent">
            <Box>
              <CurrentWeather 
                city={city} 
                mainWeather={currentWeather?.weather[0]?.main} 
                details={currentWeather?.weather[0]?.description} 
                temperature={currentWeather?.main?.temp}
                units={units}
              />
              <NextHoursForecast data={hourlyForecast} />
            </Box>
            <DailyForecast data={dailyForecast.slice(1)} units={units}/>
          </Box>
        </Background>
      )}
    </div>
  );
}

export default App;
