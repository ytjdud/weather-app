// typeDefs.js
import { gql } from 'graphql-tag';

const typeDefs = gql`
  type Query {
    getWeatherForecast(cityName: String!): WeatherForecast
  }

  type WeatherForecast{
    list: [List]
    city: City
  }

  type List {
    main: Main
    weather: [Weather]
    wind: Wind
    dt_txt: String
  }

  type Main {
    temp: Float
    feels_like: Float
    temp_min: Float
    temp_max: Float
    humidity: Int
  }

  type Wind {
    speed: Float
  }

  type Weather {
    description : String
  }

  type City {
    name: String
    country: String
    population: Int
  }
`;

export default typeDefs;