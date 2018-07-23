import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import Root from 'router'
import store from './store'
// import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css'

ReactDOM.render(<Root store={store} />, document.getElementById('root'))
registerServiceWorker()
