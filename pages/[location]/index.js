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
  // 각 list 항목을 반복하면서 Day를 추출하여 그룹화
  data.getWeatherForecast.list.forEach(item => {
    dateTime = new Date(item.dt_txt);
    day = dateTime.getDate();

    if (!groupedByDay[day]) {
      groupedByDay[day] = [];
    }

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
  console.log(now);

  return (
    <Layout>
      <div className={styles.container}>
        
        <div style={{ textAlign: 'center' }}>
          <Image 
            src={earth} 
            alt='지구' 
            width='40px' 
            height='40px' 
          />
        </div>

        <h1 className={styles.title}>Weather Information for {location}</h1>
        
        <div className={styles.currentContainer}>
          <div className={styles.currentBox}>
            <div className={styles.leftBox}>
              <div className={styles.roundedContainer}>
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
                <div style={{fontSize: '3vmin'}}>{now.month} {now.day}. {now.hours}:00{now.meridiem}</div>
                <div>
                  <span style={{fontSize: '4vmin'}}>{location}, {city.country}</span>
                  <span style={{fontSize: '2vmin'}}>(인구수:{city.population})</span>
                </div>
              </div>
            </div>

            <div className={ styles.currentRightBox } >
              <div style={{fontSize: '6vmin', fontWeight: 'bold'}}>{now.main.temp}K</div>
              <div style={{fontSize: '2vmin'}}>Feels like {now.main.feels_like}K {now.weather[0].description} 풍속 {now.wind.speed}m/s 습도 {now.main.humidity}%</div>
            </div>

          </div>
        </div>

        <div className={styles.accordion}>
          <h2 style={{fontSize: '4.5vmin', textAlign: 'center'}}>5-day Forecast</h2>
          { 
            resultArray.map((list, i) => (
              <>
                <details style={{marginTop:' 1rem'}}>
                  <summary>
                    <h3 style={{fontSize: '3.5vmin', marginLeft:'4vmin',}}>
                      {resultArray[i][0].month} {resultArray[i][0].day}
                    </h3>
                  </summary>
                  <div className="mt-4 space-y-4">
                    {
                      list.map((array, j) => (
                        <div className={styles.eachTimeContainer} key={j}>
                          {/* 여기에 각 list의 요소에 대한 JSX를 작성 */}
                          <div className={styles.leftBox}>
                            <p className={ styles.left } style={{fontSize: '3.5vmin'}}>{array.hours}:00{array.meridiem}</p>
                          </div>
                          <div>
                            <p className={ styles.right } style={{fontSize: '3vmin'}}>{array.weather[0].description}</p>
                            <p className={ styles.right } style={{fontSize: '3.5vmin'}}>{array.main.temp_min}K/{array.main.temp_max}K</p>
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