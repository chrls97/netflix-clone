import React, { useState } from 'react';
import './Login.css';
import  logo from '../../assets/logo.png';
import { login, signup } from '../../firebase'; // Import login and signup functions from firebase.js
import netflix_spinner from '../../assets/netflix_spinner.gif'; // Import spinner for loading state 

const Login = () => {

  const [signState, setSignState] = useState('Sign In');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // State to manage loading spinner

  const user_auth = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (signState === 'Sign In') {
     
      setLoading(true); // Set loading state to true
      await login(email, password); // Call login function
    } else {
      await signup(name, email, password); // Call signup function
    }
    setLoading(false); // Reset loading state after authentication
  }

  return (

    loading?<div className='loading'>
      <img src={netflix_spinner} alt="Loading..." />
    </div>:
  
    <div className='login'>
      <img src={logo} className='login-logo' />
      <div className="login-form">
        <h1>{signState}</h1>
        <form action="">
          {signState==='Sign Up'?
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Your Name'/>:<></>}
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email'/>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
          <button onClick={user_auth} type='submit' >{signState}</button>
          <div className='form-help'>
            <div className='remember'>
              <input type="checkbox" />
              <label htmlFor="">Remember Me</label>
            </div>
            <p> Need Help?</p>
          </div>
        </form>
        <div className='form-switch'>
          {signState==='Sign Up'?
            <p>Already have account? <span onClick={()=>setSignState('Sign In')}>Sign In Now</span></p>:
            <p>New to Netflix? <span onClick={()=>setSignState('Sign Up')}>Sign Up Now</span></p>
          }
        </div>
      </div>
    </div>
  )
}

export default Login
