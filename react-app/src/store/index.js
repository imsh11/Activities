import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import placeReducer from './places'
import cartReducer from './cart';
import placeListReducer from './placeToVisit';
import reviewReducer from './review';
import OrderHistoryReducer from './order';
import Users from './users';

const rootReducer = combineReducers({
  session,
  places: placeReducer,
  cart: cartReducer,
  placesList: placeListReducer,
  reviews: reviewReducer,
  orderHistory: OrderHistoryReducer,
  Users
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
