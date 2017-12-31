import { combineReducers } from 'redux'
import locationReducer from './location'
import fretboardMatrixReducer from '../components/FretboardMatrix/module'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    location: locationReducer,
    fretboardMatrix: fretboardMatrixReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
