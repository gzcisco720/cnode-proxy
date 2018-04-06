import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'mobx-react';
import { AppContainer } from 'react-hot-loader';//eslint-disable-line
import { BrowserRouter } from 'react-router-dom';

import App from './views/App';
import AppState from './store/app-state';

const root = document.getElementById('root');
const initialState = window.__INITIAL_STATE__ || {}; //eslint-disable-line

const render = (Component) => {
  ReactDom.hydrate(
    <AppContainer>
      <Provider appState={new AppState(initialState.appState)}>
        <BrowserRouter>
          <Component />
        </BrowserRouter>
      </Provider>
    </AppContainer>
    ,
    root,
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./views/App', () => {
    const NextApp = require('./views/App').default;
    render(NextApp);
  });
}
