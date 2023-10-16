export interface ICountryOption { 
  value: string; 
  label: JSX.Element;
};

export interface IDetailsForm {
  wish_option: null | string,
  first_name: string,
  last_name: string,
  phone_number: string,
  country: string,
  valid_passport: null | string,
}