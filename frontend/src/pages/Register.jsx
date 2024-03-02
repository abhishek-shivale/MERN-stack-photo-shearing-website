import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import'../App.css'
function Register() {
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');
    const [update, setupdate] = useState('');
    const navigate = useNavigate();
    async function Registerfunction (){
        try {
            const res = await fetch(`http://54.204.107.36:3000/auth/register`,{
                method:'POST',
                headers:{
                   'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    username,
                    password
                })
            })
            const data = await res.json()
             setupdate(data.msg);
            navigate('/login')
        } catch (error) {
            console.error(error.message);
        }
    }
  return (
    <div className='text-white flex justify-center items-center'>
      <div className='relative top-28 text-xl'>
        <h1>Register</h1>
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
        <button className='m-5 bg-pink-600 pt-2 pb-2 pr-4 pl-4' onClick={Registerfunction}>
          Submit
        </button>
        <p>{update}</p>
      </div>
    </div>
  )
}

export default Register