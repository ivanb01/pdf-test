import Overlay from '@components/shared/overlay';
import sms from '../../../../public/images/sms.svg';
import email from '../../../../public/images/email.svg';
import whatsapp from '../../../../public/images/whatsapp.svg';
import { addContactActivity, getContactActivities } from '@api/contacts';
import { useDispatch, useSelector } from 'react-redux';
import { updateContactLocally } from '@store/contacts/slice';
import { useEffect } from 'react';
import { setContactToBeEmailed, setOpenEmailContactOverlay } from '@store/global/slice';

const CommunicationForm = ({ handleCloseOverlay, client, setActivities }) => {
  const dispatch = useDispatch();
  const cards = [
    {
      name: 'Whatsapp',
      icon: whatsapp,
      color: '#059669',
      disabled: client.phone_number === undefined || client.phone_number === null,
    },
    {
      name: 'Email',
      icon: email,
      color: '#4B5563',
      disabled: client.email === undefined || client.email === null,
    },
    {
      name: 'SMS',
      icon: sms,
      color: '#4F46E5',
      disabled: client.phone_number === undefined || client.phone_number === null,
    },
  ];
  return (
    <Overlay handleCloseOverlay={handleCloseOverlay} title={'How do you want to communicate?'} className={'w-[630px]'}>
      <div className={'pt-6 mx-[22px] mb-[62px] flex gap-[18px]'}>
        {cards.map((c, index) => (
          <Card
            {...c}
            key={index}
            client={client}
            setActivities={setActivities}
            handleCloseOverlay={handleCloseOverlay}
          />
        ))}
      </div>
    </Overlay>
  );
};
const Card = ({ name, icon, color, disabled, client, setActivities, handleCloseOverlay }) => {
  const dispatch = useDispatch();
  let message = '';
  switch (client.category_2) {
    case 'Renter':
      message = "Hey, wanted to check in and see if you're still looking for a rental?";
      break;
    case 'Buyer':
      message = 'Hey, wanted to see if we could help with anything related to your purchase.';
      break;
    case 'Landlord':
      message = 'Hey just checking in on your property.';
      break;
    case 'Seller':
      message = 'Hey, just wanted to check in and see if we could talk about your property.';
      break;
    default:
      message = 'Hey, just checking in.';
      break;
  }

  const sendCommunication = () => {
    let link = '';
    switch (name) {
      case 'Whatsapp':
        link = `https://wa.me/${client.phone_number}?text=${encodeURIComponent(message)}`;
        window.open(link, '_blank');
        break;
      case 'Email':
        // modify client object
        let clientToBeEmailed = {
          value: client.id,
          label: `${client.first_name} ${client.last_name} - ${client.email}`,
          first_name: client.first_name,
          last_name: client.last_name,
          email: client.email,
          profile_image_path: client.profile_image_path,
        };
        dispatch(setContactToBeEmailed(clientToBeEmailed));
        dispatch(setOpenEmailContactOverlay(true));
        handleCloseOverlay();
        // link = `mailto:${client.email}?subject=${encodeURIComponent(
        //   "Connecting with You: Let's Discuss Your Needs",
        // )}&body=${encodeURIComponent(message)}`;
        // window.location.href = link;
        break;
      case 'SMS':
        link = `sms:${client.phone_number}&body=${message}`;
        window.location.href = link;
        break;
    }
  };

  const _addActivity = () => {
    switch (name) {
      case 'Whatsapp':
        return {
          type_of_activity_id: 26,
          description: 'Attempted to communicate using Whatsapp.',
        };
      case 'Email':
        return {
          type_of_activity_id: 1,
          description: 'Attempted to communicate using Email.',
        };
      case 'SMS':
        return {
          type_of_activity_id: 2,
          description: 'Attempted to communicate using SMS.',
        };
      default:
        return {};
    }
  };

  const allContacts = useSelector((state) => state.contacts.allContacts.data);

  useEffect(() => {
    console.log(allContacts, 'allContacts');
  }, [allContacts]);
  return (
    <div
      className={'w-full relative max-w-[270px] communication-box-shadow group'}
      style={{ opacity: disabled ? '50%' : 1 }}>
      <div
        style={{
          height: '3px',
          top: '-2px',
          borderRadius: '4px 4px 0 0',
          backgroundColor: color,
          position: 'absolute',
          width: '174px',
          left: '-1px',
        }}></div>
      <div
        style={{ boxSizing: 'border-box' }}
        className={
          'rounded-lg pt-[20px] w-[172px] h-[180px] pr-[15px] pb-[18px] pl-[17px] flex flex-col items-start gap-[26px] rounded-8 outline outline-solid rounded-tr-[1px] rounded-tl-[1px] outline-gray2 group-hover:outline-2'
        }>
        <img src={icon.src} />
        <div>
          <p className={'text-sm leading-5 font-medium text-gray7 mb-[10px]'}>{name}</p>
          <button
            disabled={disabled}
            onClick={() => {
              dispatch(updateContactLocally({ ...client, last_communication_date: new Date() }));
              addContactActivity(client.id, _addActivity()).then(() => {
                if (setActivities) {
                  getContactActivities(client.id).then((response) => setActivities(response.data.data));
                }
              });
              sendCommunication();
            }}
            className={`border w-[140px] rounded-[2222px] border-borderColor flex items-center justify-center p-2 gap-2 text-sm leading-5 font-medium text-gray5 bg-white`}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
export default CommunicationForm;
