import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from '../contexts/authContext';
import { Link } from "react-router-dom";
// import { Helmet } from 'react-helmet'
import projectStyles from '../style.module.css'
import styles from './login.module.css'

const LoginPage = props => {
    const context = useContext(AuthContext)
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const login = () => {
      context.authenticate(userName, password);      
    };
  
    // Set 'from' to path where browser is redirected after a successful login.
    // Either / or the protected path user tried to access.
    const { from } = props.location.state || { from: { pathname: "/" } };
  
    if (context.isAuthenticated === true) {
      return <Redirect to={from} />;
    }
    return (
      <div className={styles['container']}>
        <div className={styles['container1']}>
        <h1>TMDB Login</h1>
        {/* <p>You must log in to view the protected pages </p> */}
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
          id="username" 
          placeholder="username"
          className={` ${styles['Input']} ${projectStyles['input']} `}
          onChange={e => {
            setUserName(e.target.value);
          }}
        />
        {/* <input id="username" placeholder="user name" onChange={e => {
          setUserName(e.target.value);
        }}></input><br /> */}
        <span className={styles['text2']}>Password:</span>
        <input
          id="password"
          type="password"
          placeholder="password"
          className={` ${styles['textinput']} ${projectStyles['input']} `}
          onChange={e => {
            setPassword(e.target.value);
          }}
        />
        {/* <input id="password" type="password" placeholder="password" onChange={e => {
          setPassword(e.target.value);
        }}></input><br /> */}
        {/* Login web form  */}
        <button className={` ${styles['button']} ${projectStyles['button']} `} 
        onClick={login}>
          Login
        </button>
        {/* <button onClick={login}>Log in</button> */}
        <span className={styles['text3']}>
          Not Registered?
          <span
            dangerouslySetInnerHTML={{
              __html: ' ',
            }}
          />
        </span>
        {/* <p>Not Registered? */}
        {/* <Link to="/signup">Sign Up!</Link></p> */}
        <Link to="/signup" className={styles['navlink']}>
          Sign up!
          <span
            dangerouslySetInnerHTML={{
              __html: ' ',
            }}
          />
        </Link>
         </div>
        </div>
    );
  };
  
  export default LoginPage;





