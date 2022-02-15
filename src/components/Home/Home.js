import React, { useEffect, useState } from 'react';
import SurahList from '../SurahList/SurahList';


const Home = () => {
    const [surahList, setSurahList] = useState();

  useEffect(() => {
    const url = `http://api.alquran.cloud/v1/surah`;
    fetch(url)
    .then(res => res.json())
    .then(data => setSurahList(data))
  },[]);
    return (
        <div>
            {
                <SurahList surahList={surahList} />
            }
        </div>
    );
};

export default Home;