import React from 'react';
import {Link} from 'react-router-dom';

const Welcome = (props) => {
  return(
    <Link to="/works">
      <div className="welcome">
        <div className="welcome__container">
          <p className="welcome__container__text">Hi, I am Fatih Gözenç,</p>
        </div>
        <div className="welcome__container">
          <p className="welcome__container__text">I develop</p>
          <ul className="welcome__container__list">
            <li className="welcome__container__list__item">websites</li>
            <li className="welcome__container__list__item">apps</li>
            <li className="welcome__container__list__item">UX/UI</li>
            <li className="welcome__container__list__item">servers</li>
          </ul>
        </div>
        <div className="welcome__container">
            <p className="welcome__container__text">I also do</p>
            <ul className="welcome__container__list">
              <li className="welcome__container__list__item">graphic design</li>
              <li className="welcome__container__list__item">branding</li>
              <li className="welcome__container__list__item">illustration</li>
              <li className="welcome__container__list__item">music</li>
            </ul>
          </div>
        <span className="welcome__router"><span>DISCOVER</span></span>
      </div>
    </Link>
  )
};
  
export default Welcome;