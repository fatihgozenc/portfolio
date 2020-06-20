import React from 'react';
import Header from './Header';

export default (props) => {
  return(
    <>
      <Header/>
      {props.children}
    </>
  )
};

