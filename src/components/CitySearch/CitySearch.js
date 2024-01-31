

// const CitySearch = ({ }) => {

//     return (
//         <Box sx={{ '& > :not(style)': { m: 1 } }} className="citySearch">
//             <FormControl variant="standard">
//                 <TextField
//                 id="input-with-icon-textfield"
//                 label="Search by city"
//                 InputProps={{
//                     startAdornment: (
//                     <InputAdornment position="start">
//                         <PlaceIcon />
//                     </InputAdornment>
//                     ),
//                 }}
//                 variant="standard"
//                 />
//             </FormControl>
//       </Box>
//     );
// };
import { useState } from 'react';
import { useFetchCity } from '../../helpers/useFetchCity';
import './CitySearch.scss'; 
import {Box, Paper, InputAdornment} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

const CitySearch = ({handleSearch}) => {
  const [city, setCity] = useState("");
  const [input, setInput] = useState("");
  const { autocompleteCities, coordinates } = useFetchCity(input);
  const [autocompleteErr, setAutocompleteErr] = useState("");

  const handleCityInputChange = (e, value) => {
    if (value) {
      setInput(value);
    }

    // !autocompleteCities.includes(e.target.value) &&
    //   res.features &&
    //   setAutocompleteCities(res.features.map((place) => place.place_name));
    // res.error ? setAutocompleteErr(res.error) : setAutocompleteErr("");
  };

  const handleSelectCity = (e, value) => {
    if (value) {
      setInput(value);
      setCity(value);
      handleSearch(value, coordinates[value])
    }
  }


  return (
        <Box className="citySearch-container">
          <Box className="citySearch-icon">
            <SearchIcon 
            sx={{
              color: 'white'
            }}
            />
          </Box>
                <Autocomplete
                    startDecorator={<SearchIcon />}
                    freeSolo
                    id="city"
                    options={autocompleteCities}
                    value={city}
                    onChange={handleSelectCity}
                    
                    onInputChange={handleCityInputChange}
                    sx={{
                      width: '300px',
                      "& .MuiAutocomplete-root .MuiAutocomplete-inputRoot": {
                        fontSize: "14px",
                        color: "white",
                        fontWeight: 500,
                        '& .MuiAutocomplete-option': {
                          color:'red',
                        }
                      },
                    }}
                    PaperComponent={({ children }) => (
                      <Paper style={{ 
                        background: "rgba(255, 255, 255, 0.3)",
                        borderRadius: '10px',
                        color: 'white',
                        overflow: 'hidden'
                       }}>{children}</Paper>
                    )}
                    variant="plain"
                    popupIcon={<SearchIcon />}
                    renderInput={(params) => 
                    <TextField
                        {...params}
                        label="Search..."
                        className="cityInput"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '30px',
                            backgroundColor: 'transparent',
                            color: 'white',
                            '& fieldset': {
                              borderColor: 'transparent',
                            },
                            '&:hover fieldset': {
                              borderColor: 'transparent',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: 'transparent',
                            },
                        },
                        "& .MuiFormLabel-root": {
                          color: "white" // or black
                        },
                      }                     }
                    />}
                />
      </Box>
  );
};

export default CitySearch;