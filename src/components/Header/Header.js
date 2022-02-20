import React, { useState } from 'react';
import logo from '../../logo.png';
import './Header.css';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const Header = () => {
    const [searchValue, setSearchValue] = useState();
    
    const history = useHistory();
    const handleClick = (e)=> {
        e.preventDefault();
        if(searchValue){
        setSearchValue(searchValue);
        history.push(`/search/${searchValue}`)
        }
      }

      const handleKeyPress = (e)=> {
        if(e.key === 'Enter'){
            if(searchValue){
                setSearchValue(searchValue);
                history.push(`/search/${searchValue}`)
            }
        } 
      }
    return (
        <>
        <div className='header'>
            <Link to='/'>
                <img src={logo}  className="img" alt="" />
            </Link>
            <div className='input-box'>
                <input type="text" className='input-field' onKeyPress={handleKeyPress}  onChange={e => setSearchValue(e.target.value)}  placeholder='Search with text' /><span className='search-btn' onClick={handleClick} onKeyPress={handleClick}><FaSearch/></span>
            </div>
        </div>
        <p className='text-center'><a href="https://drive.google.com/file/d/1C4bf8d5y4AymizNkjJk70McX8CtWLrci/view?usp=sharing" target="_blank" style={{color:'blue', textDecoration:'none'}}>Download</a> android APK</p>
        </>
    );
};

export default Header;