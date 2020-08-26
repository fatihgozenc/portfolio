import React from 'react';
import AboutSkills from '../components/AboutSkills';

export default () => {
	return (
		<section className="about">
			<div className="about__background" />
			<div className="about__info">
				<div className="about__info--box">
					<h2>Who am I?</h2>
					<p>
						Fatih is a Creative Full-Stack Developer & Designer born and raised in Turkey and currently living and working in Dresden, Germany. With a focus in fullstack web development, first he defines the visual design of a project with the experience of graphic design background, then programs its front-end along with back-end and make it live on a domain.<br /><br />As a self-taught developer, he increases his knowledge in programming everyday and aims to continue his career as a Javascript Developer.<br /><br />Fatih also has a passion for illustration and programming automations in Linux that he practices in his spare time. He aims to get RHCE certificate one day.
          </p>
				</div>
				<div className="about__info--box">
					<h2>Skills</h2>
					<div className="about__info--skillsbox">
						<AboutSkills />
					</div>
				</div>
				<div className="about__info--box">
					<h2>Socials</h2>
					<a href="https://www.linkedin.com/in/fatihgozenc/"><span>LinkedIn</span></a>
					<a href="https://instagram.com/fatihgozenc"><span>Instagram</span></a>
				</div>
				<div className="about__info--box">
					<h2>Contact</h2>
					<a href="mailto:fatihgozenc@gmail.com"><span>fatihgozenc@gmail.com</span></a>Available for freelance projects.
        </div>
			</div>
		</section>
	)
}