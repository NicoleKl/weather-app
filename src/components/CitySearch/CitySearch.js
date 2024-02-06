import { useState } from 'react';
import { useFetchCity } from '../../helpers/useFetchCity';
import { Autocomplete, Box, Paper, TextField} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import './CitySearch.scss'; 

const CitySearch = ({handleSearch}) => {
  const [city, setCity] = useState("");
  const [input, setInput] = useState("");
  const { autocompleteCities, coordinates } = useFetchCity(input);
  const [autocompleteErr, setAutocompleteErr] = useState("");

  const handleCityInputChange = (e, value) => {
    setInput(value);

    // !autocompleteCities.includes(e.target.value) &&
    //   res.features &&
    //   setAutocompleteCities(res.features.map((place) => place.place_name));
    // res.error ? setAutocompleteErr(res.error) : setAutocompleteErr("");
  };

  const handleSelectCity = (e, value) => {
    if (value) {
      setInput(value);
      setCity(value);
      handleSearch(value, coordinates[value]);
    }
  }

  return (
        <Box className="citySearch-container">
          <Box className="citySearch-icon">
            <SearchIcon />
          </Box>
                <Autocomplete
                    freeSolo
                    id="city"
                    options={autocompleteCities}
                    value={city}
                    onChange={handleSelectCity}
                    onInputChange={handleCityInputChange}
                    className='citySearch'
                    disableClearable
                    PaperComponent={({ children }) => (
                      <Paper style={{ 
                        background: "rgba(255, 255, 255, 0.3)",
                        borderRadius: '10px',
                        color: 'white',
                        overflow: 'hidden'
                       }}>{children}</Paper>
                    )}
                    variant="plain"
                    renderInput={(params) => 
                    <TextField
                        {...params}
                        label="Search..."
                        className="cityInput"
                    />}
                />
      </Box>
  );
};

export default CitySearch;