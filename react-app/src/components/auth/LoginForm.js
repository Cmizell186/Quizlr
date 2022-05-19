import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import Popup from 'reactjs-popup';
import "./index.css"

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  // for popup modal
  const [open, setOpen] = useState(false);

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (Array.isArray(data)) {
      setErrors(data);
    } else {
      setErrors([]);
      setEmail("");
      setPassword("");
      setOpen();
    }
  };

  const openModal = () => setOpen(!open);

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div>
      <a onClick={openModal} className="login-modal-open-thing">Login</a>
      <Popup open={open} modal>
        <p style={{color:"black"}} className="login-modal-label">Login</p>
        <form onSubmit={onLogin} className='login-modal-div'>
          <div className='email-login-div'>
            <label htmlFor='email' style={{color:"#FFCD1F"}} className="login-modal-label">Email</label>
            <input
              name='email'
              type='text'
              placeholder='Email'
              value={email}
              onChange={updateEmail}
              className="login-input"
              />
          </div>
          <div className='password-login-div'>
            <label htmlFor='password'  style={{color:"#FFCD1F"}} className="login-modal-label">Password</label>
            <input
              name='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={updatePassword}
              className="login-input"
              />
          </div>
          <button type='submit' id="confirm-edit-flashcard" className='login-modal-btn'>Login</button>
          <div>
            {errors.map((error, ind) => (
              <div key={ind} style={{color:"red"}}>{error}</div>
              ))}
          </div>
        </form>
      </Popup>
    </div>
  );
};

export default LoginForm;
