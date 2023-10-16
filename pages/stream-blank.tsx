'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { envWithGift, envWithOutGift, tempGiftBucket } from '../utils';
import { Layout } from '../components';
import { useRouter } from 'next/navigation';

const StreamBlank = () => {
  const videoRef = useRef(null);
  const router = useRouter();
  const [userEnv, setUserEnv] = useState<null | {url: string, duration: number}>(null);
  const [currTime, setCurrTime] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const wishId = localStorage.getItem('wishId');
      const gift = localStorage.getItem('gift');
      if (!gift) setUserEnv(envWithOutGift[wishId]);
      else {
        setUserEnv(envWithGift[wishId]);
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
            src={'https://res.cloudinary.com/teeliny/video/upload/v1697479393/Flying%20Fish%20AR/demo/Dialogue_2_smoke_ifctxh.mp4'}
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

        {currTime > 0 && currTime <= 8 && (
          <div className='absolute -translate-x-1/2 left-1/2 top-1/2 -translate-y-1/4 w-full'>
            <div className='relative w-full'>
              <Image src='/images/svg/conclude/callout-frame.svg' alt='' width={12} height={12} style={{width: '80%', margin: '0 auto'}}/>
              <p className='absolute -translate-x-1/2 left-1/2 top-1/2 -translate-y-1/2 italic text-white text-center' style={{width: '70%', margin: '0 auto'}}>Thanks for your wish, I&#39;ll let you know if it&#39;s granted! And if you have another Flying Wish, get another Flying Fish and enter again!</p>
            </div>
          </div>
        )}
        {currTime > 8 && currTime <= 10.8 && (
          <div className='absolute -translate-x-1/2 left-1/2 top-1/2 -translate-y-1/4 w-full'>
            <Image src='/images/svg/conclude/callout-fly.svg' alt='' width={12} height={12} style={{width: '80%', margin: '0 auto'}}/>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default StreamBlank