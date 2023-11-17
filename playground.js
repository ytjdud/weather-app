import express from 'express';
import fetch from 'node-fetch';
import apollo from 'apollo-server-express'
const { ApolloServer } = apollo

const typeDefs = `
  type List {
    main: Main
    weather: [Weather]
    wind: Wind
  }

  type Main {
    temp: Float
    feels_like: Float
    temp_min: Float
    temp_max: Float
    humidity: Int
  }

  type Weather {
    main : String
  }

  type Wind {
    speed: Float
  }

  type City {
    name: String
    country: String
    population: Int
  }

  type Query {
    getWeatherForecast(lat: Float!, lon: Float!): WeatherForecast
  }

  type WeatherForecast{
    list: [List]
    city: City
  }
`;
const resolvers = {
  Query: {
    getWeatherForecast: async (_, { lat, lon }) => {
      try {
        const apiKey = '4f789f109d2b8125061337d58830db05';
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`);
        const data = await response.json();

        const cityData = data.city;
        const city = {
          name: cityData.name,
          country: cityData.country,
          population: cityData.population,
        };

        const listData = data.list.map(item => ({
          main: item.main,
          weather: item.weather,
          wind: item.wind,
        }));

        const weatherForecast = {
          city: {
            name: cityData.name,
            country: cityData.country,
            population: cityData.population,
          },
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

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true, // GraphQL Playground 활성화
});

const app = express();

// Apollo Server를 시작한 후에 미들웨어를 적용합니다.
async function startServer() {
  await server.start();
  server.applyMiddleware({ app, path: '/api/graphql' });
}

startServer().then(() => {
  app.listen(4000, () => {
    console.log('Server is running on http://localhost:4000');
  });
});