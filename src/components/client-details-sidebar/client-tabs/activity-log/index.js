import { useEffect, useState } from 'react';
import { PlusCircleIcon } from '@heroicons/react/solid';
import { MinusCircleIcon } from '@heroicons/react/solid';
import Feeds from 'components/shared/feeds';
import Text from 'components/shared/text';
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

export default function ActivityLog({ contactId, source }) {
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
    if (source == 'GmailAI') fetchAiPreview(contactId);
  }, []);

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
    <SimpleBar autoHide style={{ maxHeight: 'calc(100vh - 222px)' }}>
      <div className="flex bg-gray10 flex-row" style={{ minHeight: 'calc(100vh - 222px)' }}>
        <div className="w-1/2 bg-gray10 p-[24px] pr-0">
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
              <div className="flow-root bg-white h-auto py-8">
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

        {source == 'GmailAI' && (
          <div className="w-1/2 m-[24px]">
            <div className="h-auto min-h-[150px] bg-white p-6 relative">
              {aiPreviewLoading ? (
                <Loader />
              ) : (
                <div className="text-gray-900 text-sm">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <AIChip reviewed={true} />
                      <span className="ml-1">AI Smart Synced Contact</span>
                    </div>
                    <div>
                      <a
                        href={aiPreview?.email_link}
                        target="_blank"
                        className=" text-xs underline flex items-center text-gray-900"
                        rel="noreferrer">
                        View in Gmail
                        <span className="ml-1">
                          <img src={linkIcon.src} />
                        </span>
                      </a>
                    </div>
                  </div>
                  <div className="">{aiPreview?.ai_email_summary}</div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </SimpleBar>
  );
}
