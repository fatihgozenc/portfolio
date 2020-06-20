import React from 'react';
import worksWeb from '../data/worksWeb';
import {useSpring, animated, interpolate} from 'react-spring'
import isMobile from '../utils/isMobile';

export default (props) => {
  // console.log(isMobile)

  const workOpening = useSpring({
    from: {width: `33vw`},
    width: `80vw`
  })

  const workOpeningMobile = useSpring({
    from: {width: `0%`},
    width: `100%`
  })

  const workHeroOpeningMobile = useSpring({
    from: {top: `45%`, opacity: 0},
    to: {top: `50%`, opacity: 1}
  })

  const workHeroOpening = useSpring({
    from: {width: `37vw`, marginTop: `0vw`},
    to: {width: `45vw`, marginTop: `10vw`}
  })

  return (
    <>
      <animated.div style={!isMobile ? workOpening : null} className="work__wrapper single">
        <animated.article style={!isMobile ? workOpening : workOpeningMobile} className="works__item ">
          <animated.img style={!isMobile ? workHeroOpening : workHeroOpeningMobile} src={props.location.state.hero} alt={props.location.state.name}/>
        </animated.article>
      </animated.div>
    </>
  )
}

// return (
//   <section className="works works__single" >
//     <div className="work">
//       <h1 className="work__title">{props.location.state.name}</h1>
//       <div className="work__year">
//         <span className="work__year--barcontainer"><span className="work__year--bar"/></span>
//         <span className="work__year--text">{props.location.state.year}</span>
//       </div>
//       <p className="work__desc">
//         Re-branding of the visual guidelines and brand for Meniga. New design for the Meniga app.
//       </p>
//       <ul className="work__role">
//         <li>Branding</li>
//         <li>Visual Art</li>
//         <li>Interaction Design</li>
//       </ul>
//       <a href="http://google.com">Visit website</a>
//     </div>
//     <div className="work__wrapper">
//     <img src={props.location.state.hero} alt=""/>
//     </div>
// {/*       
//     {
//       worksWeb.map((work, i) => (
//       <article key={i} className="works__item">
//           <img alt={work.name} src={work.image}/>
//       </article>
//       ))
//     } */}
//   </section>
// )