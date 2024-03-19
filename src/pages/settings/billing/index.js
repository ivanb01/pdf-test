import SettingsLayout from '@components/Layout/SettingsLayout';
import PlanOptions from '@components/PlanOptions';
import TopBar from '@components/shared/top-bar';
import { useState } from 'react';

const index = () => {
  const [userInfo, setUserInfo] = useState({});

  return (
    <SettingsLayout>
      <TopBar text="Billing" />
      <div className="p-6">
        <PlanOptions userInfo={userInfo} />
      </div>
    </SettingsLayout>
  );
};

export default index;
