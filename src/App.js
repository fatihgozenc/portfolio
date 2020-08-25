import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { StateProvider } from './context/StateContext'
import Layout from './components/Layout';
import Loading from './components/Loading'

import './styles/index.scss';

const Home = lazy(() => import('./screens/Home'));
const Works = lazy(() => import('./screens/Works'));
const About = lazy(() => import('./screens/About'));
const Work = lazy(() => import('./screens/Work'));


const App = () => {

	return (
		<Router>
			<StateProvider>
				<Layout>
					<Suspense fallback={<Loading />}>
						<Switch>
							<Route exact path="/" component={Home} />
							<Route exact path="/works" component={Works} />
							<Route path="/works/:slug" component={Work} />
							<Route path="/about" component={About} />
						</Switch>
					</Suspense>
				</Layout>
			</StateProvider>
		</Router>
	);
}

export default App;
