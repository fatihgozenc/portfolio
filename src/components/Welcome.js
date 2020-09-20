import React from 'react';
import { Link } from 'react-router-dom';
import texts from '../data/texts.json'

const Welcome = (props) => {

  return(
    <Link to="/works">
      <div className="welcome">
        <div className="welcome__container">
          <p className="welcome__container__text">
            Hi, I am Fatih Gözenç,
          </p>
        </div>
        {
          texts.data.welcome.map((text, j) => (
            <div key={j} className="welcome__container">
              <p className="welcome__container__text">
                {text.intro}
              </p>
              <ul className="welcome__container__list">
                {
                  text.items.map((item, i) => (
                    <li 
                      key={i + 10} 
                      className="welcome__container__list__item">
                        {item}
                    </li>
                  ))
                }
              </ul>
            </div>
          ))
        }
        <span className="welcome__router">
          <span>DISCOVER</span>
        </span>
      </div>
    </Link>
  )
};
  
export default Welcome;