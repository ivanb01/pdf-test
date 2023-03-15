import Button from 'components/shared/button';
import Text from 'components/shared/text';
import Overlay from 'components/shared/overlay';

const CannotAssignToCampaign = ({ message, handleCloseOverlay }) => {
  return (
    <Overlay className="max-w-[512px]">
      <div className="p-[24px]">
        <div className="flex flex-row ">
          
          <div className="flex flex-col ml-2">
            <Text h3 className="text-gray7 mb-2" >Assign Client to Campaign?</Text>
            <Text p className="text-gray4 ">
              {message}
            </Text>
          </div>
        </div>
        <div className="flex flex-row justify-end mt-4">
          <Button
            onClick={handleCloseOverlay}
            label="Understood"
            white
            className="mr-2"
          />
        </div>
      </div>
    </Overlay>
  );
};

export default CannotAssignToCampaign;
