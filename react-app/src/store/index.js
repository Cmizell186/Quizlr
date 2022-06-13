import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'

// reducers i created
import subjectReducer from './subjects';
import quizReducer from './quizzes';
import flashcardsReducer from './flashcards';
import searchReducer from './searchQuizzes';

const rootReducer = combineReducers({
  session,
  subjects: subjectReducer,
  quizzes: quizReducer,
  flashcards: flashcardsReducer,
  searchedFor: searchReducer,
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
