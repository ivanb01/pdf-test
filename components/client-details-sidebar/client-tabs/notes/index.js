import { useEffect, useState } from 'react';
import { PlusCircleIcon } from '@heroicons/react/outline';
import { MinusCircleIcon } from '@heroicons/react/solid';
import Feeds from 'components/shared/feeds';
import Text from 'components/shared/text';
// import { inputs, notes } from './list';
import Button from 'components/shared/button';
import Input from 'components/shared/input';
import { useFormik } from 'formik';
import TextArea from 'components/shared/textarea';
import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import FilterDropdown from 'components/shared/dropdown/FilterDropdown';
import More from '@mui/icons-material/MoreVert';
import { Add } from '@mui/icons-material';
import Search from 'components/shared/input/search';
import Overlay from 'components/shared/overlay';
import * as contactServices from 'api/contacts';
import noNotes from 'public/images/notes-empty.svg';
import Image from 'next/image';

export default function Notes({ contactId }) {
  const [noteModal, setNoteModal] = useState(false);
  const [formType, setFormType] = useState('Add');
  const [noteId, setNoteId] = useState(0);
  const [notes, setNotes] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [fetchRequired, setFetchRequired] = useState({});

  const openAddModal = () => {
    setFormType('Add');
    setNoteModal(true);
  };
  const openEditModal = () => {
    setFormType('Edit');
    setNoteModal(true);
  };

  //* FORMIK *//
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
    },
    onSubmit: (values) => {
      formType === 'Add' ? handleAddSubmit(values) : handleUpdateSubmit(values);
    },
  });

  const handleAddSubmit = async (values) => {
    try {
      const res = await contactServices.addContactNote(contactId, values);
      console.log('res', res);
      console.log('Add', 'note_id', noteId, 'values', values);
      handleCloseModal();
      setFetchRequired((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateSubmit = async (values) => {
    try {
      const { data } = await contactServices.updateContactNote(
        contactId,
        noteId,
        values
      );
      console.log('Update', 'note_id', noteId, 'values', values);
      handleCloseModal();
      setFetchRequired((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseModal = () => {
    setFormType('Add');
    formik.setValues({
      title: '',
      description: '',
    });
    setNoteModal(false);
    setNoteId(0);
  };

  const handleEditNote = (note) => {
    console.log('to edit', note);
    formik.setValues({
      title: note.title,
      description: note.description,
    });
    setNoteId(note.id);
    openEditModal();
  };

  const handleDeleteNote = async (note) => {
    try {
      const { data } = await contactServices.deleteContactNote(
        contactId,
        note.id
      );
      console.log('Delete', 'note_id', note.id);
      setFetchRequired((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  const types = [
    {
      name: (
        <span className="flex flex-row">
          <Edit className="text-gray6 mr-3 w-4" />
          <Text smallText className="text-gray6">
            Edit Note
          </Text>
        </span>
      ),
      handleClick: handleEditNote,
    },
    {
      name: (
        <span className="flex flex-row">
          <Delete height={15} className="text-red5 mr-3 w-4" />
          <Text smallText className="text-red5">
            Delete Note
          </Text>
        </span>
      ),
      handleClick: handleDeleteNote,
    },
  ];

  const fetchContactNotes = async () => {
    try {
      const { data } = await contactServices.getContactNotes(contactId, {
        search_term: searchTerm,
      });
      console.log('all notes', contactId, data?.data);
      setNotes(data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log('test from notes');
    fetchContactNotes();
  }, [fetchRequired, searchTerm, contactId]);

  return (
    <>
      <div className="details-tabs-fixed-height overflow-y-scroll">
        {notes.length == 0 ? (
          <div className="h-full">
            <div className="flex flex-col items-center justify-center h-full max-w-[350px] mx-auto my-0">
              <Image src={noNotes}></Image>
              <Text h3 className="text-gray7 mb-2 mt-4 text-center">
                You don’t have any notes for this client yet
              </Text>
              <Text p className="text-gray4 relative text-center mb-6">
                All notes about this client will be placed here.
              </Text>
              <Button
                primary
                leftIcon={<Add className="w-4 h-4" />}
                label={`${formType} Note`}
                onClick={openAddModal}
              />
            </div>
          </div>
        ) : (
          <>
            <div className="p-6 pb-0 flex items-center justify-between">
              {/* <div className="flex items-center justify-between w-full"> */}
              <div className="w-[50%] flex items-center">
                <Search
                  placeholder="Search"
                  className="w-[100%] mr-6"
                  onChange={(event) => setSearchTerm(event.target.value)}
                  value={searchTerm}
                />
              </div>
              <Button
                primary
                leftIcon={<Add className="w-4 h-4" />}
                label={`${formType} Note`}
                onClick={openAddModal}
              />
              {/* </div> */}
              {/* </div> */}
            </div>
            <div className="flex bg-gray10 flex-wrap p-[12px]">
              {Array.isArray(notes) &&
                notes.length > 0 &&
                notes.map((note) => (
                  <div key={note.id} className="w-[50%] bg-gray10">
                    <div className="bg-white m-[12px] p-6 rounded-lg shadow">
                      <div className="flex justify-between">
                        <div className="pr-12">
                          <Text p className="mb-1">
                            {note.title}
                          </Text>
                          <Text p className="text-gray4">
                            {note.description}
                          </Text>
                          <Text className="text-gray4 text-xs mt-2 italic">
                            {note.date}
                          </Text>
                        </div>
                        <div className="flex">
                          <FilterDropdown
                            types={types}
                            icon={<More className="w-5" />}
                            data={note}
                          />
                          {/* <a href="" className="mr-4">
                            <Edit className="w-4" />
                          </a>
                          <a href="">
                            <Delete className="w-4" />
                          </a> 
                      */}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            {/* <hr className="my-7" /> */}
          </>
        )}
      </div>
      {noteModal && (
        <Overlay
          className="w-[632px]"
          handleCloseOverlay={handleCloseModal}
          title={`${formType} Note`}
        >
          <div className="p-6 bg-white">
            <form onSubmit={formik.handleSubmit}>
              <Input
                type="text-area"
                id="title"
                label="Title"
                className="mb-6"
                onChange={formik.handleChange}
                value={formik.values.title}
              />
              <TextArea
                className="mb-6 min-h-[120px]"
                // height="min-h-[120px]"
                id="description"
                label="Description"
                handleChange={formik.handleChange}
                value={formik.values.description}
              ></TextArea>
              <div className="flex flex-row justify-end">
                <Button
                  size="small"
                  className="mr-3"
                  white
                  label="Cancel"
                  onClick={handleCloseModal}
                />
                <Button type="submit" size="small" primary label="Save" />
              </div>
            </form>
          </div>
        </Overlay>
      )}
    </>
  );
}
