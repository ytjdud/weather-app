import axios from 'axios';

const resolvers = {
  Query: {
    getWeatherForecast: async (_, {cityName}) => {
      try {
        const appid = "4f789f109d2b8125061337d58830db05";
        const response = await axios({
          url: `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${appid}`,
        });
  
        const data = response.data;

        const cityData = data.city; // data.city 는 City, {}
        const city = {
          name: cityData.name,
          country: cityData.country,
          population: cityData.population,
        };

        const listData = data.list.map(item => ({ // data.list 는 [List]
          main: item.main , // item.main은 Main, {}
          weather: item.weather,
          wind: item.wind ,
          dt_txt: item.dt_txt
        }));
        // console.log(
        //   data.list.map(item => ({ // data.list 는 [List]
        //     weather: item.weather.map(weatherItem => ({ // item.weather 는 [Weather]
        //             weather :  { ...weatherItem.weather }//weatherItem.weather 는 Weather, {}
        //           })),
        //   }))
        // )
        // [ {"weather": [{"main": null}]}, {"weather": [{"main": null}]} ...]

        const weatherForecast = {
          city: city,
          list: listData,
        };
        
        return weatherForecast;
      } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
      }
    },
  },
};

export default resolvers;