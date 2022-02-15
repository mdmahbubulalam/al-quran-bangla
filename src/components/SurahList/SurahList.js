import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Surah from '../Surah/Surah';
import './SurahList.css';

const SurahList = (props) => {
    const surahList = props.surahList;
      const history = useHistory();

      const handleClick=(surahNumber)=>{
        history.push(`/surah/${surahNumber}`)
      }

    //   const handleKeyPress = (e)=> {
    //     if(e.key === 'Enter'){
    //       if(searchValue){
    //         setSearchValue(searchValue);
    //         history.push(`/searchList/q=${searchValue}`);
    //       }
    //     } 
    //   }
       
    return (
        <div className='container'>

            <Header/>
            {surahList ?
            <div>
                <div className="row div-container-bg">
                    
                {
                    surahList?.data.map(list => 
                        
                        <div className='col-lg-2 col-md-2 col-12 card-container'>
                            <div className='single-card' onClick={()=> handleClick(list.number) }>
                                <div className='list-number'>
                                    <div className='circle-text'>
                                    <p >{list.number}</p>
                                    </div>
                                    
                                    <p className='revelation-type-text'>{list.revelationType}</p>
                                </div>
                                <div className='list-text'>
                                    <p className='name-text'>{list.name}</p>
                                    <p className='english-text'>{list.englishName}</p>
                                    <p className='translation-text'>{list.englishNameTranslation}</p>
                            </div>         
                            </div>
                        </div>
                        
                        
                        )
                }
                </div>  
                <Footer/>
           </div>
            :
            <div class="text-center">
                <div class="spinner-border loading-text-color" role="status">
                    
                </div>
            </div>
            }
        </div>
    );
};

export default SurahList;