'use client';
import { useEffect, useRef, useState } from 'react';
// import Image from 'next/image';
// import { envWithGift, envWithOutGift, tempGiftBucket } from '../utils';
import { useRouter } from 'next/navigation';
import { Layout } from '../components';

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
      <div className='h-full reality-background' style={{ backgroundColor: "#000000" }}>
        <iframe 
          ref={videoRef}
          allow='camera;gyroscope;accelerometer;magnetometer;xr-spatial-tracking;microphone;'
          src={'https://beertechafrica.8thwall.app/dialogue2'} 
          style={{ height: '100vh', width: '100vw'}}
          onLoad={() => {
            setStartTime(Date.now() + 4000);
          }}
        />

        {/* {currTime > 8 && (
          <div className='absolute flex justify-center w-full bottom-4'>
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