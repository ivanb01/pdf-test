import Overlay from '@components/shared/overlay';
import Input from '@components/shared/input';
import TextArea from '@components/shared/textarea';
import Button from '@components/shared/button';

const OrderTemplate = ({ name, handleCloseOverlay }) => {
  return (
    <Overlay title={name} handleCloseOverlay={handleCloseOverlay} className="w-[1000px]">
      <div className={'flex gap-6 mr-6 ml-6 mb-8 mt-6'}>
        <div className={'flex-1'}>
          <img
            className="w-full object-cover rounded-lg"
            src="https://i.imgur.com/u3yJjo7.png"
            style={{ height: '500px' }}
          />
        </div>
        <div className={'flex-1 '}>
          <form className={'flex flex-col gap-6 '}>
            <div className={'grid grid-cols-2 gap-6'}>
              <Input type="text" label="Name" id="name" />
              <Input type="text" label="Lastname" id="lastname" />
            </div>
            <div className={'grid grid-cols-2 gap-6'}>
              <Input type="email" label="Email address" id="email" />
              <Input type="text" label="Phone Number" id="phoneNumber" optional />
            </div>
            <Input type="text" label="Listing url" id="listingUrl" />
            <TextArea className="min-h-[120px]" id="note" label="Note"></TextArea>
            <div className={'grid grid-cols-2 gap-6'}>
              <Input
                type="date"
                label="I need this to be ready until"
                id="date"
                className={'col-span-1'}
                placeholder={'mm/dd/yyyy'}
              />
            </div>
          </form>
        </div>
      </div>
      <div
        className="flex items-end justify-end py-4 pr-6"
        style={{ boxShadow: '0px -2px 12px 1px rgba(0, 0, 0, 0.07)' }}>
        <Button className={`mr-4`} white onClick={handleCloseOverlay}>
          Cancel
        </Button>
        <Button primary onClick={handleCloseOverlay}>
          Send
        </Button>
      </div>
    </Overlay>
  );
};

export default OrderTemplate;
