import { getEmailTemplates, getSMSTemplates } from '@api/campaign';
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
  const [smsTemplates, setSmsTemplates] = useState();
  const [currentTemplate, setCurrentTemplate] = useState();

  const fetchSMSTemplates = async () => {
    try {
      const smsResponse = await getSMSTemplates();
      setSmsTemplates(smsResponse.data.data);
      setLoadingData(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSMSTemplates();
  }, []);

  return (
    <SettingsLayout>
      {loadingData ? (
        <div className="h-full relative">
          <Loader />
        </div>
      ) : (
        <>
          <EditTemplate title={'Edit SMS Template'} open={openEdit} setOpen={setOpenEdit} template={currentTemplate} />
          <TopBar text="SMS Templates" />
          <hr></hr>
          <Table
            tableFor={'templates'}
            data={smsTemplates}
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
