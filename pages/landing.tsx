import { MouseEvent, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Layout } from '../components';

const LandingPage = () => {
  const router = useRouter();
  const [promoCode, setPromoCode] = useState('');
  const [codeError, setCodeError] = useState<null | boolean>(null);

  const handleCodeChange = (e: any) => {
    if (codeError) setCodeError(null);
    setPromoCode(e.target.value);
  }
  const handleSubmit = (e: MouseEvent) => {
    e.preventDefault();
    console.log(promoCode);
    router.push('/scan');
  };

  return (
    <Layout title="Marketing AR - Landing">
      <div className='overflow-hidden background' style={{ backgroundImage: "url('/images/png/background.png')" }}>
        <div className='px-6 pt-10'>
          <Image src="/images/svg/logo.svg" width={10} height={8} alt='logo' className='w-[128px] mx-auto' />
          <h2 className='mx-8 my-3 text-3xl font-bold leading-tight text-center text-yellow-300 uppercase'>WHAT THE FLYING WISH?!</h2>
          <p className='mx-6 text-lg italic font-extrabold text-center text-white'>10 double tickets to WTFF travel experiences up for grabs!</p>
          <p className='mx-6 mt-8 mb-4 text-base font-semibold text-center text-white'>Enter the code under your bottle cap to make your wish</p>
          <form className='flex flex-col w-full'>
            <div className='flex flex-col items-center w-full gap-2 mb-6'>
              <input 
                className={`w-3/4 py-4 text-xl font-semibold text-center border h-14 outline-0 placeholder:text-white placeholder:opacity-50 ${codeError ? 'border-[#F32525] bg-[#FFEAEA] text-[#F32525]' :  'border-[#0A3085] bg-transparent text-white'}`}
                type='number' 
                value={promoCode} 
                placeholder='Enter code' 
                onChange={handleCodeChange}
              />
              {codeError && (
                <p className='text-[#FFACAC] font-semibold text-xs'> &#9888; You entered an invalid code</p>
              )}
            </div>
            <button 
              className={`w-fit mx-auto px-12 uppercase py-3 ${promoCode.length === 9 ? 'bg-yellow-300 text-[#0A3085]' : 'bg-[#636463] text-[#1A191999]'}`}
              type='submit' 
              onClick={handleSubmit} 
              disabled={promoCode.length !== 9}
            >
                verify
            </button>
          </form>
        </div>
        <Image src="/images/svg/genie-bottle.svg" width={10} height={8} alt='logo' className='w-full mt-auto' />
      </div>
    </Layout>
  )
}

export default LandingPage