import { getEmailTemplates } from '@api/campaign';
import SettingsLayout from '@components/Layout/SettingsLayout';
import Loader from '@components/shared/loader';
import EditTemplate from '@components/shared/sidebar/edit-template';
import Table from '@components/shared/table';
import TopBar from '@components/shared/top-bar';
import React, { useEffect, useState } from 'react';

const index = () => {
  const [loadingData, setLoadingData] = useState(true);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [emailTemplates, setEmailTemplates] = useState();
  const [currentTemplate, setCurrentTemplate] = useState();

  const fetchEmailTemplates = async () => {
    try {
      const emailResponse = await getEmailTemplates();
      setEmailTemplates(emailResponse.data.data);
      setLoadingData(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEmailTemplates();
  }, []);

  return (
    <SettingsLayout>
      {loadingData ? (
        <div className="h-full relative">
          <Loader />
        </div>
      ) : (
        <>
          <EditTemplate
            title={'Edit Email Template'}
            open={openEdit}
            setOpen={setOpenEdit}
            template={currentTemplate}
          />
          <TopBar text="Email Templates" />
          <hr></hr>
          <Table
            tableFor={'templates'}
            data={emailTemplates}
            setCurrentTemplate={setCurrentTemplate}
            setOpenEdit={setOpenEdit}
            setOpenDelete={setOpenDelete}
          />
        </>
      )}
    </SettingsLayout>
  );
};

export default index;
