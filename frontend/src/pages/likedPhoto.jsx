import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

function LikedPhoto() {
  const [cookie, setCookie] = useCookies(['access_token']);
  const [likephoto,setlikephoto] = useState([])

  useEffect(() => {
    const fetchLikedPhotos = async () => {
      try {
        const userID = window.localStorage.getItem('userId');
        const res = await fetch(`http://54.204.107.36:3000/photo/like/${userID}`, {
          method: 'GET',
          headers: {
            authorization: cookie.access_token,
          },
        });

        if (!res.ok) {
          throw new Error('Failed to fetch liked photos');
        }

        const data = await res.json();
        const set = data.likedphotos
        setlikephoto(set);
        console.log(set)
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchLikedPhotos();
  }, []);
  return (
    <div className='text-white'>
      <div className='flex justify-center'>
        <h1 className='text-3xl m-5 mb-20 font-bold'> Liked<span className='text-pink-500'> Image</span>  </h1>
      </div>
      <div className='flex justify-center'>
      <ul>
  {likephoto.map((photo) => (
    <li key={photo._id} className="mb-8">
      <div className="flex justify-center border-pink-500 border w-[680px] overflow-hidden"style={{ margin: '0', padding: '0' }}>
        <img src={photo.imageURL} alt="" className="h-64 w-96 object-cover mr-4" />
        <div className="text-white ">
          <p className="font-bold text-pink-600 mb-2 text-xl w-48">{photo.title}</p>
          <p className="mb-4 w-64 text-gray-400">{photo.caption}</p>
        </div>
      </div>
    </li>
  ))}
</ul>
      </div>
    </div>
  );
}

export default LikedPhoto;
