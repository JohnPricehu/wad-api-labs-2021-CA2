import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from '../contexts/authContext';
import projectStyles from '../style.module.css'
import styles from './signup.module.css'

const SignUpPage = props => {
  const context = useContext(AuthContext)
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [registered, setRegistered] = useState(false);

  const register = () => {
    if (password.length > 0 && password === passwordAgain) {
      context.register(userName, password);
      setRegistered(true);
    }
  }

  const { from } = props.location.state || { from: { pathname: "/" } };

  if (registered === true) {
    return <Redirect to="./login" />;
  }

  return (
    
    <div className={styles['container']}>
      <div className={styles['container1']}>
      <h2>SignUp page</h2>
      {/* <p>You must register a username and password to log in </p> */}
      <span className={styles['text1']}>
          Username:
          <span
            dangerouslySetInnerHTML={{
              __html: ' ',
            }}
          />
        </span>
      <input
          type="text"
          value={userName} 
          placeholder="username"
          className={` ${styles['Input']} ${projectStyles['input']} `}
          onChange={e => {
            setUserName(e.target.value);
          }}
        />
      {/* <input value={userName} placeholder="user name" onChange={e => {
        setUserName(e.target.value);
      }}></input><br /> */}
      <span className={styles['text2']}>Password:</span>
      <input
          value={password}
          type="password" 
          placeholder="password"
          className={` ${styles['textinput']} ${projectStyles['input']} `}
          onChange={e => {
            setPassword(e.target.value);
          }}
        />
      {/* <input value={password} type="password" placeholder="password" onChange={e => {
        setPassword(e.target.value);
      }}></input><br /> */}
      <span className={styles['text3']}>Confirm Password:</span>
      <input
          value={passwordAgain} 
          type="password" 
          placeholder="password again"
          className={` ${styles['textinput1']} ${projectStyles['input']} `}
          onChange={e => {
            setPasswordAgain(e.target.value);
          }}
        />
      {/* <input value={passwordAgain} type="password" placeholder="password again" onChange={e => {
        setPasswordAgain(e.target.value);
      }}></input><br /> */}
      {/* Login web form  */}
      <button className={` ${styles['button']} ${projectStyles['button']} `}
      onClick={register}>
          Sign Up
        </button>
      {/* <button onClick={register}>Register</button> */}
      </div>
      </div>
  );
};

export default SignUpPage;

