import { getEmailTemplates } from '@api/campaign';
import SettingsLayout from '@components/Layout/SettingsLayout';
import Button from '@components/shared/button';
import Loader from '@components/shared/loader';
import AddTemplate from '@components/shared/sidebar/add-template';
import EditTemplate from '@components/shared/sidebar/edit-template';
import Table from '@components/shared/table';
import TopBar from '@components/shared/top-bar';
import { PlusIcon } from '@heroicons/react/solid';
import React, { useEffect, useState } from 'react';

const index = () => {
  const [loadingData, setLoadingData] = useState(true);
  const [openAdd, setOpenAdd] = useState(false);
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

  const updateDataLocally = (templateId, payload) => {
    setEmailTemplates(
      emailTemplates.map((template) =>
        template.id == templateId
          ? { ...template, subject: payload.subject, body_text: payload.body_text, body_html: payload.body_html }
          : template,
      ),
    );
  };

  const addDataLocally = (templateId, payload) => {
    let newObject = {
      id: templateId,
      body_html: payload.body_html,
      body_text: payload.body_text,
      subject: payload.subject,
      created_at: new Date().toISOString(),
    };
    setEmailTemplates((prevArray) => [...prevArray, newObject]);
  };

  return (
    <SettingsLayout>
      {loadingData ? (
        <div className="h-full relative">
          <Loader />
        </div>
      ) : (
        <>
          <AddTemplate
            isEmail={true}
            title={'Add Email Template'}
            open={openAdd}
            setOpen={setOpenAdd}
            addDataLocally={addDataLocally}
          />
          <EditTemplate
            title={'Edit Email Template'}
            open={openEdit}
            setOpen={setOpenEdit}
            template={currentTemplate}
            updateDataLocally={updateDataLocally}
          />
          <nav className="p-6 flex items-center justify-between">
            <div className="text-gray7 text-lg font-medium">Email Templates</div>
            <Button onClick={() => setOpenAdd(true)} leftIcon={<PlusIcon />} label="Email Template" />
          </nav>
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
