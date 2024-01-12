import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'

function AddPhoto() {
  const [title, settitle] = useState('');
  const [caption, setcaption] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [cookie, setCookie] = useCookies(['access_token']);
  const navigate = useNavigate();
  
  async function addImage() {
    if(caption.length == 50 || caption.length > 50){
      alert('caption length must be less that 50 character')
      return
    }
    try {
      const res = await fetch('http://localhost:3000/photo/add-photo', {
        method: 'POST',
        headers: {
          authorization: cookie.access_token,
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify({
          title,
          caption,
          imageURL,
        }),
      });
  
      const data = await res.json();
      alert(data.msg);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  }
  

  return (
    <div className='flex justify-center items-center'>
      <div className='text-xl text-white relative top-32 inline-block'>
      <h1 className='m-5'>Add Image</h1>
        <label htmlFor='title' className='m-8'>
          title :
        </label>
        <input
          type='text'
          id='title'
          name='title'
           className='mt-4'
          onChange={(e) => settitle(e.target.value)}
          value={title}
        /><br></br>
       <label htmlFor='caption' className='m-4'>
          caption :
        </label>
        <input
          type='text'
          id='caption'
          name='caption'
           className='mt-4'
          onChange={(e) => setcaption(e.target.value)}
          value={caption}
        /><br></br>
        <label htmlFor='ImageURL' className=''>
          ImageURL :
        </label>
        <input
          type='text'
          id='imageURL'
          name='imageURL'
          className='m-4'
          onChange={(e) => setImageURL(e.target.value)}
          value={imageURL}
        /><br></br>
        <button className='bg-pink-500 pt-1 pb-1 pl-4 pr-4 m-5'onClick={addImage}>Add Image</button>
      </div>
    </div>
  )
}

export default AddPhoto