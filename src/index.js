import React from 'react';
import ReactDOM from 'react-dom';

import Router from 'router';
// import Root from 'oldRouter'
import 'semantic-ui-css/semantic.min.css';
import store from 'store';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Router store={store} />, document.getElementById('root'));
registerServiceWorker();
