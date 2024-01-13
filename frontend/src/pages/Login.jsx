import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Login() {
  const [_, setCookies] = useCookies(['access_token']);
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [update, setupdate] = useState('');
  const navigate = useNavigate();

  async function loginfunction() {
    try {
      const res = await fetch(`http://localhost:3000/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await res.json();
      setCookies('access_token', data.token);
      window.localStorage.setItem('userId', data.userID);
      setusername('')
      setpassword('')
     
      setupdate(data.msg);
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error.message);
      setupdate('Login failed. Please try again.');
    }
  }

  return (
    <div className='text-white flex justify-center items-center'>
      <div className='relative top-28 text-xl'>
        <h1>Login</h1>
        <label htmlFor='username' className='m-2'>
          Username :
        </label>
        <input
          type='text'
          id='username'
          name='username'
          className='m-2'
          onChange={(e) => setusername(e.target.value)}
          value={username}
        />
        <br />
        <label htmlFor='password' className='m-2'>
          Password :
        </label>
        <input
          type='password'
          id='password'
          name='password'
          className='m-2'
          onChange={(e) => setpassword(e.target.value)}
          value={password}
        />
        <br />
        <button className='m-5 bg-pink-600 pt-2 pb-2 pr-4 pl-4' onClick={loginfunction}>
          Submit
        </button>
        <p>{update}</p>
      </div>
    </div>
  );
}

export default Login;
