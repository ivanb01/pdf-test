import opgnyLogo from 'public/images/oneline.svg';
import signInAnimation from 'public/images/sign-in.gif';
import Image from 'next/image';

const Authentication = ({ children }) => {
  return (
    <>
      <div className="flex items-center h-full">
        <div className="w-1/2 h-full bg-no-repeat bg-cover bg-center p-16">
          <Image src={opgnyLogo} alt="" className="" />
          <div className="w-full h-full flex flex-col items-center justify-center">
            <div className="text-[34px] text-onelineMainColor font-bold text-center mb-4 max-w-lg">
              Automate your sales process and close more deals
            </div>
            <lottie-player
              src="https://assets3.lottiefiles.com/packages/lf20_7z8wtyb0.json"
              background="transparent"
              speed="1"
              style={{ width: '350px', height: '350px' }}
              loop
              autoplay
            ></lottie-player>
          </div>
        </div>
        <div className="bg-onelineBackground h-full w-1/2 flex items-center justify-center">
          <div className="min-w-[370px] text-left">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Authentication;
