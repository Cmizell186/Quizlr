import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { useSelector } from 'react-redux';
import "./NavBar.css"

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
          <div className='subjects-button'>
          <NavLink to='/subjects' exact={true} activeClassName='active'>
            Subjects
          </NavLink>
        </div>
      </div>
        <div className='right-content'>
        {sessionUser ?
        <>
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
            <NavLink to='/login' exact={true} activeClassName='active'>
              Login
            </NavLink>
          </div>
          <div className='signup-nav-button'>
            <NavLink to='/sign-up' exact={true} activeClassName='active'>
              Sign Up
            </NavLink>
          </div>
        </>}
        </div>
    </nav>
  );
}

export default NavBar;
