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
            <h3 className='pt-8 mb-6 text-lg font-extrabold text-center text-yellow-300 uppercase'>Select a wish</h3>
            <div className='flex flex-col gap-4'>
              {wishList.map((option) => (
                <div 
                  key={option.id} 
                  style={{border: wishId === option.id ? '2px solid #fde047' : 'none'}} 
                  className='flex items-center gap-2' 
                  onClick={() => handleWishSelection(option.id)}
                >
                  <Image width={100} height={100} src={option.img} alt={''} />
                  <div>
                    <p className='text-xs font-medium text-white'>Your What The Flying Wish is:</p>
                    <p style={{ width: 'calc(100% - 8px)', whiteSpace: 'normal'}} className='text-base italic font-semibold leading-tight text-white'>{option.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className='fixed bottom-8 left-1/2 -translate-x-1/2'>
              <button className={`py-3 mt-4 uppercase px-14 ${!wishId ? 'text-[#1A191999] bg-[#636463]' : 'text-[#0A3085] bg-yellow-300'}`} onClick={submitWishHandler} disabled={!wishId}>select</button>
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