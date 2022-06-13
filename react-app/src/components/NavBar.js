import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { useSelector } from 'react-redux';
import "./NavBar.css"
import LoginForm from './auth/LoginForm';
import SignUpForm from './auth/SignUpForm';
import SearchBar from './searchbar/Searchbar';

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user)

  return (
    <nav className='nav-bar'>
      <div className='content-left'>
        <div>
        <NavLink to='/' exact={true} activeClassName='active'>
          <h1 className='quizlr-nav-title'>Quizlr</h1>
        </NavLink>
        </div>
        <div className='home-button'>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </div>
      </div>
        <div className='right-content'>
        {sessionUser ?
        <>
          <div>
            <SearchBar />
          </div>
          <div className='profile-button'>
            <NavLink to={`/users/${sessionUser.id}`}>
              Profile
            </NavLink>
          </div>
          <div>
            <LogoutButton />
          </div>
        </>
        :
        <>
          <div className='login-nav-button'>
            {/* <NavLink to='/login' exact={true} activeClassName='active'>
              Login
            </NavLink> */}
            <LoginForm />
          </div>
          <div className='demo-button'>
            <NavLink to="/demo">
              Demo
            </NavLink>
          </div>
          <div className='signup-nav-button'>
            {/* <NavLink to='/sign-up' exact={true} activeClassName='active'>
              Sign Up
            </NavLink> */}
            <SignUpForm />
          </div>
        </>}
        </div>
    </nav>
  );
}

export default NavBar;
