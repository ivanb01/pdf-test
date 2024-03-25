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
            title={'Are you sure you want to delete sms template?'}
            message={'This will permanently delete this template. You will not be able to recover it anymore.'}
            buttonLabel={'Yes, delete'}
            handleConfirm={handleDelete}
            loading={loadingDelete}
          />
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
      )}
    </SettingsLayout>
  );
};

export default index;
