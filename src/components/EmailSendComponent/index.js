import PlusButton from '@components/PlusButton';
import SendEmailOverlay from '@components/shared/sidebar/global-send-email';
import { setOpenEmailContactOverlay } from '@store/global/slice';
import { useDispatch } from 'react-redux';
const EmailSendComponent = () => {
  const dispatch = useDispatch();

  return (
    <>
      {/* <PlusButton onClick={() => dispatch(setOpenEmailContactOverlay(true))} /> */}
      <SendEmailOverlay />
    </>
  );
};

export default EmailSendComponent;
