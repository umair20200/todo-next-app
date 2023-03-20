import { Fragment } from 'react';

import MainHeader from './main-header';
import Head from "next/head";

function Layout(props) {
  return (
    <Fragment>
         <Head>
        <title>Create Next App</title>

        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <link rel="stylesheet" href="" />
      </Head>
      <MainHeader />
     

      <main>{props.children}</main>
    </Fragment>
  );
}

export default Layout;