import React, { useState } from 'react';
import {ToggleButton, ToggleButtonGroup} from '@mui/material';
import './UnitsToggle.scss';


const UnitsToggle = ({ defaultUnits, handleChangeUnits }) => {
    const [units, setUnits] = useState(defaultUnits);

    const handleChange = (e, newUnits) => {
      console.log(units, newUnits)
      if(newUnits !== null) {
        setUnits(newUnits);
        handleChangeUnits(newUnits);
      }
    };

    return (
      <ToggleButtonGroup
        value={units}
        exclusive
        onChange={handleChange}
        className='unitsToggle'
      >
        <ToggleButton className='toggleBtn' value="metric" aria-label="metric">C°</ToggleButton>
        <ToggleButton className='toggleBtn' value="imperial" aria-label="imperial">F°</ToggleButton>
      </ToggleButtonGroup>
    );
};

export default UnitsToggle;