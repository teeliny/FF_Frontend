'use client';
import { useEffect, useRef, useState } from 'react';
// import Image from 'next/image';
// import { envWithGift, envWithOutGift, tempGiftBucket } from '../utils';
import { Layout } from '../components';
import { useRouter } from 'next/navigation';

const StreamDemo = () => {
  const videoRef = useRef(null);
  const router = useRouter();
  // const [userEnv, setUserEnv] = useState<null | {url: string, duration: number}>(null);
  // const [userGift, setUserGift] = useState<null | string>(null);
  const [currTime, setCurrTime] = useState(0);

  const [startTime, setStartTime] = useState(0);

  const getTime = () => {
    const time = Date.now() - startTime;
    setCurrTime(Math.floor(time / 1000));
  };

  useEffect(() => {
    if (startTime) {
      const interval = setInterval(() => getTime(), 1000);
  
      return () => clearInterval(interval);
    }
  }, [startTime]);

  return (
    <Layout title="Marketing AR - Stream">
      <div className='reality-background h-full' style={{ backgroundImage: "url('/images/svg/reality-one.svg'), url('/images/svg/reality-three.svg'), url('/images/svg/reality-two.svg')" }}>
        <iframe 
          ref={videoRef}
          allow='camera;autoplay'
          src={'https://beertechafrica.8thwall.app/dialogue2'} 
          style={{ height: '100vh', width: '100vw'}}
          onLoad={() => {
            setStartTime(Date.now() + 4000);
          }}
        />

        {/* {currTime > 8 && (
          <div className='w-full absolute bottom-4 justify-center flex'>
            <button 
              style={{color: '#0A3085', backgroundColor: '#FFFF00'}} 
              className={`py-3 uppercase px-8 w-fit text-xl`} 
              // onClick={submitHandler}
            >
              great!
            </button>
          </div>
        )} */}
      </div>
    </Layout>
  )
}

export default StreamDemo