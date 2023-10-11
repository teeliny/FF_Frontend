import { Fragment, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export const Experience = () => {
  const router = useRouter();
  const [launch, setLaunch] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setLaunch(true);
    }, 2000);
  }, []);

  useEffect(() => {
    if (launch) {
      setTimeout(() => {
        router.push('/wish')
      }, 3000);
    }
  })

  return (
    <Fragment>
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

      {launch && (
        <iframe
          src='https://beertechafrica.8thwall.app/flying-fish/'
          allow='camera'
          style={{ width: '100vw', height: '100vh'}}
          onLoad={(e) => console.log('AR launch successfully')}
        />
      )}
    </Fragment>
  )
}

export default Experience;