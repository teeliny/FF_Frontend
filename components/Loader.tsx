import React from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export const Loader = () => {
  return (
    <div className="text-center">
      <div className='animate-spin dark:text-white'>
        <AiOutlineLoading3Quarters color='#0A3085' size={20} />
      </div>
    </div>
  )
}

export default Loader;