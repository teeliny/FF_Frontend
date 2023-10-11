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

export const tempGiftBucket = {
  airtime: '/images/svg/gifts/airtime.svg',
  cash: '/images/svg/gifts/cash.svg',
  delivery: '/images/svg/gifts/delivery.svg',
  drinks: '/images/svg/gifts/drinks.svg',
  music: '/images/svg/gifts/music.svg',
  shopping: '/images/svg/gifts/shopping.svg',
  speaker: '/images/svg/gifts/speaker.svg',
}

export const envWithGift = {
  '1': { url: '/images/adventure-gift.mp4', duration: 20 },
  '2': { url: '/images/beach-gift.mp4', duration: 20 },
  '3': { url: '/images/adventure-gift.mp4', duration: 20 },
  '4': { url: '/images/beach-gift.mp4', duration: 20 },
}

export const envWithOutGift = {
  '1': { url: '/images/high-life-no-gift.mp4', duration: 11 },
  '2': { url: '/images/high-life-no-gift.mp4', duration: 11 },
  '3': { url: '/images/party-no-gift.mp4', duration: 11 },
  '4': { url: '/images/party-no-gift.mp4', duration: 11 },
}