import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import WorksContext, {initialContext} from './context/WorksContext'
import Layout from './components/Layout';
import './styles/index.scss';
import Loading from './components/Loading'
const Home = lazy(() => import('./screens/Home'));
const Works = lazy(() => import('./screens/Works'));
const About = lazy(() => import('./screens/About'));
const Work = lazy(() => import('./screens/Work'));

const App = () => {
  
  const [category, setCategory] = React.useState(initialContext)

  return (
    <Router>
      <WorksContext.Provider value={[category, setCategory] } >
        <Layout>
          <Suspense fallback={<Loading/>}>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/works" component={Works}/>
              <Route path="/works/:slug" component={Work}/>
              <Route path="/about" component={About}/>
            </Switch>
          </Suspense>
        </Layout>
      </WorksContext.Provider>
    </Router>
  );
}

export default App;
