import React, { useEffect, useState } from 'react'
import AnimeImage from '../assets/anime.jpg'
import { useCookies } from 'react-cookie'

function Home() {
    const[photos,setPhotos] = useState([])
    const [cookie, setCookie] = useCookies(['access_token'])
    useEffect(
       ()=>{
        const fetchPhoto = async ()=>{
            const res = await fetch(`http://localhost:3000/photo`,{
                method: 'GET',
                headers:{
                    authorization: cookie.access_token
                }
            })
            const data = await res.json()
            console.log(data)
            setPhotos(data)
        }
        fetchPhoto()
       },[])
  return (
    <div className='text-white'>
        <div className='flex justify-center'><h1 className='text-3xl m-5 mb-20 font-bold'>Image Gallery </h1></div>
        <div className='flex justify-center'>
        <ul>
  {photos.map((photo) => (
    <li key={photo._id} className="mb-8">
      <div className="flex justify-center border-pink-500 border w-[680px] overflow-hidden"style={{ margin: '0', padding: '0' }}>
        <img src={photo.imageURL} alt="" className="h-64 w-96 object-cover mr-4" />
        <div className="text-white ">
          <p className="font-bold text-pink-600 mb-2 text-xl w-48">{photo.title}</p>
          <p className="mb-4 w-64 text-gray-400">{photo.caption}</p>
          <button className="bg-pink-700 py-2 px-4  rounded">Like</button>
        </div>
      </div>
    </li>
  ))}
</ul>

        </div>

    </div>
  )
}

export default Home

// function Imagestructure (){
//     return <>

//     </>
// }