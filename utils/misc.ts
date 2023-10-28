export const countryGroup = {
  za: { name: 'South Africa', flag: '/images/svg/za-flag.svg', dialCode: '27' },
  ng: { name: 'Nigeria', flag: '/images/svg/ng-flag.svg', dialCode: '234' },
  sz: { name: 'Eswatini', flag: '/images/svg/sz-flag.svg', dialCode: '268' },
  tz: { name: 'Tanzania', flag: '/images/svg/tz-flag.svg', dialCode: '255' },
};

export const wishList = [
  { id: '1', name: 'Beach', description: 'Fly me to the beach, water baby!', img: '/images/png/beach.png' },
  { id: '2', name: 'Adventure', description: 'Fly me to adventure. I feel the need for speed!', img: '/images/png/adventure.png' },
  { id: '3', name: 'HighLife', description: "Fly me to the high life, I'm not afraid of heights!", img: '/images/png/high.png' },
  { id: '4', name: 'Party', description: "Fly me to the party vibes, let's go!", img: '/images/png/party.png' },
];

export const realityList = [
  { id: '1', description: 'Fly me to the beach, water baby!', img: '/images/png/swipe/beach.svg' },
  { id: '2', description: 'Fly me to adventure. I feel the need for speed!', img: '/images/png/swipe/adventure.svg' },
  { id: '3', description: "Fly me to the high life, I'm not afraid of heights!", img: '/images/png/swipe/high.svg' },
  { id: '4', description: "Fly me to the party vibes, let's go!", img: '/images/png/swipe/party.svg' },
];

export const gateCheck = (path: string, value: string | null): boolean => {
  const unAuthPaths = ['/', '/privacy', '/terms'];
  if (!value && !unAuthPaths.includes(path)) return false;
  if (!+value && !unAuthPaths.includes(path)) return false;
  return true;
}