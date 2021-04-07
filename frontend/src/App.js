import React from 'react'
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'

import GlobalStyle from './styles/GlobalStyle'
import Header from './components/header'
import SideBar from './components/sidebar'
import page404 from './pages/404'
import Image from './pages/image'
import Video from './pages/video'
import Music from './pages/music'
import Etc from './pages/etc'


function App() {
  return (
    <Router>
      <GlobalStyle />
      <Header />
        <Switch>
          <Route path="/image" component={Image} />
          <Route path="/video" component={Video} />
          <Route path="/Music" component={Music} />
          <Route path="/Etc" component={Etc} />
          <Route exact path="/">
            <Redirect to="/image"/>
          </Route>
          <Route component={page404} />
        </Switch>
      <SideBar />
    </Router>
  );
}

export default App;
