'use client';
import { MouseEvent, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Layout, Loader } from '../components';
import Link from 'next/link';
import axios from 'axios';

const LandingPage = () => {
  const router = useRouter();
  const sabaAuthKey = process.env.NEXT_PUBLIC_SABA_AUTH_KEY ?? '';
  const sabaApi = process.env.NEXT_PUBLIC_SABA_API ?? '';
  const [loading, setLoading] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [codeError, setCodeError] = useState<null | boolean>(null);
  const [errMsg, setErrMsg] = useState<null | string>(null);

  const handleCodeChange = (e: any) => {
    if (codeError) {
      setCodeError(null);
      setErrMsg(null);
    }
    setPromoCode(e.target.value);
  }

  const handleSubmitToSaba = async (e: MouseEvent) => {
    try {
      e.preventDefault();
      setLoading(true);
      const formData = new FormData();
      formData.append('auth_key', sabaAuthKey);
      formData.append('code', promoCode);
      const sendCode = await axios.post(`${sabaApi}/submit_code`, formData);
      console.log(sendCode)
      if (sendCode.data.success) {
        window.top.localStorage.setItem('promo', promoCode);
        router.push('/scan');
      } else {
        setCodeError(true);
        setErrMsg(sendCode.data.message)
      }
    } catch (error) {
      console.log(error);
      setCodeError(true);
      setErrMsg('Something went wrong!!!')
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout title="Marketing AR - Landing">
      <div className='overflow-hidden background' style={{ backgroundImage: "url('/images/png/background.png')" }}>
        <div className='px-6 pt-10'>
          <Image src="/images/svg/logo.svg" width={10} height={8} alt='logo' className='mx-auto' style={{ width: '128px'}} />
          <h2 className='mx-8 my-3 text-3xl font-bold leading-tight text-center text-yellow-300 uppercase'>WHAT THE FLYING WISH?!</h2>
          <p className='mx-6 text-lg italic font-extrabold text-center text-white'>10 double tickets to WTFF travel experiences up for grabs!</p>
          <p className='mx-6 mt-8 mb-4 text-base font-semibold text-center text-white'>Enter the code under your bottle cap to make your wish</p>
          <form className='flex flex-col w-full'>
            <div className='flex flex-col items-center w-full gap-2 mb-6'>
              <input
                style={{
                  paddingLeft: '8px', 
                  height: '3.5rem', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  border: codeError ? '1px solid #F32525' : '1px solid #0A3085',
                  backgroundColor: codeError ? '#FFEAEA' : 'transparent',
                  color: codeError ? '#F32525' : '#ffffff'
                }}
                className={`w-3/4 py-4 text-xl font-semibold text-center border h-14 outline-0 placeholder:text-white placeholder:opacity-50`}
                type='number' 
                value={promoCode} 
                placeholder='Enter code' 
                onChange={handleCodeChange}
              />
              {codeError && (
                <p style={{color: '#FFACAC'}} className='text-xs font-semibold'>&#9888; {errMsg}</p>
                // <p style={{color: '#FFACAC'}} className='text-xs font-semibold'> &#9888; {usedCode ? 'You entered a used code' : 'You entered an invalid code'}</p>
              )}
            </div>
            <button 
              className={`w-fit mx-auto px-12 uppercase py-3`}
              style={{color: (promoCode.length >= 8 && promoCode.length <= 9) && !codeError ? '#0A3085' : '#1A191999', backgroundColor: (promoCode.length >= 8 && promoCode.length <= 9) && !codeError ? '#FFFF00' : '#636463'}}
              type='submit' 
              onClick={!loading ? handleSubmitToSaba : undefined} 
              disabled={promoCode.length < 8 || promoCode.length > 9 || codeError}
            >
              {loading ? <Loader /> : 'verify'}
            </button>
          </form>
        </div>

        <Image 
          src="/images/svg/genie-bottle.svg" 
          width={10} 
          height={8} 
          alt='logo'
          style={{width: '100%'}}
          className='mx-auto mt-auto'
        />
        
        <div className={`absolute bottom-4 w-full px-8`}>
          <p className='text-xs font-semibold leading-relaxed text-center text-white'>
            <Link className='font-bold underline cursor-pointer' href='/terms'>Promo Terms and Conditions</Link>
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default LandingPage