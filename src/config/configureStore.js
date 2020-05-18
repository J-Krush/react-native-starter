import {
  createStore,
  applyMiddleware,
  compose as composeWithoutDevTools,
} from 'redux';
import createSagaMiddleware from 'redux-saga';
// import { composeWithDevTools } from 'remote-redux-devtools';
import reducers from '../redux';
import rootSaga from '../sagas/rootSaga';
// import Http from '../network/Http';
// import RealmDb from '../../Database/RealmDb';

export default function() {
  let compose = composeWithoutDevTools;

  const sagaMiddleware = createSagaMiddleware();
  const middleware = [sagaMiddleware];

  if (__DEV__) {
    // compose = composeWithDevTools;
  }

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    reducers,
    {},
    composeEnhancers(applyMiddleware(...middleware)),
  );

  // set store references
  // Http.reduxStore = store;
  // RealmDb.reduxStore = store;

  // store must be created before running the saga
  sagaMiddleware.run(rootSaga);
  return store;
}
