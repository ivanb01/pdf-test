import PlusButton from '@components/PlusButton';
import SendEmailOverlay from '@components/SendEmailSidebar';
import { setOpenEmailContactOverlay } from '@store/global/slice';
import { useDispatch } from 'react-redux';
const EmailSendComponent = () => {
  const dispatch = useDispatch();

  return (
    <>
      <PlusButton onClick={() => dispatch(setOpenEmailContactOverlay(true))} />
      <SendEmailOverlay />
    </>
  );
};

export default EmailSendComponent;
