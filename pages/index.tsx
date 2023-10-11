import { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Switch from "react-switch";
import { Layout } from '../components';
import Link from 'next/link';

const IndexPage = () => {
  const router = useRouter();
  const [withinLimit, setWithinLimit] = useState(false);
  const [belowLimit, setBelowLimit] = useState(false);
  const handleSwitchChange = () => {
    setWithinLimit(!withinLimit);
  }
  const handleBelowLimit = () => {
    localStorage.setItem('gate', '0');
    setBelowLimit(true);
  }

  useEffect(() => {
    if (withinLimit) {
      localStorage.setItem('gate', '1');
      setTimeout(() => {
        router.push('/landing');
      }, 2000);
    }
  }, [withinLimit]);

  return (
    <Layout title="Marketing AR">
      <div className='background' style={{ backgroundImage: "url('/images/png/background.png')" }}>
        <div className='wrapper'>
          <div className='relative w-full'>
            <Image src="/images/svg/smoke.svg" width={10} height={8} alt='smoke' className='w-full' />
            <Image src="/images/svg/logo.svg" width={10} height={8} alt='logo' className='absolute -translate-x-1/2 -translate-y-1/2 w-fit top-1/2 left-1/2' />
          </div>
          <div className='flex flex-col items-center w-full px-8'>
            <h2 className='mx-8 text-2xl font-bold text-center text-yellow-300 uppercase'>{belowLimit ? 'You must be of legal drinking age to enter this experience' : "Slide if you're 18 years or over"}</h2>
            {!belowLimit && (
              <Fragment>
                <div className='relative w-full h-16 mt-8 mb-6'>
                  <Switch
                    className={`w-full h-16 !rounded-[40px] ${withinLimit && 'on-switch'}`}
                    checked={withinLimit}
                    onChange={handleSwitchChange}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    uncheckedHandleIcon={<Image src='/images/svg/right-arrow.svg' alt='' width={10} height={10} />}
                    checkedHandleIcon={<Image src='/images/svg/mark.svg' alt='' width={10} height={10} />}
                  />
                  <p onClick={handleSwitchChange} className='absolute text-xl font-medium text-yellow-300 -translate-x-1/2 -translate-y-1/2 cursor-pointer top-1/2 left-1/2'>{withinLimit ? "I'm 18 years +" : 'Slide here'}</p>
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
            <p className='text-center text-[#0A3085] text-xs leading-relaxed'>
              By continuing on this site, you agree to our <Link className='font-bold cursor-pointer' href='/terms'>Terms of Service</Link> and <Link className='font-bold cursor-pointer' href='/privacy'>Privacy Policy</Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage
