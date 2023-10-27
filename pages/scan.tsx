'use client';
import React, { Fragment, useMemo, useState } from 'react';
import Image from 'next/image';
import { Experience, Layout } from '../components';

const ScanPage = () => {
  const [showReady, setShowReady] = useState(true);
  const handleBtnClick = () => {
    setShowReady(false);
  };

  return (
    <Layout title="Marketing AR - Scan">
      <Fragment>
      <div className='relative flex h-screen overflow-hidden reality-background' style={{ backgroundImage: "url('/images/svg/reality-four.svg'), url('/images/svg/reality-two.svg')", minHeight: `${showReady ? '115%' : '100%'}` }}>
        {showReady && (
          <div className='px-5 pt-8 m-auto' style={{ backgroundColor: '#0A3085', width: '90%' }}>
            <p className='mb-10 text-2xl font-semibold leading-normal text-center text-white'>Get ready to hold your bottle to camera and rub the label</p>
            <Image className='w-full ml-5' style={{height: '50vh'}} src='/images/svg/scan-illustration.svg' alt='' width={100} height={10} />
            <div className='flex w-full -mt-4'>
              <button 
                className='px-12 py-3 mx-auto mb-8 text-2xl uppercase bg-yellow-300 w-fit'
                style={{ color: '#0A3085' }}
                type='submit' 
                onClick={handleBtnClick}
              >
                ok
              </button>
            </div>
          </div>
        )}

        {!showReady && (
          <Experience />
        )}
      </div>
      </Fragment>
    </Layout>
  )
}

export default ScanPage