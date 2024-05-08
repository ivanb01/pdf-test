import opgnyLogo from '/public/images/oneline.svg';
import signInAnimation from '/public/images/sign-in.gif';
import Image from 'next/image';

const Authentication = ({ children }) => {
  return (
    <>
      <div className="flex md:flex-row flex-col items-center h-full">
        <div className="md:w-1/2 w-full h-full bg-no-repeat bg-cover bg-center p-4 md:p-16">
          <Image src={opgnyLogo} alt="" className="" />
          <div className="pt-4 md:pt-0 w-full h-full flex flex-col items-center justify-center">
            <div className=" text-sm md:text-3xl text-onelineMainColor font-bold text-center mb-4 max-w-lg">
              Automate your sales process and close more deals
            </div>
            <div className="w-full md:h-[350px] md:w-[350px]">
              <lottie-player
                src="/animations/authentication.json"
                background="transparent"
                speed="1"
                style={{ width: '100%', height: '100%' }}
                loop="true"
                autoplay
              ></lottie-player>
            </div>
          </div>
        </div>
        <div className="bg-onelineBackground h-full md:w-1/2 w-full md:flex md:items-center md:justify-center p-4">
          <div className="md:min-w-[370px] text-left">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Authentication;
