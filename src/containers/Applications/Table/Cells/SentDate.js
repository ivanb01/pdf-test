import moment from 'moment';
import { useState } from 'react';
import SendApplicationModal from 'containers/Applications/SendApplicationModal';
import Button from '@components/shared/button';
import NoteIcon from '@mui/icons-material/Note';

export const SentOnCell = ({ info }) => {
  const sentOn = info.row.original.sent_by_email_at;
  var date = moment(sentOn).format('MMM DD,YYYY');
  var time = moment(sentOn).format('HH:mm');

  const [showModal, setShowModal] = useState(false);

  const handleSendEmail = (e) => {
    e.stopPropagation();
    setShowModal(true);
  };

  return (
    <div className="min-w-[150px] flex flex-col items-center px-4">
      {showModal && <SendApplicationModal onClose={() => setShowModal(false)} applicationData={info.row.original} />}

      {info.row.original.sent_by_email_at ? (
        <div className="flex flex-col items-center min-w-[150px] px-6  ">
          <p>{date}</p>
          <p className="font-normal text-gray4">{time}</p>
          <button onClick={handleSendEmail} className="text-lightBlue3">
            Re-Send
          </button>
        </div>
      ) : (
        <Button className={'w-min'} onClick={handleSendEmail} leftIcon={<NoteIcon className="w-4 h-4 mr-1" />}>
          Send
        </Button>
      )}
    </div>
  );
};
