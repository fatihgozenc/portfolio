import React from 'react';
import SimpleReactLightbox from "simple-react-lightbox";
import { SRLWrapper } from "simple-react-lightbox";
import { useSpring, animated } from 'react-spring'

import useFetchSuspense from '../utils/useFetchSuspense'
import useWindowSize from '../utils/useWindowSize';

const lightboxOpts = {
	buttons: {
		showDownloadButton: false,
		showFullscreenButton: false,
		showThumbnailsButton: false,
	},
	progressBar: {
		showProgressBar: true
	}
};

export default (props) => {
	const size = useWindowSize();

	const workOpening = useSpring({
		from: { width: `13vw` },
		width: `80vw`
	})

	const workOpeningMobile = useSpring({
		from: { width: `0%` },
		width: `100%`
	})

	const workHeroOpeningMobile = useSpring({
		from: { top: `45%`, opacity: 0 },
		to: { top: `50%`, opacity: 1 }
	})

	const workHeroOpening = useSpring({
		from: { width: `27vw`, marginTop: `0vw` },
		to: { width: `37vw`, marginTop: `10vw` }
	})

	const data = useFetchSuspense(`${process.env.REACT_APP_API_URL}/works?name=${props.match.params.slug}`).entry;

	// const ExternalUrl = (str) => {
	// 	console.log(str.match(/<.*>/))
	// 	return(
	// 		<a href="">str</a>
	// 	)
	// }

	return (
		<>
			<animated.section style={size.width >= 1200 ? workOpening : null} className="work__wrapper single">
				<animated.div style={size.width >= 1200 ? workOpening : workOpeningMobile} className="works__item ">
					<animated.img style={size.width >= 1200 ? workHeroOpening : workHeroOpeningMobile}
						src={data.hero} alt={data.name} />
				</animated.div>
				<h1 className="work__title" year={data.year} >{data.name}</h1>
				<ul className="work__info">
					<li attribute="role">{data.role}</li>
					<li attribute="tech">{data.tech}</li>
					<li attribute="spot">{data.spot}</li>
				</ul>
				<p className="work__description">{data.desc}</p>
				{
					data.site && <a href={data.site}
						className="welcome__router work__url"
						target="_blank"
						rel="noopener noreferrer"><span>Visit Website</span></a>
				}
				<SimpleReactLightbox>
					<main className="work__gallery">
						<SRLWrapper options={lightboxOpts}>
							{
								data.imgs.map((item, i) => (
									<article size={item.size} className="work__gallery--item" key={i}>
										<img src={item.link} alt={item.name} />
										<h3>{item.name}</h3>
									</article>
								))
							}
						</SRLWrapper>
					</main>
				</SimpleReactLightbox>
			</animated.section>
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