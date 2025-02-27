import { deleteEmailTemplate, getEmailTemplates } from '@api/campaign';
import SettingsLayout from '@components/Layout/SettingsLayout';
import ConfirmDelete from '@components/overlays/global/confirm-delete';
import Button from '@components/shared/button';
import Loader from '@components/shared/loader';
import AddTemplate from '@components/shared/sidebar/add-template';
import EditTemplate from '@components/shared/sidebar/edit-template';
import { PlusIcon } from '@heroicons/react/solid';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import emptyState from '/public/images/templates-empty-state.svg';
import TemplatesTable from '@components/shared/table/TemplatesTable';

const index = () => {
  const [loadingData, setLoadingData] = useState(true);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState();
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [emailTemplates, setEmailTemplates] = useState();

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

  const handleDelete = async () => {
    let idToDelete = currentTemplate.id;
    setLoadingDelete(true);
    await deleteEmailTemplate(idToDelete);
    let updatedTemplates = emailTemplates.filter((template) => template.id != idToDelete);
    setEmailTemplates(updatedTemplates);
    toast.success('Email template was deleted successfully.');
    setOpenDelete(false);
    setLoadingDelete(false);
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
          <ConfirmDelete
            open={openDelete}
            setOpen={setOpenDelete}
            title={'Delete template'}
            message={
              'This will permanently delete this template and you will not be able to use it anymore. This action is irreversible. Are you sure you want to delete?'
            }
            buttonLabel={'Yes, delete'}
            handleConfirm={handleDelete}
            loading={loadingDelete}
          />
          {emailTemplates && emailTemplates.length ? (
            <>
              <nav className="p-6 flex items-center justify-between">
                <div className="text-gray7 text-lg font-medium">Email Templates</div>
                <Button onClick={() => setOpenAdd(true)} leftIcon={<PlusIcon />} label="Email Template" />
              </nav>
              <hr></hr>
              <TemplatesTable
                tableFor={'templates'}
                data={emailTemplates}
                setCurrentTemplate={setCurrentTemplate}
                setOpenEdit={setOpenEdit}
                setOpenDelete={setOpenDelete}
              />
            </>
          ) : (
            <div className="bg-[#F5F5F5] h-full w-full flex items-center justify-center">
              <div className="text-center">
                <img src={emptyState.src} />
                <div>
                  <div className="text-gray7 text-sm font-medium">You have no email templates yet.</div>
                  <div className="text-gray4 text-sm mt-1 mb-6">Try creating one for the first time.</div>
                  <Button onClick={() => setOpenAdd(true)} leftIcon={<PlusIcon />} label="Email Template" />
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </SettingsLayout>
  );
};

export default index;
