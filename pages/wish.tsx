import { FC, Fragment, MouseEvent, useState } from 'react';
import Image from 'next/image';
import { DetailsForm, Layout, Modal } from '../components';
import { wishList } from '../utils';

export const WishSelection: FC = () => {
  const [wishId, setMyWishId] = useState<null | string>(null);
  const [submitWishModal, setSubmitWishModal] = useState(false);

  const handleWishSelection = (id: string) => {
    setMyWishId(id);
  };
  const closeWishForm = () => setSubmitWishModal(false);
  const submitWishHandler = (e: MouseEvent) => {
    e.preventDefault();
    if (wishId) {
      setSubmitWishModal(true);
    }
  };

  return (
    <Layout title="Marketing AR - Select your wish">
      <Fragment>
        <div className='relative px-6 background' style={{ backgroundImage: "url('/images/png/background.png')" }}>
          <div>
            <div className='py-4'>
              <p className='text-xl font-bold text-center text-yellow-300'>MAKE YOUR</p>
              <p className='text-xl font-black text-center text-yellow-300'>WHAT THE FLYING WISH!</p>
              <p className='text-xl font-bold text-center text-yellow-300'>CHOOSE ONE OPTION BELOW</p>
            </div>

            <div className='flex flex-col gap-4'>
              {wishList.map((option) => (
                <div 
                  key={option.id} 
                  style={{border: wishId === option.id ? '2px solid #fde047' : 'none', backgroundColor: 'rgba(10, 48, 133, 0.50)', backdropFilter: 'blur(5px)'}} 
                  className='flex items-center gap-4' 
                  onClick={() => handleWishSelection(option.id)}
                >
                  <Image width={100} height={100} src={option.img} alt={''} />
                  <div>
                    <p style={{ width: 'calc(100% - 8px)', whiteSpace: 'normal'}} className='text-base italic font-semibold text-white leading-6'>{option.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className='fixed bottom-8 left-1/2 -translate-x-1/2'>
              <button 
                className={`py-3 mt-4 uppercase px-14`}
                style={{color: wishId ? '#0A3085' : '#1A191999', backgroundColor: wishId ? '#FFFF00' : '#636463'}} 
                onClick={submitWishHandler} 
                disabled={!wishId}
              >
                select
              </button>
            </div>
          </div>
          </div>
      
        {submitWishModal && wishId && (
          <Modal close={closeWishForm}>
            <DetailsForm wish_id={wishId} />
          </Modal>
        )}
      </Fragment>
    </Layout>
  )
}

export default WishSelection;