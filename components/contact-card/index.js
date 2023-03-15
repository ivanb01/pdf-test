import { useEffect, useState } from 'react';
import { MenuAlt2Icon } from '@heroicons/react/outline';
import Checkbox from 'components/shared/checkbox';
import ContactCard from 'components/contact/contact-card';

const Column = ({ contacts = [], filter }) => {
  const [cardData, setCardData] = useState(contacts?.data || []);
  useEffect(() => {
    if (filter) {
      const data = contacts?.data;
      if (Array.isArray(data) && data.length > 0)
        setCardData(data?.filter(({ type }) => type === filter));
    } else setCardData(contacts?.data || []);
  }, [filter]);
  return (
    <div className="flex flex-col border-r border-gray2">
      <div
        className={`flex flex-row w-[280px] items-center p-[16px] ${contacts.className}`}
      >
        <Checkbox label={contacts.name} />
        <MenuAlt2Icon className="text-gray3 ml-auto" height={20} />
      </div>
      <div className="p-[16px]">
        {cardData.map((contact, index) => (
          <ContactCard contact={contact} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Column;
