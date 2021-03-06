import React from 'react';
import Div100vh from 'react-div-100vh';
import useWindowSize from '../utils/useWindowSize';
import Welcome from '../components/Welcome';
import GroundGrass from '../components/GroundGrass'
import GroundTree from '../components/GroundTree'
import Water from '../assets/images/water.gif'
import WaterVideo from '../assets/water.mp4'
import FloraGrass from '../components/FloraGrass';
import Figure from '../components/Figure';

export default () => {
	const size = useWindowSize();
	return (
		<Div100vh>
			<div className="comp">
				<div className="comp__galaxy">
					<div className="comp__galaxy--background"/>
					<div className="comp__galaxy--stars"/>
				</div>
				<div className="comp__moon"/>
				<div className="comp__ground">
					<GroundGrass/>
					<GroundTree/>
					<GroundTree type="reflection"/>
					<Figure/>
					<div className="comp__water">
						{
							size.width <= 1000 
								? (
									<img className="comp__water--animated" src={Water} alt="water"/>
								) : (
									<video src={WaterVideo}
										autoPlay={true} 
										muted={true} 
										loop={true} 
										playsInline 
										className="comp__water--image"
									/>
								)
						}
					</div>
				</div>
				<div className="comp__flora">
					<FloraGrass/>
				</div>
			</div>
			<Welcome/>
		</Div100vh>
	)
}
