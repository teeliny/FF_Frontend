'use client';
import { FC, MouseEvent, useEffect, useMemo, useState } from 'react';
import Select, {Options} from "react-select";
import axios from 'axios';
import { 
  countryGroup, 
  defaultError, 
  defaultState, 
  animatedComponents, 
  countryStyles, 
  wishStyles, 
  ICountryOption, 
  wishList,
  localArUrl
} from '../utils';
import { Radio, RadioGroup } from 'react-radio-group';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Loader from './Loader';

const CountryFlag = ({code}: {code: string}) => (
  <div className='flex items-center gap-2'>
    <Image width={20} height={20} src={countryGroup[code].flag} alt={code} />
    <p>{countryGroup[code].name}</p>
  </div>
);

interface IDetailsForm {
  wish_id: string; 
  close?: () => void;
  experienceFrame?: HTMLIFrameElement | null;
}

export const DetailsForm: FC<IDetailsForm> = ({ wish_id, close, experienceFrame }) => {
  const router = useRouter();
  const sabaAuthKey = process.env.NEXT_PUBLIC_SABA_AUTH_KEY ?? '';
  const sabaApi = process.env.NEXT_PUBLIC_SABA_API ?? '';
  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? '';
  const modifiedState = wish_id ? {...defaultState, wish_option: wish_id } : defaultState;
  const [formState, setFormState] = useState(modifiedState);
  const [formError, setFormError] = useState(defaultError);
  const [isComplete, setIsComplete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState<null | string>(null);

  const wish = useMemo(() => wishList.find(item => item.id === wish_id), [wishList, wish_id]);

  const countryOptions: Options<ICountryOption> = [
    { value: 'South Africa', label: <CountryFlag code='za' /> },
    { value: 'Nigeria', label: <CountryFlag code='ng' /> },
    { value: 'Eswatini', label: <CountryFlag code='sz' /> },
    { value: 'Tanzania', label: <CountryFlag code='tz' /> },
  ];

  const handleFormChange = (key: string, value: string) => {
    if (formError[key]) setFormError({ ...formError, [key]: null });
    setFormState({ ...formState, [key]: value });
  };

  const submitHandlerToSaba = async (e: MouseEvent) => {
    try {
      e.preventDefault();
      setLoading(true);
      const promoCode = window.top.localStorage.getItem('promo');
      if (!promoCode) {
        setErrMsg('Promo code not found');
        return;
      }
      const { phone_number, country, first_name, last_name, valid_passport } = formState;
      const selectedCountry = Object.values(countryGroup).find((item) => item.name === country);
      let msisdn = phone_number;
      if (phone_number[0] === '+') msisdn = phone_number.slice(1);
      else if (phone_number[0] === '0') msisdn = `${selectedCountry.dialCode}${phone_number.slice(1)}`;

      const payload = {
        firstname: first_name,
        lastname: last_name,
        phone: phone_number,
        country: country,
        passport: valid_passport,
        wish: wish.description,
        code: promoCode,
        gift: null,
      }
      
      const formData = new FormData();
      formData.append('auth_key', sabaAuthKey);
      formData.append('code', promoCode);
      formData.append('msisdn', msisdn);
      const retrievePossibleGift = await axios.post(`${sabaApi}/submit_paw`, formData);
      if (retrievePossibleGift.data.success) {
        if (retrievePossibleGift.data.message) {
          window.top.localStorage.setItem('gift', retrievePossibleGift.data.message['Prize Name']);
          payload.gift = retrievePossibleGift.data.prize;
        }

        // delete next line once the backend is up and uncomment next block
        window.top.localStorage.setItem('wishId', wish.id);
        sendMessageToIframe(promoCode, payload.gift);
        close?.();
        // router.push('/stream-demo');
        // const response = await axios.post(`${apiUrl}/verify/addUser`, payload);
        // if (response.data?.isSuccess) {
        //   // console.log(response.data.isSuccess, 'form submitted successfully');
        //   router.push('/stream');
        // }
      }
    } catch (error) {
      console.log(error, ">>>>>>>>>>>>>>>>>>>>>");
      setErrMsg('Something went wrong!!!')
    } finally {
      setLoading(false);
    }
  }

  const submitHandler = async (e: MouseEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const promoCode = window.top.localStorage.getItem('promo') || '';
      const giftWon = window.top.localStorage.getItem('gift');
      window.top.localStorage.setItem('wishId', wish.id);
      const payload = {
        firstname: formState.first_name,
        lastname: formState.last_name,
        phone: formState.phone_number,
        country: formState.country,
        passport: formState.valid_passport,
        wish: wish.description,
        code: promoCode,
        gift: giftWon,
      }
      console.log(payload);
      setLoading(false);
      sendMessageToIframe(promoCode, giftWon);
      close?.();
      // router.push('/stream-demo');
      // const response = await axios.post(`${apiUrl}/verify/addUser`, payload);
      // if (response.status === 200) {
      //   console.log(response.data.isSuccess, 'form submitted successfully');
      // }
    }, 1000);
  };

  const sendMessageToIframe = (promoCode: string, giftWon: string | null) => {
    if (experienceFrame) {
      const message = giftWon && giftWon.length ? `${wish.name.toLowerCase()}Won` : `${wish.name.toLowerCase()}Lose`
      console.log({message, promoCode, giftWon});
      // const message = {wish: wish.name, promoCode, gift: (giftWon && giftWon.length ? true : false)};
      const targetOrigin = process.env.NEXT_PUBLIC_AR_BASE_URL || localArUrl;
      experienceFrame.contentWindow.postMessage(message, targetOrigin);
    }
  };

  // Track form completions to enable button
  useEffect(() => {
    const {wish_option, first_name, last_name, phone_number, country, valid_passport} = formState;
    if (wish_option && first_name && last_name && phone_number && country && valid_passport) setIsComplete(true);
    else setIsComplete(false);
  }, [formState]);

  return (
    <div className='flex flex-col' style={{ height: 'calc(100vh - 4.5rem)', overflowY: 'scroll', scrollbarWidth: 'none'}}>
      {wish && (
        <div className='flex items-center gap-2' style={{ backgroundColor: '#fff'}}>
          <Image width={80} height={80} src={wish.img} alt={''} />
          <div>
            <p className='text-xs font-medium' style={{color: '#0A3085'}}>Your What The Flying Wish is:</p>
            <p style={{ width: 'calc(100% - 8px)', whiteSpace: 'normal',color: '#0A3085'}} className='text-base italic font-semibold leading-tight'>{wish.description}</p>
          </div>
        </div>
      )}

      <h3 className='mt-8 mb-6 text-lg font-extrabold text-center text-yellow-300 uppercase'>Please enter your details</h3>
      <form>
        <div 
          style={{
            paddingLeft: '8px', 
            height: '3.5rem', 
            display: 'flex', 
            flexDirection: 'column',
            justifyContent: 'center',
            border: formError.first_name ? '1px solid #F32525' : '1px solid #0A3085',
            backgroundColor: formError.first_name ? '#FFEAEA' : 'transparent',
            color: formError.first_name ? '#F32525' : '#ffffff'
          }} 
          className={`w-full mb-6 border`}
        >
          {formState.first_name.length > 0 && (
            <label className='w-full text-xs text-left'>First name</label>
          )}
          <input 
            className={`w-full font-semibold outline-0 placeholder:text-white placeholder:opacity-50 bg-transparent ${formState.first_name.length > 0 ? 'text-sm' : 'text-xl'}`}
            type='text' 
            value={formState.first_name} 
            placeholder='First name' 
            onChange={(e) => handleFormChange('first_name', e.target.value)}
          />
          {formError.first_name && (
            <p className='mt-2 text-xs font-semibold' style={{color: '#FFACAC'}}>{formError.first_name}</p>
          )}
        </div>

        <div 
          style={{
            paddingLeft: '8px', 
            height: '3.5rem', 
            display: 'flex', 
            flexDirection: 'column',
            justifyContent: 'center',
            border: formError.last_name ? '1px solid #F32525' : '1px solid #0A3085',
            backgroundColor: formError.last_name ? '#FFEAEA' : 'transparent',
            color: formError.last_name ? '#F32525' : '#ffffff'
          }}
          className={`w-full mb-6 border`}
        >
          {formState.last_name.length > 0 && (
            <label className='w-full text-xs text-left'>Last name</label>
          )}
          <input 
            className={`w-full font-semibold outline-0 placeholder:text-white placeholder:opacity-50 bg-transparent ${formState.last_name.length > 0 ? 'text-sm' : 'text-xl'}`}
            type='text' 
            value={formState.last_name}
            placeholder='Last name'
            onChange={(e) => handleFormChange('last_name', e.target.value)}
          />
          {formError.last_name && (
            <p className='mt-2 text-xs font-semibold' style={{color: '#FFACAC'}}>{formError.last_name}</p>
          )}
        </div>

        <div 
          style={{
            paddingLeft: '8px', 
            height: '3.5rem', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center',
            border: formError.phone_number ? '1px solid #F32525' : '1px solid #0A3085',
            backgroundColor: formError.phone_number ? '#FFEAEA' : 'transparent',
            color: formError.phone_number ? '#F32525' : '#ffffff'
          }} 
          className={`w-full mb-6 border`}
        >
          {formState.phone_number.length > 0 && (
            <label className='w-full text-xs text-left'>Phone number</label>
          )}
          <input 
            className={`w-full font-semibold outline-0 placeholder:text-white placeholder:opacity-50 bg-transparent ${formState.phone_number.length > 0 ? 'text-sm' : 'text-xl'}`}
            type='text' 
            value={formState.phone_number} 
            placeholder='Phone number' 
            onChange={(e) => handleFormChange('phone_number', e.target.value)}
          />
          {formError.phone_number && (
            <p className='mt-2 text-xs font-semibold' style={{color: '#FFACAC'}}>{formError.phone_number}</p>
          )}
        </div>

        <Select
          className=''
          closeMenuOnSelect={true}
          styles={countryStyles}
          components={animatedComponents}
          defaultValue={null}
          options={countryOptions}
          placeholder={<div className='text-xl font-semibold'>Country</div>} 
          onChange={(newValue: ICountryOption) => handleFormChange('country', newValue.value)}
        />

        <div style={{ marginTop: '2.5rem', marginBottom: '1rem'}}>
          <h3 className='mb-6 text-lg font-extrabold text-center text-yellow-300 uppercase'>do you have a valid international passport?</h3>
          <RadioGroup
          style={{gap: '1rem'}}
            className='flex mx-auto w-fit'
            name="passport" 
            selectedValue={formState.valid_passport} 
            onChange={(option) => handleFormChange('valid_passport', option)}
          >
            <div className='flex gap-2'>
              <Radio style={{width: '1.5rem', height: '1.5rem', accentColor: '#0A3085'}} className='bg-transparent' value="yes" /><span style={{color: '#0A3085'}}>Yes</span>
            </div>
            <div className='flex gap-2'>
              <Radio style={{width: '1.5rem', height: '1.5rem', accentColor: '#0A3085'}} value="no" /><span style={{color: '#0A3085'}}>No</span>
            </div>
          </RadioGroup>
        </div>
        
        <div className='w-full mt-8 mb-4'>
          <button 
            style={{color: !isComplete ? '#1A191999' : '#0A3085', backgroundColor: !isComplete ? '#636463' : '#FFFF00'}} 
            className={`py-3 uppercase px-8 w-full text-xl`} 
            onClick={!loading ? submitHandlerToSaba : undefined}
          >
            {loading ? <Loader /> : 'Submit my Flying Wish!'}
          </button>
          {errMsg && ( <p style={{color: '#FFACAC'}} className='mt-1 text-xs font-semibold text-center'>&#9888; {errMsg}</p>)}
        </div>
      </form>
    </div>
  )
}

export default DetailsForm