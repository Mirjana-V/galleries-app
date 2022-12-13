import React from 'react';
import MainNavbar from './MainNavbar';

export default function DefaultLayout({children}) {

  return (
    <div>
        <div><MainNavbar /></div>
        <div>{children}</div>
        {/* <footer> Hello there{user && user.first_name}</footer> */}
    </div>
  );
}