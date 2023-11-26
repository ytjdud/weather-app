import Head from 'next/head'

import { useRouter } from 'next/router'
import styles from '../../styles/Location.module.css';
import { useQuery, gql } from '@apollo/client';
import Layout from '../Component/Layout';

import Image from 'next/image';
import earth from '/public/earth.png'

const GET_WEATHERS = gql`
  query GetWeatherForecast($cityName: String!) {
    getWeatherForecast(cityName: $cityName) {
      list {
        main {
          temp
          feels_like
          temp_min
          temp_max
          humidity
        }
        wind {
          speed
        }
        dt_txt
        weather{
          description
        }
      }
      city {
        country
        name
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

  const groupedByDay = {};
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  let dateTime = null;
  let day = null;
  let lastDay = 0;

  // 각 list 항목을 반복하면서 Day를 추출하여 그룹화
  data.getWeatherForecast.list.forEach(item => {
    dateTime = new Date(item.dt_txt);
    day = dateTime.getDate();

    // 달이 바뀌었을 때 29 30 31 1 2
    if(day-lastDay < 0){
      day += lastDay;
    }else{
      lastDay = day;
    }

    if (!groupedByDay[day]) {
      groupedByDay[day] = [];
    }

    item.main.temp = (item.main.temp - 273.15).toFixed(2);
    item.main.temp_min = (item.main.temp_min - 273.15).toFixed(2);
    item.main.temp_max = (item.main.temp_max - 273.15).toFixed(2);
    item.main.feels_like = (item.main.feels_like - 273.15).toFixed(2);

    // 해당 Day의 그룹에 현재 항목 추가
    groupedByDay[day].push({
      ...item,
      month: monthNames[dateTime.getMonth()],
      day: dateTime.getDate(),
      hours: dateTime.getHours().toString().padStart(2, '0'),
      meridiem: dateTime.getHours() >= 12 ? "pm" : "am"
    });
  });
  const resultArray = Object.values(groupedByDay);
  
  const city = data.getWeatherForecast.city;

  const now = resultArray[0][0];

  return (
    <Layout>
      <div className={styles.container}>
        
        <div style={{ textAlign: 'center' }}>
          <Image 
            src={earth} 
            alt='지구' 
            width='60px' 
            height='60px' 
          />
        </div>

        <h1 className={styles.title}>Weather Information for {location}</h1>
        
        <div className={styles.currentContainer}>
          <div className={styles.currentBox}>
            <div className={styles.leftBox}>
              <div className={styles.currentRoundedContainer}>
                <Image 
                src="https://placehold.co/50x50" 
                alt="Weather icon placeholder" 
                className={styles.icon}
                width='50px'
                height='50px'
                objectFit="cover"  //필요에따라 조절..
                />
              </div>
            
              <div>
                <div style={{fontSize: '3vmin', fontWeight: '600', color:'#606060'}}>{now.month} {now.day}. {now.hours}:00{now.meridiem}</div>
                <div>
                  <span style={{fontSize: '4vmin', fontWeight: '600'}}>{location}, {city.country}</span>
                  <span style={{fontSize: '2vmin', color:'rgb(153 152 152)'}}>(인구수:{city.population})</span>
                </div>
              </div>
            </div>

            <div className={ styles.currentRightBox } >
              <div style={{fontSize: '6vmin', fontWeight: 'bold'}}>{now.main.temp}°C</div>
              <div style={{fontSize: '2vmin', color:'rgb(153 152 152)'}}>Feels like {now.main.feels_like}°C {now.weather[0].description} 풍속 {now.wind.speed}m/s 습도 {now.main.humidity}%</div>
            </div>

          </div>
        </div>

        <div className={styles.accordion}>
          <h2 style={{fontSize: '4.5vmin', textAlign: 'center'}}>5-day Forecast</h2>
          { 
            resultArray.slice(0, 5).map((list, i) => (
              <>
                <details>
                  <summary>
                    <h2 style={{fontSize: '3.5vmin'}} key={i}>
                      {resultArray[i][0].month} {resultArray[i][0].day}
                    </h2>
                  </summary>
                  <div className="mt-4 space-y-4">
                    {
                      list.map((array, j) => (
                        <div className={styles.eachTimeContainer} style={{ padding: ' 1rem 3rem' }} key={j}>
                          <div className={styles.leftBox}>
                            <div className={styles.forecastRoundedContainer}>
                              <Image 
                              src="https://placehold.co/50x50" 
                              alt="Weather icon placeholder" 
                              className={styles.icon}
                              width='50px'
                              height='50px'
                              objectFit="cover"  //필요에따라 조절..
                              />
                            </div>
                            <div>
                              <div style={{fontSize: '3.5vmin', color:'#606060'}}>{array.hours}:00{array.meridiem}</div>
                            </div>
                          </div>
                          <div>
                            <div style={{fontSize: '2vmin', textAlign: 'end', color:'rgb(153 152 152)'}}>{array.weather[0].description}</div>
                            <div style={{fontSize: '3.5vmin'}}>{array.main.temp_min}°C/{array.main.temp_max}°C</div>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </details>
              </>
            ))
          }
        </div>
      </div>
    </Layout>
  );
}