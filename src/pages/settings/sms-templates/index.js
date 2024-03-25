import { deleteSMSTemplate, getEmailTemplates, getSMSTemplates } from '@api/campaign';
import SettingsLayout from '@components/Layout/SettingsLayout';
import ConfirmDelete from '@components/overlays/global/confirm-delete';
import Button from '@components/shared/button';
import Loader from '@components/shared/loader';
import AddTemplate from '@components/shared/sidebar/add-template';
import EditTemplate from '@components/shared/sidebar/edit-template';
import Table from '@components/shared/table';
import TopBar from '@components/shared/top-bar';
import { PlusIcon } from '@heroicons/react/solid';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import emptyState from '/public/images/templates-empty-state.svg';

const index = () => {
  const [loadingData, setLoadingData] = useState(true);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [smsTemplates, setSmsTemplates] = useState();
  const [currentTemplate, setCurrentTemplate] = useState();
  const [loadingDelete, setLoadingDelete] = useState(false);

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

  const updateDataLocally = (templateId, payload) => {
    setSmsTemplates(
      smsTemplates.map((template) =>
        template.id == templateId ? { ...template, name: payload.name, message: payload.message } : template,
      ),
    );
  };

  const addDataLocally = (templateId, payload) => {
    let newObject = {
      id: templateId,
      name: payload.name,
      message: payload.message,
      created_at: new Date().toISOString(),
    };
    setSmsTemplates((prevArray) => [...prevArray, newObject]);
  };

  const handleDelete = async () => {
    let idToDelete = currentTemplate.id;
    setLoadingDelete(true);
    await deleteSMSTemplate(idToDelete);
    let updatedTemplates = smsTemplates.filter((template) => template.id != idToDelete);
    setSmsTemplates(updatedTemplates);
    toast.success('Template was deleted successfully.');
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
            isEmail={false}
            title={'Add SMS Template'}
            open={openAdd}
            setOpen={setOpenAdd}
            addDataLocally={addDataLocally}
          />
          <EditTemplate
            updateDataLocally={updateDataLocally}
            title={'Edit SMS Template'}
            open={openEdit}
            setOpen={setOpenEdit}
            template={currentTemplate}
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
          {smsTemplates && smsTemplates.length ? (
            <>
              <nav className="p-6 flex items-center justify-between">
                <div className="text-gray7 text-lg font-medium">SMS Templates</div>
                <Button onClick={() => setOpenAdd(true)} leftIcon={<PlusIcon />} label="SMS Template" />
              </nav>
              <hr></hr>
              <Table
                tableFor={'templates'}
                data={smsTemplates}
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
                  <div className="text-gray7 text-sm font-medium">You have no SMS templates yet.</div>
                  <div className="text-gray4 text-sm mt-1 mb-6">Try creating one.</div>
                  <Button onClick={() => setOpenAdd(true)} leftIcon={<PlusIcon />} label="SMS Template" />
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
