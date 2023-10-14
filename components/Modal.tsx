import { FC } from "react";
import Image from "next/image";

interface IModal {
  close?: () => void;
  title?: string;
  children: JSX.Element;
}

export const Modal: FC<IModal> = ({ children, close, title }) => {
  return (
    <div className='absolute top-0 left-0 z-50 flex items-center justify-center w-screen h-screen' style={{ top: '0', left: '0', zIndex: '2'}}>
      <div className='relative px-6 background' style={{ backgroundImage: "url('/images/png/background.png')" }}>
        {close && (
          <button style={{justifyContent: 'flex-end', paddingTop: '2rem', paddingBottom: '0.5rem'}} className='flex w-full cursor-pointer' onClick={close}>
            <Image className='w-fit' src='/images/svg/close.svg' alt='' width={32} height={32} />
          </button>
        )}
        {title && (
          <h3 className='mb-4 text-center'>{title}</h3>
        )}
        {children}
      </div>
    </div>
  )
}

export default Modal