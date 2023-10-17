export const countryGroup = {
  za: { name: 'South Africa', flag: '/images/svg/za-flag.svg', dialCode: '27' },
  ng: { name: 'Nigeria', flag: '/images/svg/ng-flag.svg', dialCode: '234' },
  sz: { name: 'Eswatini', flag: '/images/svg/sz-flag.svg', dialCode: '268' },
  tz: { name: 'Tanzania', flag: '/images/svg/tz-flag.svg', dialCode: '255' },
};

export const wishList = [
  { id: '1', description: 'Fly me to the beach, water baby!', img: '/images/png/beach-water.jpg' },
  { id: '2', description: 'Fly me to adventure. I feel the need for speed!', img: '/images/svg/need-for-speed.svg' },
  { id: '3', description: "Fly me to the high life, I'm not afraid of heights!", img: '/images/svg/afraid-height.svg' },
  { id: '4', description: "Fly me to the party vibes, let's go!", img: '/images/svg/party-vibes.svg' },
];

export const realityList = [
  { id: '1', description: 'Fly me to the beach, water baby!', img: '/images/svg/swipe/beach.svg' },
  { id: '2', description: 'Fly me to adventure. I feel the need for speed!', img: '/images/svg/swipe/adventure.svg' },
  { id: '3', description: "Fly me to the high life, I'm not afraid of heights!", img: '/images/svg/swipe/high.svg' },
  { id: '4', description: "Fly me to the party vibes, let's go!", img: '/images/svg/swipe/party.svg' },
];

export const gateCheck = (path: string, value: string | null): boolean => {
  const unAuthPaths = ['/', '/privacy', '/terms'];
  if (!value && !unAuthPaths.includes(path)) return false;
  if (!+value && !unAuthPaths.includes(path)) return false;
  return true;
}