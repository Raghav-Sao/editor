import React from 'react'
import ReactDOM from 'react-dom'

import registerServiceWorker from './registerServiceWorker'
import Router from 'router'
// import Root from 'oldRouter'
import 'semantic-ui-css/semantic.min.css'
import './App.css'
import store from 'store'

ReactDOM.render(<Router store={store} />, document.getElementById('root'))
registerServiceWorker()
