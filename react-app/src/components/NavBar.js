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
          <h1 className='quizlr-nav-title'>Quizlr</h1>
        </div>
        <div className='home-button'>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </div>
          <div>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </div>
      </div>
        <div className='right-content'>
          <div>
            <NavLink to='/login' exact={true} activeClassName='active'>
              Login
            </NavLink>
          </div>
          <div>
            <NavLink to='/sign-up' exact={true} activeClassName='active'>
              Sign Up
            </NavLink>
          </div>
        </div>
        {sessionUser ?
        <div>
          <LogoutButton />
        </div>
        :
        <></>}
    </nav>
  );
}

export default NavBar;
