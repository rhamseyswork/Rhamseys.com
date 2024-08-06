import { FaFacebookSquare, FaInstagramSquare, FaYoutubeSquare, FaSpotify } from 'react-icons/fa'
import { FaSquareXTwitter } from "react-icons/fa6";
import { SiApplemusic } from 'react-icons/si';
import { Link } from 'react-router-dom';
import './Links.css'

const Links = () => {
  return (
    <>
      <span className='links-container'>
        <Link to='https://www.Facebook.com' className='link' target="_blank" rel="noopener noreferrer">
          <FaFacebookSquare className='icon' />
        </Link>
        <Link to='https://www.Twitter.com' className='link' target="_blank" rel="noopener noreferrer">
          <FaSquareXTwitter className='icon' />
        </Link>
        <Link to='https://www.Instagram.com' className='link' target="_blank" rel="noopener noreferrer">
          <FaInstagramSquare className='icon' />
        </Link>
        <Link to='https://www.Youtube.com' className='link' target="_blank" rel="noopener noreferrer">
          <FaYoutubeSquare className='icon' />
        </Link>
        <Link to='https://www.music.apple.com' className='link' target="_blank" rel="noopener noreferrer">
          <SiApplemusic className='icon' />
        </Link>
        <Link to='https://www.Spotify.com' className='link' target="_blank" rel="noopener noreferrer">
          <FaSpotify className='icon' />
        </Link>
      </span>
    </>
  );
};

export default Links;