import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, useRouterHistory } from 'react-router';
import { createHistory } from 'history';
import { syncHistoryWithStore} from 'react-router-redux';

// On importe les routes de l'application
import routes from './routes.js';
import config from 'config';
import reducer from "./reducers";
import configureStore from './store/configureStore';

// On crée un historique synchronisé avec le store
// (browserHistory = Historique basé sur l'URL du navigateur)
const browserHistory = useRouterHistory(createHistory)({
  basename: config.basePath // racine du site concaténé aux URLs du Router
});

// On crée le store en lui fournissant le "reducer"
// const store = createStore( reducer );
//
// Pour pouvoir utiliser les Redux Devtools la syntaxe,
// plus complexe est externalisée dans un module configureStore
const store = configureStore( browserHistory );
const history = syncHistoryWithStore(browserHistory, store);


// A la place du composant principal on utilise
// le composant "Router" de 'react-router'
ReactDOM.render(
    <Provider store={store}>
        <Router history={history} routes={routes} />
    </Provider>
	, document.getElementById('app')
);