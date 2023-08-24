import Layout from 'components/Layout';
import { types } from 'global/variables';
import Uncategorized from 'components/Contacts/uncategorized-content';
import { useState, useEffect } from 'react';
import { setOpenedTab, setOpenedSubtab } from 'store/global/slice';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { getContacts } from 'api/contacts';
import Loader from 'components/shared/loader';
import { getStatuses } from 'api/categorize';
import { setContacts } from 'store/contacts/slice';
import { searchContacts } from 'global/functions';
import dynamic from 'next/dynamic';
const Tour = dynamic(() => import('components/onboarding/tour'), {
  ssr: false,
});

const index = () => {
  const openedTab = useSelector((state) => state.global.openedTab);
  const openedSubtab = useSelector((state) => state.global.openedSubtab);
  const allContacts = useSelector((state) => state.contacts.allContacts);
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [categorizing, setCategorizing] = useState(false);
  const [uncategorizedContactsOriginal, setUncategorizedContactsOriginal] = useState([]);
  const [uncategorizedContacts, setUncategorizedContacts] = useState([]);
  const [selectedUncategorized, setSelectedUncategorized] = useState([]);
  const [selectedUncategorizedContactType, setSelectedUncategorizedContactType] = useState(null);
  const [selectedUncategorizedContactStatus, setSelectedUncategorizedContactStatus] = useState(null);

  const handleSelectUncategorized = (contact, event) => {
    console.log(contact, event.target.checked);
    let row = document.querySelector('#row_' + event.target.id.split('_')[1]);
    if (event.target.checked) {
      row.classList.add('bg-lightBlue1');
      setSelectedUncategorized((prevState) => [...prevState, contact]);
    } else {
      row.classList.remove('bg-lightBlue1');
      let newUncategorized = selectedUncategorized.filter((element) => element.id !== contact.id);
      setSelectedUncategorized(newUncategorized);
    }
  };
  const handleStartCategorizing = (value) => {
    if (value) {
      document.querySelector('.main-menu-wrapper').style.display = 'none';
      setCategorizing(true);
    } else {
      handleFetchUncategorized();
      document.querySelector('.main-menu-wrapper').style.display = 'block';
      setCategorizing(false);
    }
  };

  const searchUncategorized = (term) => {
    let filteredArray = searchContacts(uncategorizedContactsOriginal.data, term);
    setUncategorizedContacts(filteredArray.data);
  };

  const handleFetchUncategorized = () => {
    console.log(allContacts);
    let uncategorized = {
      ...allContacts,
      data: allContacts?.data?.filter((contact) => contact.category_id == 1),
    };
    setUncategorizedContactsOriginal(uncategorized);
    dispatch(setContacts(uncategorized));
    setLoading(false);
    // getContacts('1,').then((data) => {
    //   console.log(data.data, uncategorized);
    // });

    let contacts = uncategorized.data.filter((element) => element.category_id == openedSubtab + 1);
    setUncategorizedContacts(contacts);
    dispatch(setOpenedTab(2));
    // dispatch(setOpenedSubtab(0));
  };

  useEffect(() => {
    // setLoading(true);
    if (router.query.categorize) {
      handleStartCategorizing(true);
      setCategorizing(true);
    }
  }, [router.query.categorize]);
  useEffect(() => {
    if (allContacts.data) {
      handleFetchUncategorized();
    }
  }, [allContacts]);
  // useEffect(() => {
  //   let contacts = uncategorizedContactsOriginal.data.filter(
  //     (element) => element.category_id == openedSubtab + 1
  //   );

  //   console.log('uncategorized cont', uncategorizedContactsOriginal);
  //   setUncategorizedContacts(contacts);
  // }, [openedSubtab]);
  return (
    <Layout>
      {loading ? (
        <Loader />
      ) : (
        <>
          {/* <Tour for={'uncategorized'} /> */}
          <Uncategorized
            handleStartCategorizing={handleStartCategorizing}
            categorizing={categorizing}
            setCategorizing={setCategorizing}
            types={types}
            uncategorizedContacts={uncategorizedContacts}
            setUncategorizedContacts={setUncategorizedContacts}
            selectedUncategorized={selectedUncategorized}
            setSelectedUncategorized={setSelectedUncategorized}
            selectedUncategorizedContactType={selectedUncategorizedContactType}
            setSelectedUncategorizedContactType={setSelectedUncategorizedContactType}
            selectedUncategorizedContactStatus={selectedUncategorizedContactStatus}
            setSelectedUncategorizedContactStatus={setSelectedUncategorizedContactStatus}
            handleSelectUncategorized={handleSelectUncategorized}
            onSearch={searchUncategorized}
          />
        </>
      )}
    </Layout>
  );
};

export default index;

export async function getStaticProps(context) {
  return {
    props: {
      requiresAuth: true,
    },
  };
}
