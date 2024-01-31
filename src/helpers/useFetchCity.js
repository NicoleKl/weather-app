import { useState, useEffect } from "react";

export function useFetchCity (text) {
    const ApiKey = 'pk.eyJ1IjoidmVyb25pa2FrbCIsImEiOiJjbHFkMHcxemswOGNjMmtwbHJvdjVqdjU2In0.pkUvhxBMUyMlOM84X0cU6A';

    const [autocompleteCities, setAutocompleteCities] = useState([]);
    const [coordinates, setCoordinates] = useState({});


    useEffect(() => {
        fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${text}.json?access_token=${ApiKey}&cachebuster=1625641871908&autocomplete=true&types=place`
          )
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setAutocompleteCities(data.features.map((place) => place.place_name));
                
                data.features.map((place) => {
                    setCoordinates((prev) => ({...prev, [place.place_name]: place.geometry.coordinates}))
                });
            })
            .catch(error => {
                console.log('There was a problem with the fetch operation:', error);
            });
    }, [text]);

    return { autocompleteCities, coordinates };
}

export default useFetchCity;