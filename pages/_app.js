import "../styles/globals.css";
import "../styles/globals.css";
import Layout from "../components/layout/layout";
import {  useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Router from "next/router";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
      useEffect(() => {
        const start = () => {
          console.log("start");
          setLoading(true);
        };
        const end = () => {
          console.log("finished");
          setLoading(false);
        };
        Router.events.on("routeChangeStart", start);
        Router.events.on("routeChangeComplete", end);
        Router.events.on("routeChangeError", end);
        return () => {
          Router.events.off("routeChangeStart", start);
          Router.events.off("routeChangeComplete", end);
          Router.events.off("routeChangeError", end);
        };
      }, []);
    
  
  return <Layout>{loading ?  <Box  sx={{ 
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: 'inherit'

  
  }}>
  <CircularProgress />
</Box> :  <Component {...pageProps} />}
</Layout>
}

export default MyApp;
