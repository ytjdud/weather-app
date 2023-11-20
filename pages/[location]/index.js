import Head from 'next/head'
import { useRouter } from 'next/router'
import styles from './Location.module.css';
import { useQuery, gql } from '@apollo/client';

const GET_WEATHERS = gql`
  query Query($cityName: String!) {
    getWeatherForecast(cityName: $cityName) {
      city {
        name
        country
        population
      }
    }
  }
`;

export default function LocationPage() {
  const router = useRouter();
  const {location} = router.query;

  const { loading, error, data } = useQuery(GET_WEATHERS, { 
    variables: { cityName: location },    
  });

  if (loading) return (<p>Loading...</p>);
  if (error) return (<p>Error: {error.message}</p>);
  
  console.log(data);
  return (
    <Layout>
      <h1 style={{fontSize: '5vmin'}}>Weather Information for {location}</h1>
      
      <div className={styles.now}>
        <p>May</p>
        <p>{location}, </p>
      </div>
      
    </div>
  );

}