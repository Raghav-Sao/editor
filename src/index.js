import React from 'react'
import ReactDOM from 'react-dom'

import registerServiceWorker from './registerServiceWorker'
import Root from 'router'
// import Root from 'oldRouter'
import store from './store'

ReactDOM.render(<Root store={store} />, document.getElementById('root'))
registerServiceWorker()
