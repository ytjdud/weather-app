import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

import Layout from './Component/Layout.js'

import earth from '/public/earth.png'

export default function Home() {
  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.welcome}>
          <span style={{ color: 'grey' }}>Welcome to{'\n'}</span>
          <span style={{ color: 'hotpink' }}>Weather App!</span>
        </h1>
        
        <p className={styles.detail}>Choose a city from the list below to check the weather.</p>
        
        {/* <p>Hover</p> */}

        <div style={{position: 'relative'}}>
          {/* <div className={styles.activeButton}>
            
            <button className={styles.button}>Seoul</button>
            <p>Select</p>
            <button className={styles.button}>Seoul</button>
          </div> */}

          <div className={styles.cityButton}>
            <Link href="/Seoul"><button className={styles.button} >Seoul</button></Link>
            <Link href="/Tokyo"><button className={styles.button} >Tokyo</button></Link>
            <Link href="/Paris"><button className={styles.button} >Paris</button></Link>
            <Link href="/London"><button className={styles.button} >London</button></Link>
          </div>
        </div>

        <Image 
        src={earth} alt='지구' 
        width="350vmin" height="350vmin" />
      </div>  
    </Layout>
  )
}
