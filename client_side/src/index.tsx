import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware, AnyAction, Store} from 'redux'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import reducers from './reducers'
import { WholeStateInRedux } from './reducers/index'
import indexRouter from './mainpage'
import './GlobalWindowDeclaration'
import { getPlatformInfo, onPlatformInfoResponseBack } from './infra'

const createStoreWithMiddleware = applyMiddleware()(createStore)

let appStore: Store<WholeStateInRedux, AnyAction>;

if(process.env.NODE_ENV.indexOf('Production') === -1) {

  appStore = createStoreWithMiddleware(reducers)

}else {
  appStore = createStoreWithMiddleware(
    reducers,
    /**  force cast~  https://github.com/zalmoxisus/redux-devtools-extension/issues/134#issuecomment-379861240 */
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__())
}


const cb = (() => {
  ReactDOM.render(
    <Provider store={appStore}>
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/" component={indexRouter}/>
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>, document.querySelector('.container'))
})

getPlatformInfo()

onPlatformInfoResponseBack(cb)


