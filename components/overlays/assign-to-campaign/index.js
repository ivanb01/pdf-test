import Button from 'components/shared/button';
import Text from 'components/shared/text';
import Overlay from 'components/shared/overlay';
// import img from 'public/images/assign-to-campaign.gif';
import img from 'public/images/assign-to-campaign-2.gif';
import img2 from 'public/images/bulk-assign-to-campaign.gif';
import Image from 'next/image';
import { useState } from 'react';
const AssignToCampaign = ({ contacts, handleCloseOverlay, onSubmit }) => {
  let title = '';
  let subtitle = '';
  let image = img;
  if (!contacts) {
    title = 'Assigning to Campaign';
    subtitle =
      'Contacts can easily be assigned to campaigns based on their stage in the sales process and type of contact. These campaigns help you stay engaged and connected with your clients.';
  } else if (contacts.first_name) {
    title =
      'Assign ' +
      contacts.first_name +
      ' ' +
      contacts.last_name +
      ' in campaign?';
    subtitle =
      'Assigned client will get emails/events from campaign. Your communication will be improved and healthy';
  } else if (contacts.length) {
    title = 'Assign ' + contacts.length + ' Clients in Campaign?';
    subtitle =
      'Assigned client will get emails/events from campaign. Your communication will be improved and healthy';
    image = img2;
  }

  const [loadingButton, setLoadingButton] = useState(false);

  return (
    <Overlay className="max-w-[600px]">
      <div className="p-[24px]">
        <div className="">
          <div className="">
            <div className="text-center">
              <Image src={image} alt="header-img" height={180} width={180} />
            </div>
            <Text h2 className="text-gray7 justify-center mb-2">
              {title}
            </Text>
            <Text p className="text-gray4 text-center ">
              {subtitle}
            </Text>
            <div className="flex items-center justify-between mt-6">
              <Button white onClick={handleCloseOverlay}>
                Cancel
              </Button>
              <Button 
                primary
                loading={loadingButton}
                onClick={()=>{
                  setLoadingButton(true);
                  onSubmit();
                }}
                >Assign to Campaign</Button>
            </div>
          </div>
        </div>
      </div>
    </Overlay>
  );
};

export default AssignToCampaign;
