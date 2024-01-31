import { useState } from 'react';
import './GetLocationButton.scss'; 
import { Box } from '@mui/material';
import NearMeIcon from '@mui/icons-material/NearMe';
import getCityByCoord from '../../helpers/getCityByCoord';


const GetLocationButton = ({updateOnClick, coord}) => {
  const [closestCity, setClosestCity] = useState();

  const handleClick = async () => {
    const cityData = await getCityByCoord(coord);
    const locationCity = cityData.features.find(f => f.place_type[0] === 'place');
    updateOnClick(locationCity.place_name, coord);
}

  return (
      <Box onClick={handleClick} className='getLocationBtn'>
          <NearMeIcon 
          sx={{
            color: 'rgba(255, 255, 255, 0.7)'
          }}
          />
      </Box>
  );
};

export default GetLocationButton;