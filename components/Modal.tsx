import { FC } from "react";
import { FaArrowAltCircleLeft } from "react-icons/fa";

interface IModal {
  close?: () => void;
  title?: string;
  children: JSX.Element;
}

export const Modal: FC<IModal> = ({ children, close, title }) => {
  return (
    <div className='absolute top-0 left-0 z-50 flex items-center justify-center w-screen h-screen sm:max-w-screen-sm sm:left-1/2 sm:-translate-x-1/2' style={{ top: '0', zIndex: '2'}}>
      <div className='relative px-6 background' style={{ backgroundImage: "url('/images/png/background.png')", opacity: "0.95" }}>
        {close && (
          <button style={{justifyContent: 'flex-start', paddingTop: '2rem', paddingBottom: '0.5rem'}} className='flex items-center w-full cursor-pointer' onClick={close}>
            <FaArrowAltCircleLeft color="#fff" size={20} />
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