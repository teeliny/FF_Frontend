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
  wishList
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
)

// const WishSection = ({description, img} : {description: string, img: string}) => (
//   <div className='flex items-center gap-2'>
//     <Image width={64} height={64} src={img} alt={''} />
//     <div>
//       <p className='text-xs font-medium'>Your What The Flying Wish is:</p>
//       <p style={{ width: 'calc(100% - 8px)', whiteSpace: 'normal'}} className='text-base italic font-semibold leading-tight'>{description}</p>
//     </div>
//   </div>
// )

export const DetailsForm: FC<{wish_id: string}> = ({ wish_id }) => {
  const router = useRouter();
  const modifiedState = wish_id ? {...defaultState, wish_option: wish_id } : defaultState;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL as string;
  const [formState, setFormState] = useState(modifiedState);
  const [formError, setFormError] = useState(defaultError);
  const [isComplete, setIsComplete] = useState(false);
  const [loading, setLoading] = useState(false);

  const wish = useMemo(() => wishList.find(item => item.id === wish_id), [wishList, wish_id]);

  // const wishOptions = useMemo(() => (
  //   wishList.map((wish) => ({
  //     value: wish.id,
  //     label: <WishSection description={wish.description} img={wish.img} />
  //   }))
  // ), [wishList]);
  // const defaultWish = useMemo(() => {
  //   const currWish = wishOptions.find(wish => wish.value === wish_id);
  //   return currWish ?? wishOptions[0];
  // }, [wishOptions, wish_id]);

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

  const submitHandler = async (e: MouseEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      // const wish = wishList.find(item => item.id === formState.wish_option);
      const promoCode = localStorage.getItem('promo') || '';
      const giftWon = localStorage.getItem('gift');
      localStorage.setItem('wishId', wish.id);
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
      router.push('/stream');
      // const response = await axios.post(`${apiUrl}/verify/addUser`, payload);
      // if (response.status === 200) {
      //   console.log(response.data.isSuccess, 'form submitted successfully');
      // }
    }, 1000);
  };

  // Track form completions to enable button
  useEffect(() => {
    const {wish_option, first_name, last_name, phone_number, country, valid_passport} = formState;
    if (wish_option && first_name && last_name && phone_number && country && valid_passport) setIsComplete(true);
    else setIsComplete(false);
  }, [formState]);

  return (
    <div className='flex flex-col' style={{ height: 'calc(100vh - 4.5rem)', overflowY: 'scroll', scrollbarWidth: 'none'}}>
      {/* <div className='mt-6'>
        <Select
          className=''
          closeMenuOnSelect={true}
          styles={wishStyles}
          components={animatedComponents}
          defaultValue={defaultWish}
          options={wishOptions}
          placeholder={<div className='text-xl font-semibold'>Wish</div>} 
          onChange={(newValue: ICountryOption) => handleFormChange('wish_option', newValue.value)}
        />
      </div> */}
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
            <p className='font-semibold text-xs mt-2' style={{color: '#FFACAC'}}>{formError.first_name}</p>
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
            <p className='font-semibold text-xs mt-2' style={{color: '#FFACAC'}}>{formError.last_name}</p>
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
            <p className='font-semibold text-xs mt-2' style={{color: '#FFACAC'}}>{formError.phone_number}</p>
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
        
        <button 
          style={{color: !isComplete ? '#1A191999' : '#0A3085', backgroundColor: !isComplete ? '#636463' : '#FFFF00'}} 
          className={`py-3 mt-8 uppercase px-8 w-full text-xl mb-4`} 
          onClick={!loading ? submitHandler : undefined}
        >
          {loading ? <Loader /> : 'Submit my Flying Wish!'}
        </button>
      </form>
    </div>
  )
}

export default DetailsForm