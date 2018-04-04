import React from 'react';
import ReactDom from 'react-dom';
import App from './views/App';
import { AppContainer } from 'react-hot-loader';//eslint-disable-line
import { BrowserRouter } from 'react-router-dom';


const root = document.getElementById('root');
const render = (Component) => {
  ReactDom.hydrate(
    <AppContainer>
      <BrowserRouter>
        <Component />
      </BrowserRouter>
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
