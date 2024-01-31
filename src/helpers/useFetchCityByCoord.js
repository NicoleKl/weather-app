import { useState, useEffect } from "react";

export function useFetchCityByCoord (coord) {
    const [long, lat] = coord;
    const ApiKey = 'pk.eyJ1IjoidmVyb25pa2FrbCIsImEiOiJjbHFkMHcxemswOGNjMmtwbHJvdjVqdjU2In0.pkUvhxBMUyMlOM84X0cU6A';
    const [city, setCity] = useState();


    useEffect(() => {
        fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${long},${lat}.json?access_token=${ApiKey}`
          )
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.log('There was a problem with the fetch operation:', error);
            });
    }, [coord]);

    return { city };
}

export default useFetchCityByCoord;