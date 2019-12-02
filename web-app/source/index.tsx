import React, { FC } from 'react';
import ReactDOM from 'react-dom';

import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import HomeView from '~/views/home-view';

const App: FC = () => {
  return (
    <div>
      <Router basename="">
        <Route
          exact
          path="/"
          component={HomeView}
        ></Route>
      </Router>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));