export const countryGroup = {
  za: { name: 'South Africa', flag: '/images/svg/za-flag.svg', dialCode: '27' },
  ng: { name: 'Nigeria', flag: '/images/svg/ng-flag.svg', dialCode: '234' },
  sz: { name: 'Eswatini', flag: '/images/svg/sz-flag.svg', dialCode: '268' },
  tz: { name: 'Tanzania', flag: '/images/svg/tz-flag.svg', dialCode: '255' },
};

export const realityList = [
  { id: '1', name: 'Beach', description: 'Fly me to the beach, water baby!', img: '/images/svg/swipe/beach.jpg' },
  { id: '2', name: 'Adventure', description: 'Fly me to adventure. I feel the need for speed!', img: '/images/svg/swipe/adventure.jpg' },
  { id: '3', name: 'HighLife', description: "Fly me to the high life, I'm not afraid of heights!", img: '/images/svg/swipe/high.jpg' },
  { id: '4', name: 'Party', description: "Fly me to the party vibes, let's go!", img: '/images/svg/swipe/party.jpg' },
];

export const gateCheck = (path: string, value: string | null): boolean => {
  const unAuthPaths = ['/', '/privacy', '/terms'];
  if (!value && !unAuthPaths.includes(path)) return false;
  if (!+value && !unAuthPaths.includes(path)) return false;
  return true;
}