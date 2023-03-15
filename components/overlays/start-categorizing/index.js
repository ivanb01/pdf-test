import Button from 'components/shared/button';
import Text from 'components/shared/text';
import Overlay from 'components/shared/overlay';
import img from 'public/images/start-categorizing.gif';
import Image from 'next/image';
const StartCategorizing = ({ uncategorizedContacts, handleCloseOverlay }) => {
  return (
    <Overlay className="max-w-[600px]">
      <div className="p-[24px]">
        <div className="">
          <div className="">
            <div className="mb-3 text-center">
              <Image src={img} alt="header-img" />
            </div>
            <Text h2 className="text-gray7 text-center mb-2">
              You have {uncategorizedContacts} Uncategorized Contacts
            </Text>
            <Text p className="text-gray4 text-center ">
              <span className="text-[#0E7490]">
                “Categorized contacts are results of a healthy communication.”
              </span>
              <br />
              Why wait? Start to Improve your communication.
            </Text>
            <div className="flex items-center justify-center mt-6">
              <Button primary>Start with 10</Button>
            </div>
            <div className="text-center mt-6">
              <a
                href="#"
                className="text-gray4 underline text-sm"
                onClick={handleCloseOverlay}
              >
                Skip for now
              </a>
            </div>
          </div>
        </div>
      </div>
    </Overlay>
  );
};

export default StartCategorizing;
