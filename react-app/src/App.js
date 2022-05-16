import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';

// import of my stuff!
import SubjectList from './components/subjects/subjects';
import QuizList from './components/quizzes/quizzesList';
import NewQuizForm from './components/quizzes/newQuizForm';
import SpecificQuiz from './components/quizzes/specificQuiz';
import SplashPage from './components/splashpage/splashPage';
import FlashCardList from './components/flashcards/flashcardsList';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route exact path="/">
          <SplashPage />
        </Route>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/subjects' exact={true} >
          <SubjectList />
        </ProtectedRoute>
        <ProtectedRoute path='/subject/:subjectId'>
          <NewQuizForm/>
          <QuizList/>
        </ProtectedRoute>
        <ProtectedRoute path='/quiz/:quizId'>
          <SpecificQuiz/>
          <FlashCardList />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
