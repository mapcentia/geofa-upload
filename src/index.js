/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import '@babel/polyfill';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'connected-react-router/immutable';

import history from './utils/history';
import 'sanitize.css/sanitize.css';

// Import root app
import App from './containers/App';

import LanguageProvider from './containers/LanguageProvider';
import configureStore from './configureStore';

// Import i18n messages
//import {translationMessages} from './i18n';
import {createMuiTheme} from "@material-ui/core/styles";
import {ThemeProvider} from '@material-ui/core/styles';

let translationMessages = require('./i18n');
// Create redux store with history
const initialState = {};
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('root');
const theme = createMuiTheme({
    palette: {
        primary: {
            // light: will be calculated from palette.primary.main,
            main: '#4C5F35',
            // dark: will be calculated from palette.primary.main,
            // contrastText: will be calculated to contrast with palette.primary.main
        },
        secondary: {
            light: '#0066ff',
            main: '#0044ff',
            // dark: will be calculated from palette.secondary.main,
            contrastText: '#ffcc00',
        },
        // Used by `getContrastText()` to maximize the contrast between
        // the background and the text.
        contrastThreshold: 3,
        // Used by the functions below to shift a color's luminance by approximately
        // two indexes within its tonal palette.
        // E.g., shift from Red 500 to Red 300 or Red 700.
        tonalOffset: 0.2,
    },
});

const render = messages => {
    ReactDOM.render(
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <LanguageProvider messages={messages}>
                    <ConnectedRouter history={history}>
                        <App/>
                    </ConnectedRouter>
                </LanguageProvider>
            </Provider>
        </ThemeProvider>,
        MOUNT_NODE,
    );
};

if (module.hot) {
    // Hot reloadable React components and translation json files
    // modules.hot.accept does not accept dynamic dependencies,
    // have to be constants at compile-time
    module.hot.accept(['./i18n', './containers/App'], () => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE);
        render(translationMessages);
    });
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
    // new Promise(resolve => {
    //     resolve(import('intl'));
    // })
    //     .then(() => Promise.all([import('intl/locale-data/jsonp/en.js'), import('intl/locale-data/jsonp/da.js')])) // eslint-disable-line prettier/prettier
    //     .then(() => render(translationMessages))
    //     .catch(err => {
    //         throw err;
    //     });
} else {
    render(translationMessages);
}

