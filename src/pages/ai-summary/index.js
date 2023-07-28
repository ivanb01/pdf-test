import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import MainMenu from 'components/shared/menu';
import Table from 'components/shared/table';
import ReviewAIContact from 'components/overlays/review-ai-contact';
import Delete from '@mui/icons-material/Delete';
import CheckCircle from '@mui/icons-material/CheckCircle';
import SimpleBar from 'simplebar-react';
import { getUnapprovedContacts } from 'api/aiSmartSync';
import Loader from 'components/shared/loader';
import { updateContact } from '@api/contacts';
import { useRouter } from 'next/router';

const index = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const checkbox = useRef();
  const [popupData, setPopupData] = useState();
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const [selectedPeople, setSelectedPeople] = useState([]);
  const [showReviewOverlay, setShowReviewOverlay] = useState(false);

  useLayoutEffect(() => {
    if (data) {
      const isIndeterminate =
        selectedPeople.length > 0 && selectedPeople.length < data.length;
      setChecked(selectedPeople.length === data.length);
      setIndeterminate(isIndeterminate);
      checkbox.current.indeterminate = isIndeterminate;
    }
  }, [selectedPeople]);

  const toggleAll = () => {
    setSelectedPeople(checked || indeterminate ? [] : data);
    setChecked(!checked && !indeterminate);
    setIndeterminate(false);
  };

  const fetchContacts = async () => {
    try {
      const response = await getUnapprovedContacts();
      setData(response.data.data);
    } catch (error) {
      console.log('error msg', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (type, data) => {
    try {
      let newData;
      if (type == 'delete') {
        newData = {
          ...data,
          category_id: 3,
          approved_ai: true,
        };
      } else {
        newData = { ...data, approved_ai: true };
      }
      await updateContact(newData.id, newData);
      fetchContacts();
    } catch (error) {}
  };

  useEffect(() => {
    fetchContacts();
  }, [showReviewOverlay]);

  return (
    <div className="">
      <MainMenu />
      {loading ? (
        <div style={{ height: 'calc(100vh - 68px)' }} className="relative">
          <Loader />
        </div>
      ) : data ? (
        <>
          <SimpleBar
            autoHide={true}
            style={{
              height: '100%',
              maxHeight:
                selectedPeople.length > 1
                  ? 'calc(100vh - 136px)'
                  : 'calc(100vh - 68px)',
            }}>
            <div className="p-6 text-gray-900 font-medium text-base">
              <div className=" p-2 mr-3 border-blue-500 border bg-blue-50 text-blue-600 font-semibold rounded-lg inline-block">
                {data.length} contacts
              </div>{' '}
              from Smart Synced Contacts need to be reviewed
            </div>
            <Table
              className="pb-5"
              data={data}
              tableFor="ai-summary"
              checkbox={checkbox}
              handleAction={handleAction}
              checked={checked}
              toggleAll={toggleAll}
              selectedPeople={selectedPeople}
              setSelectedPeople={setSelectedPeople}
              handleCardEdit={(item) => {
                setPopupData(item);
                setShowReviewOverlay(true);
              }}
              handleClickRow={(data, event) => {
                if (event.target.type == 'checkbox') {
                  return;
                } else {
                  router.push({
                    pathname: '/contacts/details',
                    query: { id: data.id },
                  });
                }
              }}
            />
          </SimpleBar>
        </>
      ) : (
        <div>No Data</div>
      )}
      {showReviewOverlay && popupData && (
        <ReviewAIContact
          client={popupData}
          className="w-[1200px]"
          title="Review AI Smart Synced Contact"
          handleClose={() => setShowReviewOverlay(false)}></ReviewAIContact>
      )}
      {selectedPeople.length > 1 && (
        <div className="bg-white fixed left-0 right-0 bottom-0 flex items-center justify-between py-4 px-6 space-x-2 fixed-categorize-menu">
          <div className="flex items-center text-sm text-gray-900">
            Selected:{' '}
            <span className="font-bold ml-1">
              {selectedPeople.length} contacts
            </span>
          </div>
          <div className="flex">
            <button className="hover:bg-red-500 hover:text-white transition-all text-sm min-w-[185px] flex items-center justify-center mr-4 font-medium py-[6px] px-3 rounded-[4px] bg-red-50 text-red-500">
              <Delete /> <span className="ml-2">Delete from CRM</span>
            </button>
            <button
              // rightIcon={<ArrowRightIcon height={15} />}
              className="hover:bg-[#10B981] hover:text-white transition-all text-sm min-w-[185px] flex items-center justify-center font-medium py-[6px] px-3 rounded-[4px] bg-green-50 text-[#10B981]">
              <CheckCircle />
              <span className="ml-2">Mark as Correct</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default index;
