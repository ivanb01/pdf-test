import SettingsLayout from '@components/Layout/SettingsLayout';
import PlanOptions from '@components/PlanOptions';
import TopBar from '@components/shared/top-bar';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const index = () => {
  const userInfo = useSelector((state) => state.global.userInfo);

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
