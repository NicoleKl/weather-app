export const getLocalDate = (unixDate) => {
    return new Date(unixDate * 1000);
}

const days = ['SUN','MON','TUE','WED','THU','FRI','SAT'];

export const getWeekDay = (date) => days[date.getDay()];

export const prepareHourlyData = (data) => {
    let hourlyData = data.map((data) => {
        return {
            hour: `${getLocalDate(data.dt).getHours().toString()}:00`,
            weatherCond: data.weather[0].main,
            desc: data.weather[0].description,
            temp: Math.round(data.main.temp)
        }
    })

    return hourlyData;
}

export const prepareDailyData = (data) => {
    const sortByDays = (hourlyData) => {
        let result = [];

        for(let i = 0; i < hourlyData.length - 1; i++) {
            let current = getLocalDate(hourlyData[i].dt);
            let next = getLocalDate(hourlyData[i+1].dt);
            let dayWeather = [{...hourlyData[i], 'localDate': current}];


            while(i < hourlyData.length - 2 && current.getDate() === next.getDate()) {
                dayWeather.push({...hourlyData[i+1], 'localDate': current});
                i++;
                current = next;
                next = getLocalDate(hourlyData[i+1].dt);
            }
            result.push(dayWeather);
        }
        return result;
    }


    const summarizeDay = (data) => {
        let result = {};
        const findMainCond = (arr) => {
            const hashmap = arr.reduce( (acc, val) => {
                acc[val.weather[0].main] = (acc[val.weather[0].main] || 0 ) + 1
                return acc
             },{})
            return Object.keys(hashmap).reduce((a, b) => hashmap[a] > hashmap[b] ? a : b)
         }

        result.weekDay = getWeekDay(data[0].localDate);
        result.date = data[0].localDate.getDate();
        result.highTemp = Math.round(Math.max(...data.map(o => o.main.temp)));
        result.lowTemp = Math.round(Math.min(...data.map(o => o.main.temp)));
        result.mainCond  = findMainCond(data);

        return result;
    }

    let sortedByDays = sortByDays(data);

    let dailyData = sortedByDays.map(data => {
        return summarizeDay(data);
    })

    return dailyData;
}