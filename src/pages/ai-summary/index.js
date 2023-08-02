import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import MainMenu from 'components/shared/menu';
import Table from 'components/shared/table';
import ReviewAIContact from 'components/overlays/review-ai-contact';
import Delete from '@mui/icons-material/Delete';
import CheckCircle from '@mui/icons-material/CheckCircle';
import SimpleBar from 'simplebar-react';
import { getUnapprovedContacts } from 'api/aiSmartSync';
import Loader from 'components/shared/loader';
import { bulkUpdateContacts, updateContact } from '@api/contacts';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

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
      let finalData = response.data.data.filter(
        (contact) => contact.category_1 != 'Uncategorized',
      );
      finalData = finalData.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at),
      );
      setData(finalData);
    } catch (error) {
      console.log('error msg', error.message);
    } finally {
      setLoading(false);
    }
  };
  const updateContactsLocally = (action, newData) => {
    let updatedData = [...data];

    newData.forEach((updateObj) => {
      const id = updateObj.id;
      const element = updatedData.find((item) => item.id === id);

      if (element) {
        const index = updatedData.findIndex((item) => item.id === id);
        updatedData[index] = { ...element, ...updateObj };
      }
    });

    setData(updatedData);
    let toastMessage =
      action == 2
        ? `${selectedPeople.length} contacts moved to Trash`
        : `${selectedPeople.length} contacts marked as correct`;
    toast.success(toastMessage);
  };
  const updateContactLocally = (id, newData) => {
    const element = data.find((item) => item.id == id);
    const updatedData = data.map((item) =>
      item.id === id ? { ...item, ...newData } : item,
    );
    setData(updatedData);
    let toastMessage =
      newData.category_id == 3
        ? `${element.first_name + ' ' + element.last_name} moved to Trash`
        : `${element.first_name + ' ' + element.last_name} marked as correct`;
    toast.success(toastMessage);
  };
  const handleAction = async (type, id) => {
    try {
      let newData = {};

      if (type === 'delete') {
        newData.category_id = 3;
        newData.approved_ai = true;
      } else {
        newData.approved_ai = true;
      }
      updateContact(id, newData);
      updateContactLocally(id, newData);
    } catch (error) {}
  };

  const bulkUpdate = (action) => {
    let transformedData = selectedPeople.map((item) => ({
      id: item.id,
      approved_ai: true,
      category_id: action == 1 ? item.category_id : 3,
    }));
    bulkUpdateContacts(transformedData);
    updateContactsLocally(action, transformedData);
    setSelectedPeople([]);
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
                {
                  data.filter(
                    (item) => item.category_id != 3 && item.approved_ai != true,
                  ).length
                }{' '}
                contacts
              </div>{' '}
              from Smart Synced Contacts need to be reviewed
            </div>
            <Table
              className="pb-5"
              data={data.filter((data) => data.approved_ai != true)}
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
            />
          </SimpleBar>
        </>
      ) : (
        <div>No Data</div>
      )}
      {showReviewOverlay && popupData && (
        <ReviewAIContact
          updateContactLocally={updateContactLocally}
          client={popupData}
          className="w-[1200px]"
          title="Review AI Smart Synced Contact"
          handleClose={() => setShowReviewOverlay(false)}
        />
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
            <button
              onClick={() => bulkUpdate(2)}
              className="hover:bg-red-500 hover:text-white transition-all text-sm min-w-[185px] flex items-center justify-center mr-4 font-medium py-[6px] px-3 rounded-[4px] bg-red-50 text-red-500">
              <Delete /> <span className="ml-2">Move to Trash</span>
            </button>
            <button
              onClick={() => bulkUpdate(1)}
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
