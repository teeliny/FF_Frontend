'use client';
import { MouseEvent, useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { realityList } from '../utils';

export const Experience = () => {
  const realityRef = useRef<HTMLDivElement>(null);
  const [currSlide, setCurrSlide] = useState<string | null>(null);
  const [disableNav, setDisableNav] = useState({
    prev: true,
    next: false,
  })

  const slideChangeHandler = (id: string) => {
    setCurrSlide(id);
  };
  
  const submitWishHandler = (e: MouseEvent) => {
    e.preventDefault();
    // if (currSlide) setSubmitWishModal(true);
    console.log({ currSlide })
  };

  const nextBtnHandler = () => {
    if (realityRef.current) {
      const {scrollLeft}  = realityRef.current || {scrollWidth: 0, scrollLeft: 0, clientWidth: 0};
      if (scrollLeft < 425) {
        const nextValue = (Math.floor(scrollLeft / 200) + 1) * 200;
        realityRef.current.scrollLeft = nextValue > 400 ? 425 : nextValue;
      }
    }
  }
  const prevBtnHandler = () => {
    if (realityRef.current) {
      const {scrollLeft}  = realityRef.current || {scrollWidth: 0, scrollLeft: 0, clientWidth: 0};
      if (scrollLeft > 0) {
        const nextValue = (Math.ceil(scrollLeft / 200) - 1) * 200;
        realityRef.current.scrollLeft = nextValue < 200 ? 0 : nextValue;
      }
    }
  }

  useEffect(() => {
    realityRef.current?.addEventListener("scroll", () => {
      const {scrollWidth, scrollLeft, clientWidth}  = realityRef.current || {scrollWidth: 0, scrollLeft: 0, clientWidth: 0};
      const scroll = scrollWidth - scrollLeft - clientWidth;
      console.log({scrollWidth, scrollLeft, clientWidth});
      setDisableNav({
        prev: scroll === 800 - window.innerWidth,
        next: scroll === 0
      });
    });
  }, []);

  return (
    <div>

      <div className={`w-full relative h-full visible`}>
        <div className='reality-background'>
            <div className='fixed top-0 left-0 w-full h-full' style={{background: "linear-gradient(180deg, rgba(10, 48, 133, 0.00) 31.56%, #0A3085 75.26%)"}}></div>
            <div className='fixed bottom-0 left-0 flex flex-col w-full pb-4 mt-6'>
              <div ref={realityRef} className='relative w-full' style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 200px)', overflow: 'scroll' }}>
                {realityList.map((wish) => (
                    <div key={wish.id} style={{width: '200px'}} className='!mr-0 !flex flex-col gap-2 items-center' onClick={() => slideChangeHandler(wish.id)}>
                      <Image src={wish.img} width={180} height={8} alt={`wish-${wish.id}`} style={{width: '200px'}} className={`w-48 max-h-28 ${currSlide === wish.id ? 'border-2 border-yellow-300' : ''}`} />
                      <p className='mx-2 text-sm font-semibold text-center text-white'>{wish.description}</p>
                    </div>
                  ))}
                  <button onClick={!disableNav.prev ? prevBtnHandler : undefined} className={`fixed flex items-center justify-center mt-12 left-2 ${!disableNav.prev ? 'opacity-100 cursor-pointer' : ' opacity-40 cursor-none'}`}>
                    <Image src='/images/svg/nav-backward.svg' alt='' width={36} height={36} />
                  </button>
                  <button onClick={!disableNav.next ? nextBtnHandler : undefined} className={`fixed flex items-center justify-center mt-12 right-2 ${!disableNav.next ? 'opacity-100 cursor-pointer' : ' opacity-40 cursor-none'}`}>
                    <Image src='/images/svg/nav-forward.svg' alt='' width={36} height={36} />
                  </button>
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
        </div>
      </div>
    </div>
  )
}

export default Experience;