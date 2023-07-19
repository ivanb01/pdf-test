import bedroom from '/public/images/bedroom.svg';
import bathroom from '/public/images/bathroom.svg';
import usd from '//public/images/usd.svg';
import { SearchIcon } from '@heroicons/react/outline';
import Image from 'next/image';

export const tabs = [
  {
    title: "What's the best thing about Switzerland?",
    content:
      "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  },
  // More titles...
];

export const inputs = [
  {
    id: 'neighborhood',
    type: 'dropdown',
    label: 'Neighborhood',
    iconAfter: <SearchIcon className="text-gray3" height={20} />,
    className: 'mb-8 w-[100%]',
  },
  {
    id: 'bedrooms',
    type: 'number',
    label: 'Bedrooms',
    iconAfter: <Image src={bedroom} height={20} />,
    className: 'w-[50%] pr-2 mb-8',
  },
  {
    id: 'bathrooms',
    type: 'number',
    label: 'Bathrooms',
    iconAfter: <Image src={bathroom} height={20} />,
    className: 'w-[50%] pl-2 mb-8',
  },
  {
    id: 'budget-min',
    type: 'number',
    label: 'Budget Min',
    iconAfter: <Image src={usd} height={20} />,
    className: 'w-[50%] pr-2 mb-8',
  },
  {
    id: 'budget-max',
    type: 'number',
    label: 'Budget Max',
    iconAfter: <Image src={usd} height={20} />,
    className: 'w-[50%] pl-2 mb-8',
  },
];
