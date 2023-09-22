import { useEffect, useState } from 'react';
import { PlusCircleIcon } from '@heroicons/react/solid';
import { MinusCircleIcon } from '@heroicons/react/solid';
import Feeds from 'components/shared/feeds';
import Text from 'components/shared/text';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import GoogleContact from '../../../../../public/images/googleContact.png';
import { useFormik } from 'formik';
import Button from 'components/shared/button';
import TextArea from 'components/shared/textarea';
import * as contactServices from 'api/contacts';
import Dropdown from 'components/shared/dropdown';
import noActivityLog from '/public/images/no_activitylog.svg';
import Image from 'next/image';
import * as Yup from 'yup';
import { activityTypes } from 'global/variables';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setRefetchData } from 'store/global/slice';
import SimpleBar from 'simplebar-react';
import Loader from '@components/shared/loader';
import { getAIData } from '@api/aiSmartSync';
import AIChip from '@components/shared/chip/ai-chip';
import linkIcon from '/public/images/link.svg';
import AddActivity from '@components/overlays/add-activity';

export default function ActivityLog({ contactId, source, contact }) {
  const dispatch = useDispatch();
  const [aiPreview, setAiPreview] = useState(null);
  const [aiPreviewLoading, setAiPreviewLoading] = useState(true);
  const [toggleAddActivity, setToggleAddActivity] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);

  const refetchData = useSelector((state) => state.global.refetchData);

  const activityLogData = useSelector((state) => state.clientDetails.activityLogData);
  const [activityLogLocal, setActivityLogLocal] = useState(activityLogData);

  useEffect(() => {
    console.log(activityLogData, 'activityLogData');
  }, [activityLogData]);
  const fetchAiPreview = async (id) => {
    try {
      const { data } = await getAIData(id);
      setAiPreview(data);
    } catch (error) {
      console.log(error);
    } finally {
      setAiPreviewLoading(false);
    }
  };
  useEffect(() => {
    console.log(source);
  }, [source]);
  useEffect(() => {
    if (source == 'GmailAI') fetchAiPreview(contactId);
  }, []);
  const getSource = (source) => {
    if (source === 'GmailAI') {
      return {
        name: 'AI Smart Synced Contact.',
        icon: <AIChip reviewed={!!contact.approved_ai} />,
      };
    } else if (source === 'Manually Added') {
      return {
        name: 'Contact Added Manually',
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M6.04175 13.9584H11.4584V12.7084H6.04175V13.9584ZM6.04175 10.625H13.9584V9.37508H6.04175V10.625ZM6.04175 7.29171H13.9584V6.04175H6.04175V7.29171ZM4.42316 17.0834C4.00222 17.0834 3.64591 16.9375 3.35425 16.6459C3.06258 16.3542 2.91675 15.9979 2.91675 15.577V4.42317C2.91675 4.00222 3.06258 3.64591 3.35425 3.35425C3.64591 3.06258 4.00222 2.91675 4.42316 2.91675H15.577C15.9979 2.91675 16.3542 3.06258 16.6459 3.35425C16.9375 3.64591 17.0834 4.00222 17.0834 4.42317V15.577C17.0834 15.9979 16.9375 16.3542 16.6459 16.6459C16.3542 16.9375 15.9979 17.0834 15.577 17.0834H4.42316Z"
              fill="#9CA3AF"
            />
          </svg>
        ),
      };
    } else {
      return {
        name: 'Google Contact',
        icon: GoogleContact,
      };
    }
  };

  useEffect(() => {
    if (toggleAddActivity) {
      document.querySelector('.client-details-wrapper').style.setProperty('z-index', '0', 'important');
    } else {
      document.querySelector('.client-details-wrapper').style.setProperty('z-index', '10', 'important');
    }
  }, [toggleAddActivity]);

  useEffect(() => {
    setActivityLogLocal(activityLogData);
  }, [activityLogData]);

  return (
    <div className="flex bg-gray10 flex-row gap-6" style={{ height: '72vh' }}>
      <div className="w-1/2 bg-gray10 m-6 mr-0">
        <div className="bg-white flex flex-row justify-between p-6">
          <Text className="text-gray7" p>
            Activities
          </Text>
          <div onClick={() => setToggleAddActivity(!toggleAddActivity)} className=" cursor-pointer">
            {!toggleAddActivity ? (
              <PlusCircleIcon className="text-gray3 px-4" height={20} />
            ) : (
              <MinusCircleIcon className="text-red4 px-4" height={20} />
            )}
          </div>
        </div>
        {toggleAddActivity && (
          <AddActivity
            clientId={contactId}
            setActivities={setActivityLogLocal}
            className="min-w-[550px]"
            title={`Add Activity`}
            setAddActivityPopup={setToggleAddActivity}
            handleClose={() => setToggleAddActivity(false)}
          />
        )}
        <div className="mx-6">
          <hr />
        </div>
        {activityLogLocal &&
          (activityLogLocal.length == 0 ? (
            <div className="flow-root bg-white py-8 ">
              <div className="flex flex-col items-center justify-center h-full max-w-[350px] mx-auto my-0">
                <Image height={40} src={noActivityLog}></Image>
                <Text h3 className="text-gray7 mb-2 mt-4 text-center text-sm">
                  There is no activity logged for this contact
                </Text>
                <Text p className="text-gray4 relative text-center text-xs">
                  All activities related with this contact will be shown here.
                </Text>
              </div>
            </div>
          ) : (
            <Feeds contactId={contactId} activities={activityLogLocal} setActivities={setActivityLogLocal} />
          ))}
      </div>
      <div className="w-1/2 h-full m-6 ml-0">
        <div className=" bg-white p-6 relative">
          <>
            <div className={'flex justify-between items-center mb-4'}>
              <h5 className={'text-sm leading-5 font-medium text-gray7'}>Contact summary</h5>
              <MoreVertIcon className={'h-5 w-5 text-gray3'} />
            </div>
            <div className={'flex justify-between items-center pb-3 border-b border-gray2'}>
              <h6 className={'text-sm leading-5 font-medium text-gray4'}>Imported from</h6>
              <div className={'flex gap-1 items-center justify-center'}>
                <div>{getSource(source).icon}</div>
                <p className={'text-sm leading-5 font-medium text-gray7 '}>{getSource(source).name}</p>
              </div>
            </div>
            {contact.summary === null ? (
              <div className={'mt-10 flex items-center justify-center'}>
                <p className={'text-gray7 text-center text-base font-medium'}>No Summary for this Contact yet</p>
              </div>
            ) : (
              <div>erza</div>
            )}
          </>
        </div>
      </div>
    </div>
  );
}
