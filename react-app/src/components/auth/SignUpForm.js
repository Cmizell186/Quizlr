import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import Popup from 'reactjs-popup';
import "./index.css";

// react mui imports
import TextField from '@mui/material/TextField';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  // for popup modal
  const [open, setOpen] = useState(false);

  const onSignUp = async (e) => {
    e.preventDefault();

      const data = await dispatch(signUp(username, email, password, repeatPassword));
      if (Array.isArray(data)) {
        setErrors(data)
      } else {
        setErrors([]);
        setUsername("");
        setEmail("");
        setPassword("");
        setRepeatPassword("");
        setOpen();
      }
  };

  const openModal = () => setOpen(!open);

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div>
      <a onClick={openModal} className="login-modal-open-thing">Sign Up</a>
      <Popup open={open} modal>
        <p style={{color:"black"}} className="login-modal-label">Sign Up</p>
        <form onSubmit={onSignUp}>
          <div className='email-login-div'>
            {/* <label style={{color:"#FFCD1F"}} className="login-modal-label">User Name</label> */}
            {/* <input
              type='text'
              name='username'
              onChange={updateUsername}
              value={username}
              className="login-input"
              ></input> */}
            <TextField
              name='username'
              id="standard-password-input"
              label="User Name"
              autoComplete="off"
              variant="standard"
              style={{width:"50%", marginLeft: "25%"}}
              value={username}
              onChange={updateUsername}
            />
          </div>
          <div className='email-login-div'>
            {/* <label style={{color:"#FFCD1F"}} className="login-modal-label">Email</label>
            <input
              type='text'
              name='email'
              onChange={updateEmail}
              value={email}
              className="login-input"
              ></input> */}
            <TextField
              name='email'
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
            {/* <label style={{color:"#FFCD1F"}} className="login-modal-label">Password</label>
            <input
              type='password'
              name='password'
              onChange={updatePassword}
              value={password}
              className="login-input"
              ></input> */}
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
          <div className='password-login-div'>
            {/* <label style={{color:"#FFCD1F"}} className="login-modal-label">Repeat Password</label>
            <input
              type='password'
              name='repeat_password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
              className="login-input"
              ></input> */}
            <TextField
              id="standard-password-input"
              type="password"
              label="Repeat Password"
              name='repeat_password'
              autoComplete="off"
              variant="standard"
              style={{width:"50%", marginLeft: "25%"}}
              value={repeatPassword}
              onChange={updateRepeatPassword}
            />
          </div>
          <button type='submit' id="confirm-edit-flashcard" className='login-modal-btn'>Sign Up</button>
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

export default SignUpForm;
