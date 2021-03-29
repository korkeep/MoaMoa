import React from 'react'
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'

import GlobalStyle from './styles/GlobalStyle'
import Header from './components/header'
import Footer from './components/footer'
import Index from './pages/index'
import page404 from './pages/404'


function App() {
  return (
    <Router>
      <GlobalStyle />
      <Header />
        <Switch>
          <Route exact path="/" component={Index} />
          <Route component={page404} />
        </Switch>
      <Footer />
    </Router>
  );
}

export default App;
