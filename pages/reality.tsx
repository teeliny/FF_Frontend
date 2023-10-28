import { Fragment, MouseEvent, SyntheticEvent, useRef, useState } from 'react';
import Image from 'next/image';
// import { Swiper, SwiperSlide } from 'swiper/react';
import { Layout, Modal, DetailsForm } from '../components';
import { realityList } from '../utils';
import 'swiper/css/bundle';
import 'swiper/css/scrollbar';

const RealityPage = () => {
  const frameRef = useRef<HTMLVideoElement | null>(null);
  const [currTime, setCurrTime] = useState(0);
  
  const [currSlide, setCurrSlide] = useState<string | null>(null);
  const [submitWishModal, setSubmitWishModal] = useState(false);

  const slideChangeHandler = (id: string) => {
    setCurrSlide(id);
  };
  
  const closeSubmitWish = () => setSubmitWishModal(false);
  const submitWishHandler = (e: MouseEvent) => {
    e.preventDefault();
    if (currSlide) setSubmitWishModal(true);
    console.log({ currSlide })
  };
  
  return (
    <Layout title="Marketing AR - Reality">
      <Fragment>
        <div className='reality-background' style={currTime >= 15 ? { backgroundImage: "url('/images/svg/reality-one.svg'), url('/images/svg/reality-three.svg'), url('/images/svg/reality-two.svg')" } : {background: '#000000'}}>
          <div className='relative w-full'>
            <video 
              ref={frameRef} 
              // style={{ height: '100vh', width: '100vw'}} 
              style={{ height: `${currTime < 15 ? '100vh' : '65vh'}`, width: '100vw'}}
              src='https://res.cloudinary.com/teeliny/video/upload/v1697479380/Flying%20Fish%20AR/demo/Dialogue_1_smoke_mjnmlr.mp4'
              // src='https://player.vimeo.com/external/250688977.sd.mp4?s=d14b1f1a971dde13c79d6e436b88a6a928dfe26b&profile_id=165'
              // onPlaying={(e) => {
              //   console.log(e.currentTarget.muted, 'onplaying')
              // }}
              onTimeUpdate={(e) => {
                setCurrTime(e.currentTarget.currentTime ?? 0);
              }}
              controls={currTime < 2}
              autoPlay
              // playsInline
              // muted
            >
            </video>
            <div className='w-full'>
              {currTime >= 5 && (
                <div className='absolute -translate-x-1/2 left-1/2 top-1/2 -translate-y-1/4'>
                  <Image src="/images/svg/callout.svg" width={10} height={8} alt='callout' className='w-full' />
                </div>
              )}
              {currTime >= 12 && (
                <div className={`absolute bottom-0 w-full -translate-x-1/2 left-1/2`}>
                  <p className='text-xl font-bold text-center text-yellow-300'>MAKE YOUR</p>
                  <p className='my-1 text-xl font-black text-center text-yellow-300'>WHAT THE FLYING WISH!</p>
                  {currTime >= 15 && (<p className='text-xl font-bold text-center text-yellow-300'>CHOOSE ONE OPTION BELOW</p>)}
                </div>
              )}
            </div>
          </div>

          {currTime >= 15 && (
            <div className='flex flex-col mx-6 mt-6 mb-4'>
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
                onClick={submitWishHandler} disabled={+currSlide < 1}>make my wish</button>
            </div>
          )}
        </div>
        {submitWishModal && currSlide && (
          <Modal close={closeSubmitWish}>
            <DetailsForm wish_id={currSlide} />
          </Modal>
        )}
      </Fragment>
    </Layout>
  )
}

export default RealityPage