import React from 'react';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const [cookies, setCookie, removeCookie] = useCookies(['access_token']);
  const navigate = useNavigate();

  const logOut = () => {
    removeCookie('access_token'); 
    window.localStorage.clear();
    navigate('/login');
  };

  return (
    <div className='flex justify-between bg-black'>
      <div className='right text-3xl'>
        <p className='font-bold text-pink-600 mt-5 ml-8 mb-5 cursor-pointer '>
          <Link to="/">Instagram</Link>
        </p>
      </div>
      <div className='left'>
        <div className='flex gap-5 text-xl font-semibold text-pink-500 mt-5 mr-8'>
          <p className='cursor-pointer'>
            <Link to="/add-photo">Add Photo</Link>
          </p>
          <p className='cursor-pointer'>
                <Link to="liked-photo">Liked Photo</Link>
              </p>
         
          {!cookies.access_token ? (
            <>
            
              <p className='cursor-pointer'>
                <Link to='/login'>Login</Link>
              </p>
              <p className='cursor-pointer'>
                <Link to='/register'>Register</Link>
              </p>
            </>
          ) : (
            <button
              className='bg-pink-500 pt-1 pb-1 pl-4 pr-4 text-white'
              onClick={logOut}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
