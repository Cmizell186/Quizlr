import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import Popup from 'reactjs-popup';
import "./index.css"

// react mui imports
import TextField from '@mui/material/TextField';

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
            <TextField
              id="standard-password-input"
              label="Email"
              autoComplete="off"
              variant="standard"
              style={{width:"50%", marginLeft: "25%"}}
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div className='password-login-div'>
            <TextField
              id="standard-password-input"
              type="password"
              label="Password"
              name='password'
              autoComplete="off"
              variant="standard"
              style={{width:"50%", marginLeft: "25%"}}
              value={password}
              onChange={updatePassword}
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
