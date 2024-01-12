import React from 'react'
import AnimeImage from '../assets/anime.jpg'

function Home() {
    function Imagestructure (){
        return <>
        <div className='border border-white p-10'>
            <div className='ml-40 mr-40'>
                <img src={AnimeImage} alt="" className='scale-75'/>
            </div>
            <div className='ml-40 -mt-9 text-white text-xl flex gap-5 mb-5'>
                <p className=' ml-32'>Naruto And Sasuke</p><p>-</p>
                <p className=''>Naruto And Sasuke</p>
                <button className='bg-red-500 pt-1 pb-1 pl-4 pr-4'>Like</button>
            </div>

        </div>
        </>
    }
  return (
    <div>
        <Imagestructure />
    </div>
  )
}

export default Home