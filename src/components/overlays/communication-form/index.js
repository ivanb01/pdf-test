import Overlay from '@components/shared/overlay';
import sms from '../../../../public/images/sms.svg';
import email from '../../../../public/images/email.svg';
import whatsapp from '../../../../public/images/whatsapp.svg';

const CommunicationForm = ({ handleCloseOverlay }) => {
  const cards = [
    {
      name: 'Whatsapp',
      icon: whatsapp,
      color: '#059669',
    },
    {
      name: 'Email',
      icon: email,
      color: '#4B5563',
    },
    {
      name: 'SMS',
      icon: sms,
      color: '#4F46E5',
    },
  ];
  return (
    <Overlay handleCloseOverlay={handleCloseOverlay} title={'How do you want to communicate'} className={'w-[630px]'}>
      <div className={'pt-6 mx-[22px] mb-[62px] flex gap-[18px]'}>
        {cards.map((c, index) => (
          <Card {...c} key={index} />
        ))}
      </div>
    </Overlay>
  );
};
const Card = ({ name, icon, color }) => {
  console.log(color, 'color');
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
            className={
              'border w-[140px] rounded-[2222px] border-borderColor flex items-center justify-center p-2 gap-2 text-sm leading-5 font-medium text-gray5'
            }>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
export default CommunicationForm;
