import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Header/Header';
import './Surah.css'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import Footer from '../Footer/Footer';

const Surah = () => {
    const val = useParams();
    const surahNumber = val.surahNumber;
    const [surah, setSurah] = useState();
    const [isBismillahInclude, setIsBismillahInclude] =useState(false);
    const [isBismillahIncludeBangla, setIsBismillahIncludeBangla] =useState(false);
    const [surahAudio, setSurahAudio] =useState();


    const [surahData, setSurahData] = useState();


    
    useEffect(() => {
        const url = `http://api.alquran.cloud/v1/surah/${surahNumber}/editions/quran-simple,bn.bengali,en.sahih`;
        fetch(url)
        .then(res => res.json())
        .then(data => {
            const surahData= data.data;
            const arabic= data.data[0].ayahs;
            const bengali= data.data[1].ayahs;
            const english = data.data[2].ayahs;
            const a ='بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ';
            const b = 'শুরু করছি আল্লাহর নামে যিনি পরম করুণাময়, অতি দয়ালু।';
            const e = 'In the name of Allah, the Entirely Merciful, the Especially Merciful.';
         
            
       let text = arabic.map(function(itm,i){
                let number = surahNumber+':'+itm.numberInSurah;
                let arabi = itm.text ;
                let bangla = bengali[i].text;
                let englishLang = english[i].text;
                arabi.includes(a) && setIsBismillahInclude(true) 
                bangla.includes(b) && setIsBismillahIncludeBangla(true) 

                return [

                    (  
                    !bangla.includes(b)?
                    number.replace('1:1','')
                    :  number
                    )
                    +'\n'+  
                    ( 
                    !bangla.includes(b)?   
                    arabi.replace(a,'')
                    : arabi
                    )
                    +'\n'+
                    (
                    !bangla.includes(b)?
                    bangla.replace(b,'')
                    : bangla
                    )
                    +'\n'+
                    (
                    !bangla.includes(b)?
                    englishLang.replace(e,'')
                    : englishLang
                    )

            ]                
                
           }).join('\n\n')

           setSurah(text)
           setSurahData(surahData[0]);
        
        }) 
        
      },[surahNumber]);

      useEffect(() => {
        const url = `https://api.quran.com/api/v4/chapter_recitations/7/${surahNumber}`;
        fetch(url)
        .then(res => res.json())
        .then(data => setSurahAudio(data.audio_file)) 
        
      },[surahNumber]);

      
    return (
        <>
        {
                surah &&
        <div className='sticky-top'>
            <AudioPlayer
            style={{backgroundColor: '#DAE3E7', color:'white'}}
            src={surahAudio?.audio_url}
            showJumpControls={false}
            layout="horizontal-reverse"
            customAdditionalControls={[]}
            />
        </div>

        } 
        <div className='container'>
            
            <Header/>
            {surah ? 
            <div>
            <div className="row div-container-bg">
                <div className='surah-data'>
                    <span>{surahData?.number} </span>
                    <span> Surah {surahData?.englishName} - {surahData?.englishNameTranslation} </span> 
                    <span>(Revelation Place : {surahData?.revelationType}, Ayah {surahData?.numberOfAyahs})</span>
                    <span> </span>

                </div>
                {
                (isBismillahInclude && !isBismillahIncludeBangla) &&
                <div className='text'>
                    <span className='text-one'>بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</span><br />
                    <span className='text-two'>শুরু করছি আল্লাহর নামে যিনি পরম করুণাময়, অতি দয়ালু।</span><br />
                    <span className='text-three'>In the name of Allah, the Entirely Merciful, the Especially Merciful.</span><br />
                </div>
                }
                
                
                <div className='fill-space'>
                    <div className='surah'>{surah}</div>
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
        
        </>
    );
};

export default Surah;