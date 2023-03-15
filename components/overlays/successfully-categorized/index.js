import Button from 'components/shared/button';
import Text from 'components/shared/text';
import Overlay from 'components/shared/overlay';
import img from 'public/images/categorized.png';
import img2 from 'public/images/categorized-all.svg';
import Image from 'next/image';

const SuccessfullyCategorized = ({
  totalCategorized,
  totalUncategorized,
  handleCloseOverlay,
}) => {
  let title = '';
  let image = null;
  if (totalCategorized == totalUncategorized) {
    title = (
      <Text h2 className="text-gray7 text-center mb-2">
        Congrats. You categorized them all!
      </Text>
    );
    image = img2;
  } else {
    title = (
      <Text h2 className="text-gray7 text-center mb-2">
        Yay, you've categorized{' '}
        <strong>
          {totalCategorized} {totalCategorized == 1 ? 'contact' : 'contacts'}
        </strong>{' '}
        successfully.
      </Text>
    );
    image = img;
  }
  return (
    <Overlay className="max-w-[600px]">
      <div className="p-[24px]">
        <div className="">
          <div className="">
            <div className="mb-3 text-center">
              <Image src={image} alt="header-img" />
            </div>
            {title}
            <Text p className="text-gray4 text-center max-w-md my-0 mx-auto">
              You're once step closer to closing more deals.{' '}
              <strong>75% of salespeople</strong> don't have an organized client
              list.
            </Text>
            <div className="flex items-center justify-between mt-6">
              <Button secondary onClick={handleCloseOverlay}>
                Not for now
              </Button>
              <Button primary>Categorize More</Button>
            </div>
          </div>
        </div>
      </div>
    </Overlay>
  );
};

export default SuccessfullyCategorized;
