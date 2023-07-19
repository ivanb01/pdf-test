import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import MainMenu from 'components/shared/menu';
import Table from 'components/shared/table';
import ReviewAIContact from 'components/overlays/review-ai-contact';
import Delete from '@mui/icons-material/Delete';
import CheckCircle from '@mui/icons-material/CheckCircle';
import SimpleBar from 'simplebar-react';
import { getUnapprovedContacts } from 'api/aiSmartSync';
import Loader from 'components/shared/loader';

const index = () => {
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
      setData(response);
    } catch (error) {
      console.log('error msg', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="">
      <MainMenu />
      {loading ? (
        <div style={{ height: 'calc(100vh - 68px)' }} className="relative">
          <Loader />
        </div>
      ) : data ? (
        <SimpleBar
          autoHide={true}
          style={{
            height: '100%',
            maxHeight:
              selectedPeople.length > 1
                ? 'calc(100vh - 136px);'
                : 'calc(100vh - 68px);',
          }}
        >
          <Table
            className="pb-5"
            data={data}
            tableFor="ai-summary"
            checkbox={checkbox}
            checked={checked}
            toggleAll={toggleAll}
            selectedPeople={selectedPeople}
            setSelectedPeople={setSelectedPeople}
            handleCardEdit={(item) => {
              setPopupData(item);
              setShowReviewOverlay(true);
            }}
          />
        </SimpleBar>
      ) : (
        <div>No Data</div>
      )}
      {showReviewOverlay && popupData && (
        <ReviewAIContact
          client={popupData}
          className="w-[1200px]"
          title="Review AI Smart Synced Contact"
          handleClose={() => setShowReviewOverlay(false)}
        ></ReviewAIContact>
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
              className="hover:bg-[#10B981] hover:text-white transition-all text-sm min-w-[185px] flex items-center justify-center font-medium py-[6px] px-3 rounded-[4px] bg-green-50 text-[#10B981]"
            >
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
