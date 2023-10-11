import makeAnimated from "react-select/animated";
import { IDetailsForm } from "./typings";

export const defaultState: IDetailsForm = {
  wish_option: null,
  first_name: '',
  last_name: '',
  phone_number: '',
  country: '',
  valid_passport: null,
};
export const defaultError: {[key: string]: string | null} = {
  wish_option: null,
  first_name: null,
  last_name: null,
  phone_number: null,
  country: null,
  valid_passport: null,
};

export const animatedComponents = makeAnimated();

export const tempValidCodes = [
  '123456789',
  '234567890',
  '345678901',
  '456789012',
  '567890123',
  '678901234',
  '789012345',
  '890123456',
  '901234567',
  '012345678',
]