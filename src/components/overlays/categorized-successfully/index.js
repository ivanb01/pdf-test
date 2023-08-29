import Button from 'components/shared/button';
import Text from 'components/shared/text';
import categorizedSuccessfully from '/public/images/successfully-categorized.svg';
import Image from 'next/image';
import Overlay from 'components/shared/overlay';
import { ArrowRightIcon } from '@heroicons/react/outline';

const CategorizedSuccessfullyOverlay = ({ title, handleCloseOverlay }) => {
  return (
    <Overlay handleCloseOverlay={handleCloseOverlay} title={title} className="max-w-[600px]">
      <div className="p-6 text-center">
        <Image width={350} src={categorizedSuccessfully} />
        <Text h2 className="max-w-lg mx-auto mb-3 leading-[1.4] mt-6">
          Yay, you've categorized <strong>1 Contact</strong> successfully.
        </Text>
        <Text p className="text-gray4 max-w-lg mx-auto">
          You're once step closer to closing more deals. <br />
          <strong>75% of salespeople</strong> don't have an organized client list.
        </Text>
      </div>
      <div className="flex items-center justify-between p-6 space-x-2 rounded-b">
        <Button secondary label="Not for now" />
        <Button
          primary
          label="Categorize more"
          rightIcon={<ArrowRightIcon className="h-4" />}
          onClick={handleCloseOverlay}
        />
      </div>
    </Overlay>
  );
};

export default CategorizedSuccessfullyOverlay;
