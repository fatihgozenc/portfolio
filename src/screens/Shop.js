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
		from: { width: `33vw` },
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
		from: { width: `37vw`, marginTop: `0vw` },
		to: { width: `45vw`, marginTop: `10vw` }
	})

	const data = useFetchSuspense(`${process.env.REACT_APP_API_URL}/works?name=${props.match.params.slug}`).entry;

	return (
		<>
			<animated.section style={size.width >= 1200 ? workOpening : null} className="work__wrapper single">
				<animated.article style={size.width >= 1200 ? workOpening : workOpeningMobile} className="works__item ">
					<animated.img style={size.width >= 1200 ? workHeroOpening : workHeroOpeningMobile}
						src={data.hero} alt={data.name} />
				</animated.article>
				<SimpleReactLightbox>
					<section className="work__gallery">
						<SRLWrapper options={lightboxOpts}>
							{
								data.imgs.map((item, i) => (
									<article className="work__gallery--item" key={i}>
										<img src={item.link} alt={item.name} />
										<h3>{item.name}</h3>
									</article>
								))
							}
						</SRLWrapper>
					</section>
				</SimpleReactLightbox>
			</animated.section>
		</>
	)
}