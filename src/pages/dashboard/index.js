import AgentDashboardLayout from '@components/Layout/AgentDashboardLayout';
import MainMenu from '@components/shared/menu';
import { getCount } from '@api/contacts';
import { setCount } from '@store/global/slice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getGoogleAuthCallback } from '@api/google';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.global.count);
  const [success, setIsSuccess] = useState(true);
  const router = useRouter();

  useEffect(() => {
    console.log(count, 'count');
  }, [count]);
  const fetchCount = async () => {
    setIsSuccess(false);
    getCount().then((data) => {
      dispatch(setCount(data.data));
      setIsSuccess(true);
    });
  };

  useEffect(() => {
    if (!count) {
      fetchCount();
    }
  }, [count]);

  useEffect(() => {
    const queryParams = {};
    for (const [key, value] of Object.entries(router.query)) {
      queryParams[key] = value;
    }
    if (Object.keys(queryParams).length > 0) {
      console.log(queryParams, 'queryParams');
      if (queryParams?.start_importing) {
        return;
      } else if (queryParams?.code && queryParams?.authuser) {
        getGoogleAuthCallback(queryParams, '/dashboard');
      }
    }
  }, [router.query]);
  return (
    <>
      <div className={'sticky z-[10] top-0'}>
        <MainMenu />
      </div>
      <AgentDashboardLayout
        success={success}
        needToContactCount={count?.need_to_contact_clients}
        needToReview={count?.gmail_and_ai_unapproved}
      />
    </>
  );
}
