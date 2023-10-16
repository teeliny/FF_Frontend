'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { envWithGift, envWithOutGift, tempGiftBucket } from '../utils';
import { Layout } from '../components';
import { useRouter } from 'next/navigation';

const Stream = () => {
  const videoRef = useRef(null);
  const router = useRouter();
  const [userEnv, setUserEnv] = useState<null | {url: string, duration: number}>(null);
  const [userGift, setUserGift] = useState<null | string>(null);
  const [currTime, setCurrTime] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const wishId = localStorage.getItem('wishId');
      const gift = localStorage.getItem('gift');
      if (!gift) setUserEnv(envWithOutGift[wishId]);
      else {
        setUserEnv(envWithGift[wishId]);
        setUserGift(tempGiftBucket[gift]);
      }
    }
  }, []);

  return (
    <Layout title="Marketing AR - Stream">
      <div className='reality-background h-full' style={{ backgroundImage: "url('/images/svg/reality-one.svg'), url('/images/svg/reality-three.svg'), url('/images/svg/reality-two.svg')" }}>
        {userEnv && (
          <video 
            ref={videoRef} 
            style={{ height: '100vh', width: '100vw'}} 
            src={userEnv.url}
            onTimeUpdate={(e) => {
              setCurrTime(e.currentTarget.currentTime ?? 0);
            }}
            onEnded={() => {
              console.log('ended');
              router.push('/landing');
              // localStorage.removeItem('wishId');
              // localStorage.removeItem('promo');
              // localStorage.removeItem('gift');
            }}
            controls={currTime < 2}
            autoPlay
            // muted
          >
          </video>
        )}

        {currTime >= 5.8 && currTime <= 10.7 && userGift && (
          <div className='absolute top-24 right-8'>
            <Image src={userGift} width={120} height={80} alt='' className='' />
          </div>
        )}
      </div>
    </Layout>
  )
}

export default Stream