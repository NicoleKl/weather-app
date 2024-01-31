async function getCityByCoord (coord) {
    const long = (Math.round(coord[1] * 100) / 100).toFixed(2);
    const lat = (Math.round(coord[0] * 100) / 100).toFixed(2); 

    const ApiKey = 'pk.eyJ1IjoidmVyb25pa2FrbCIsImEiOiJjbHFkMHcxemswOGNjMmtwbHJvdjVqdjU2In0.pkUvhxBMUyMlOM84X0cU6A';
    const city = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${lat},${long}.json?access_token=${ApiKey}`
          )
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                return data;
            })
            .catch(error => {
                console.log('There was a problem with the fetch operation:', error);
            });

    return city;
}

export default getCityByCoord