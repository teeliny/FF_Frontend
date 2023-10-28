'use client';
import { Fragment, MouseEvent, useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { localArUrl, realityList } from '../utils';
import Modal from './Modal';
import DetailsForm from './DetailsForm';

export const Experience = () => {
  const router = useRouter();
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [launch, setLaunch] = useState(false);
  const [currSlide, setCurrSlide] = useState<string | null>(null);
  const [submitWishModal, setSubmitWishModal] = useState(false);
  const [realityMode, setRealityMode] = useState(true);
  const [showGift, setShowGift] = useState(false);

  const slideChangeHandler = (id: string) => {
    setCurrSlide(id);
  };
  const closeSubmitWish = () => setSubmitWishModal(false);

  const backToReality = () => {
    setSubmitWishModal(false);
    setRealityMode(true);
  }
  
  const submitWishHandler = (e: MouseEvent) => {
    e.preventDefault();
    if (currSlide) setSubmitWishModal(true);
    console.log({ currSlide })
  };

  useEffect(() => {
    setTimeout(() => {
      setLaunch(true);
    }, 4000);
  }, []);

  useEffect(() => {
    window.addEventListener('message', (event) => {
      const arBaseUrl = process.env.NEXT_PUBLIC_AR_BASE_URL || localArUrl;
      console.log(event);
      if (event.origin !== arBaseUrl) return;
      if (event.data === 'showForm') {
        setRealityMode(false);
        return;
      }
      if (event.data === 'showGift') {
        setShowGift(true);
        return;
      }
      if (event.data === 'hideGift') {
        setShowGift(false);
        return;
      }
      if (event.data === 'dialogueEnd') {
        router.push('/landing');
      }
    });
  }, []);

  return (
    <div>
      {!launch && (
        <div className='w-full h-full px-5' style={{ paddingTop: '1.5rem'}}>
          <p className='px-12 mb-10 text-xl font-semibold leading-normal text-center text-white'>Move the bottle into position, swipe to rub the label & release your genie!</p>
          <div style={{width: '100%', height: '60%', position: 'relative'}}>
            <Image 
              className='mx-auto' 
              src='/images/svg/bottle.svg' 
              alt=''
              layout='fill'
              objectFit='contain'
            />  
          </div>
        </div>
      )}

      <div className={`w-full relative ${launch ? 'h-full visible' : 'h-0 invisible overflow-hidden'}`}>
        <div 
          className='reality-background' 
          // style={{background: '#000000'}}
        >
          <div className='w-full'>
            <iframe
              ref={frameRef}
              id='frame'
              src='https://beertechafrica.8thwall.app/flying-fish/'
              allow='camera;gyroscope;accelerometer;magnetometer;xr-spatial-tracking;microphone'
              style={{ height: '100vh', width: '100vw'}}
              onLoad={(e) => console.log('AR launch successfully')}
            />
          </div>

          {!realityMode && !submitWishModal && (
            <Fragment>
              <div className='fixed top-0 left-0 w-full h-full' style={{background: "linear-gradient(180deg, rgba(10, 48, 133, 0.00) 31.56%, #0A3085 75.26%)"}}></div>
              <div className='fixed bottom-0 left-0 flex flex-col w-full pb-4 mt-6'>
                <div className='w-full' style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 200px)', overflow: 'scroll' }}>
                  {realityList.map((wish) => (
                      <div key={wish.id} style={{width: '200px'}} className='!mr-0 !flex flex-col gap-2 items-center' onClick={() => slideChangeHandler(wish.id)}>
                        <Image src={wish.img} width={10} height={8} alt={`wish-${wish.id}`} style={{width: '200px'}} className={`w-48 max-h-28 ${currSlide === wish.id ? 'border-2 border-yellow-300' : ''}`} />
                        <p className='mx-2 text-sm font-semibold text-center text-white'>{wish.description}</p>
                      </div>
                    ))}
                </div>
                <button
                  style={{color: +currSlide >= 1 ? '#0A3085' : '#1A191999', backgroundColor: +currSlide >= 1 ? '#FFFF00' : '#636463'}}
                  className={`self-center py-3 mt-4 uppercase px-14 w-fit`} 
                  onClick={submitWishHandler} 
                  disabled={+currSlide < 1}
                >
                  make my wish
                </button>
              </div>
            </Fragment>
          )}
        </div>

        {submitWishModal && currSlide && (
          <Modal close={closeSubmitWish}>
            <DetailsForm wish_id={currSlide} close={backToReality} experienceFrame={frameRef.current} />
          </Modal>
        )}
      </div>
    </div>
  )
}

export default Experience;