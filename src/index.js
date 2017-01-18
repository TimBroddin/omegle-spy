import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import {persistStore, autoRehydrate} from 'redux-persist'
import reducers from './reducers'
import thunk from 'redux-thunk';
import analytics from 'redux-analytics';
import ReactGA from 'react-ga';

ReactGA.initialize('UA-90487711-1', {
  debug: true
});
ReactGA.set({ checkProtocolTask: () => {} });
ReactGA.plugin.require('displayfeatures');

const analyticsMiddleware = analytics(({ type, payload }) => {

  if(window && window.ga) {
    ReactGA.event({
      category: type,
      action: payload.action,
      value: payload.value,
      label: payload.label
    });

    if(type === 'conversation' && payload.action == 'new') {
      // send new pageview as well
      ReactGA.pageview('/');
    }

  }

});


function configureStore(initialState, reducer) {
    const store = createStore(reducer, undefined,
        compose(
            applyMiddleware(thunk, analyticsMiddleware),
            autoRehydrate(),
            typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f,
        )
    );
    return store;
}

let store = configureStore({}, reducers);

persistStore(store, { blacklist: ['conversation']});


ReactDOM.render(
  <Provider store={store}>
<App />
</Provider>,
  document.getElementById('root')
);
