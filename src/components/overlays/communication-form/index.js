import Overlay from '@components/shared/overlay';
import sms from '../../../../public/images/sms.svg';
import email from '../../../../public/images/email.svg';
import whatsapp from '../../../../public/images/whatsapp.svg';
import { useEffect } from 'react';

const CommunicationForm = ({ handleCloseOverlay, client }) => {
  useEffect(() => {
    console.log(client);
  }, [client]);
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
    <Overlay handleCloseOverlay={handleCloseOverlay} title={'How do you want to communicate'} className={'w-[630px]'}>
      <div className={'pt-6 mx-[22px] mb-[62px] flex gap-[18px]'}>
        {cards.map((c, index) => (
          <Card {...c} key={index} client={client} />
        ))}
      </div>
    </Overlay>
  );
};
const Card = ({ name, icon, color, disabled, client }) => {
  const sendCommunication = () => {
    let link = '';
    switch (name) {
      case 'Whatsapp':
        link = `https://wa.me/${client.phone_number}?text=${encodeURIComponent('Hello, I want to chat with you!')}`;
        window.open(link, '_blank');
        break;
      case 'Email':
        link = `mailto:${client.email}?subject=${encodeURIComponent('Hello')}&body=${encodeURIComponent(
          'Hello, I want to send an email to you!',
        )}`;
        window.location.href = link;
        break;
      case 'SMS':
        link = `sms:${client.phone_number}4&body=hi`;
        window.location.href = link;
        break;
    }
  };
  const handleButtonClick = () => {
    const emailAddress = 'example@example.com';
    const subject = 'Hello';
    const body = 'Hello, I want to chat with you!';

    // Create the mailto link
    const mailtoLink = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Open the default email application
    window.location.href = mailtoLink;
  };

  const openWhatsApp = () => {
    console.log('ereza');
    const phoneNumber = '+38349519559'; // Replace with the actual phone number
    const message = 'Hello, I want to chat with you!'; // Replace with your message

    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappLink, '_blank');
  };

  return (
    <div className={'w-full relative max-w-[270px] communication-box-shadow group'}>
      <div
        style={{
          height: '3px',
          top: '-2px',
          borderRadius: '4px 4px 0 0',
          backgroundColor: color,
          position: 'absolute',
          width: '100%',
        }}></div>
      <div
        style={{ boxSizing: 'border-box' }}
        className={
          'rounded-lg pt-[20px] pr-[15px] pb-[18px] pl-[17px] flex flex-col items-start gap-[26px] rounded-8 outline outline-solid outline-gray2 group-hover:outline-2'
        }>
        <img src={icon.src} />
        <div>
          <p className={'text-sm leading-5 font-medium text-gray7 mb-[10px]'}>{name}</p>
          <button
            disabled={disabled}
            onClick={() => sendCommunication()}
            className={`border w-[140px] rounded-[2222px] border-borderColor flex items-center justify-center p-2 gap-2 text-sm leading-5 font-medium text-gray5 ${
              disabled ? 'bg-gray1' : 'bg-white'
            }`}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
export default CommunicationForm;
