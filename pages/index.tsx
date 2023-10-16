'use client';
import { Fragment, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Switch from "react-switch";
import Draggable from 'react-draggable';
import { Layout } from '../components';
import Link from 'next/link';

const IndexPage = () => {
  const router = useRouter();
  const dragRef = useRef(null);
  const childRef = useRef(null);
  const [withinLimit, setWithinLimit] = useState(false);
  const [belowLimit, setBelowLimit] = useState(false);
  const [frame, setFrame] = useState({left: 0, right: 0});
  const [dragPosition, setDragPosition] = useState({x: 0, y: 0});

  const handleSwitchChange = () => {
    setWithinLimit(!withinLimit);
    setDragPosition({x: frame.right, y: 0});
  }
  const handleBelowLimit = () => {
    localStorage.setItem('gate', '0');
    setBelowLimit(true);
  }

  const handleStopDrag = () => {
    const minWidth = frame.right * 0.75;
    const currXPosition = childRef.current.state.x;
    if (currXPosition < minWidth) {
      setDragPosition({x: 0, y: 0});
      setWithinLimit(false);
    } else {
      setDragPosition({x: frame.right, y: 0});
      setWithinLimit(true);
    }
  }

  useEffect(() => {
    if (withinLimit) {
      localStorage.setItem('gate', '1');
      setTimeout(() => {
        router.push('/landing');
      }, 1000);
    }
  }, [withinLimit]);

  // Set the region that the drag button should cover
  useEffect(() => {
    const { left, right } = dragRef.current?.getBoundingClientRect() || {};
    setFrame({left: 0, right: right - left - 61});
  }, []);

  return (
    <Layout title="Marketing AR">
      <div className='background' style={{ backgroundImage: "url('/images/png/background.png')" }}>
        <div className='wrapper'>
          <div className='relative w-full'>
            <Image src="/images/svg/smoke.svg" width={10} height={8} alt='smoke' className='w-full' />
            <Image src="/images/svg/logo.svg" width={10} height={8} alt='logo' className='absolute -translate-x-1/2 -translate-y-1/2 w-fit top-1/2 left-1/2' />
          </div>
          <div className='flex flex-col items-center w-full px-8 mb-20'>
            <h2 className='mx-8 text-2xl font-bold text-center text-yellow-300 uppercase'>{belowLimit ? 'You must be of legal drinking age to enter this experience' : "Slide if you're 18 years or over"}</h2>
            {!belowLimit && (
              <Fragment>
                <div className='relative w-full h-16 mt-8 mb-6'>
                  <div
                    ref={dragRef}
                    style={{ background: 'rgba(10, 48, 133, 0.5)', borderRadius: '40px'}}
                    className='relative w-full h-full bg-red-300 flex items-center justify-center cursor-pointer'
                  >
                    <input
                      type="checkbox"
                      id="toggle"
                      checked={withinLimit}
                      onChange={handleSwitchChange}
                      className='hidden'
                    />
                    <label htmlFor="toggle" className="text-xl font-medium text-yellow-300 w-full text-center">{withinLimit ? "I'm 18 years +" : 'Slide here'}</label>
                  </div>

                  <div 
                    style={{
                      position:'absolute', 
                      top: '50%', transform: 'translateY(-50%)',
                      left: '0',
                    }} 
                    className='px-2 flex justify-center items-center'
                  >
                    <Draggable axis='x' bounds={frame} ref={childRef} onStop={handleStopDrag} position={dragPosition}>
                      <div 
                        style={{backgroundColor: 'rgba(10, 48, 133, 1)', width: '45px', height: '45px', borderRadius: '50%', marginRight: 'auto'}}
                        className='flex items-center justify-center' 
                      >
                        <Image 
                          src={withinLimit ? '/images/svg/mark.svg' : '/images/svg/right-arrow.svg'} 
                          alt='' 
                          width={25} 
                          height={25} 
                        />
                      </div>
                    </Draggable>
                  </div>
                </div>
                <p 
                  className='font-bold text-white underline cursor-pointer' 
                  onClick={handleBelowLimit}
                >
                  Tap here if you&#39;re under 18
                </p>
              </Fragment>
            )}
          </div>

          <div className='absolute bottom-0 w-full px-8 mb-6'>
            <p className='text-center text-xs leading-relaxed' style={{color: '#0A3085'}}>
              By continuing on this site, you agree to our <Link className='font-bold cursor-pointer' href='/terms'>Terms of Service</Link> and <Link className='font-bold cursor-pointer' href='/privacy'>Privacy Policy</Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage
