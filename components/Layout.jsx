import { Fragment } from 'react';
import Footer from './Footer';

import  Header from  './Header';

function Layout(props) {
  return (
    <Fragment>
      <Header />
      <main className="container m-0 mx-auto px-1 sm:px-2 md:px-3 lg:px-5 xl:px-7 2xl:px-9 py-2 sm:py-4 md:py-7 lg:py-10 xl:py-12 2xl:py-14" style={{minHeight: "70vh"}}>{props.children}</main>
      <Footer />
    </Fragment>
  );
}

export default Layout;
