import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { Provider } from 'react-redux'
import registerServiceWorker from './registerServiceWorker'
// import 'bootstrap/dist/css/bootstrap.css';
import store from './store'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContextProvider } from 'react-dnd'
import 'font-awesome/css/font-awesome.min.css'

ReactDOM.render(
  <DragDropContextProvider backend={HTML5Backend}>
    <Provider store={store}>
      <App />
    </Provider>
  </DragDropContextProvider>,
  document.getElementById('root')
)
registerServiceWorker()
