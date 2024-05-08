import Overlay from '@components/shared/overlay';
import WelcomeScreen from '../../../../public/images/onboarding/welcomeScreen.png';
import Image from 'next/image';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Button from '@components/shared/button';
const WelcomePopup = ({ closeModal, setStartedOnboarding }) => {
  return (
    <Overlay className="w-[632px]">
      <div className={'my-[60px] mx-6 flex flex-col items-center justify-center'}>
        <Image src={WelcomeScreen} width={194} height={112} className={'mb-[54px]'} />
        <h3 className={'text-lg leading-6 font-semibold text-gray7 mb-4'}>Welcome to our platform</h3>
        <p className={'text-sm leading-5 font-normal text-gray5 text-center'}>
          We’re excited to have you in our community of empowered customers. With our CRM, you’ll gain the tools and
          insights to supercharge your relationship management. Get ready to explore the possibilities and achieve your
          goals.
        </p>
        <br />
        <p className={'text-sm leading-5 font-normal text-gray5 text-center mb-[30px]'}>
          Thank you for choosing us, and we can’t wait to help you succeed!
        </p>
        <Button
          primary
          rightIcon={<ArrowForwardIcon className={'h-4 w-4'} />}
          onClick={() => {
            setStartedOnboarding(true);
            closeModal();
          }}
        >
          Start your journey
        </Button>
      </div>
    </Overlay>
  );
};

export default WelcomePopup;
