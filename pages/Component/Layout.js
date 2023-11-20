import Head from 'next/head';

const Layout = ({ children }) => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className='container'>
        {children}    
      </div>
      
    </div>
  );
};

export default Layout;