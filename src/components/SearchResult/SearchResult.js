import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

const SearchResult = () => {
    const [searchResult, setSearchResult] = useState([]);
    const val = useParams();
    const searchValueBangla = val.searchValue;
    const searchValueEnglish = val.searchValue;
    const searchValueArabic = val.searchValue;



    const search = (url)=> {
        fetch(url)
        .then(res => res.json())
        .then(data => setSearchResult(data?.data.matches)) 
    }

    useEffect(() => {
        let url = `http://api.alquran.cloud/v1/search/${searchValueEnglish}/all/en.sahih`;
        search(url)
      },[searchValueEnglish]);

      useEffect(() => {
        let url = `http://api.alquran.cloud/v1/search/${searchValueBangla}/all/bn.bengali`;
        search(url)
      },[searchValueBangla]);

      useEffect(() => {
        let url = `http://api.alquran.cloud/v1/search/${searchValueArabic}/all/quran-simple`;
        search(url)
      },[searchValueArabic]);


      


    return (
        <div className='container'>
            <Header/>
            {searchResult ? 
            <div>
                <div className="row div-container-bg">
                    <div className=''>
                        {
                            searchResult.map(search => 
                            <p style={{whiteSpace: 'pre-line', textAlign:'right', fontWeight:'500', fontSize:'18px'}}>{search.surah.number}:{search.numberInSurah}<br/>{search.text}</p>
                            )
                        }
                    </div> 
                </div> 
                <Footer/>
            </div>
            :
            <div class="text-center">
                <div class="spinner-border loading-text-color" role="status"></div>
            </div>
            } 
        </div> 
    );
};

export default SearchResult;