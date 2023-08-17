import { useEffect, useState } from 'react';
import Text from 'components/shared/text';
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
import noNotes from '/public/images/notes-empty.svg';
import Image from 'next/image';
import * as Yup from 'yup';
import { formatDateLL } from 'global/functions';
import SimpleBar from 'simplebar-react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setRefetchData } from 'store/global/slice';

export default function Notes({ contactId }) {
  const dispatch = useDispatch();
  const [noteModal, setNoteModal] = useState(false);
  const [formType, setFormType] = useState('Add');
  const [noteId, setNoteId] = useState(0);
  const [notes, setNotes] = useState(null);
  const [notesOriginal, setNotesOriginal] = useState(null);
  // const [searchTerm, setSearchTerm] = useState('');
  const refetchData = useSelector((state) => state.global.refetchData);
  const [loadingButton, setLoadingButton] = useState(false);
  const notesData = useSelector((state) => state.clientDetails.notesData);

  const openAddModal = () => {
    setFormType('Add');
    setNoteModal(true);
  };
  const openEditModal = () => {
    setFormType('Edit');
    setNoteModal(true);
  };

  const AddNoteSchema = Yup.object().shape({
    title: Yup.string().required('Title required'),
    description: Yup.string().required('Description required'),
  });

  //* FORMIK *//
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
    },
    validationSchema: AddNoteSchema,
    onSubmit: (values) => {
      formType === 'Add' ? handleAddSubmit(values) : handleUpdateSubmit(values);
    },
  });

  const { errors, touched, resetForm } = formik;

  const handleAddSubmit = async (values) => {
    setLoadingButton(true);
    try {
      await contactServices.addContactNote(contactId, values);
      dispatch(setRefetchData(true));
      // setFetchRequired((prev) => !prev);
      // setNotes(prev=>[...prev, tagToAdd])
      setLoadingButton(false);
      handleCloseModal();
    } catch (error) {
      console.log(error);
      setLoadingButton(false);
    }
  };

  const handleUpdateSubmit = async (values) => {
    setLoadingButton(true);
    try {
      await contactServices.updateContactNote(contactId, noteId, values);
      dispatch(setRefetchData(true));
      setLoadingButton(false);
      handleCloseModal();
    } catch (error) {
      console.log(error);
      setLoadingButton(false);
    }
  };

  const handleCloseModal = () => {
    setNoteModal(false);
    setNoteId(0);
    setFormType('Add');
    resetForm();
  };

  const handleEditNote = (note) => {
    formik.setValues({
      title: note.title,
      description: note.description,
    });
    setNoteId(note.id);
    openEditModal();
  };

  const handleDeleteNote = async (note) => {
    try {
      setNotes((prev) => prev.filter((item) => item.id !== note.id));
      await contactServices.deleteContactNote(contactId, note.id);
      dispatch(setRefetchData(true));
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
    // const { data } = await contactServices.getContactNotes(contactId, {
    //   search_term: searchTerm,
    // });
    // const { data } = await contactServices.getContactNotes(contactId);

    // console.log('all notes', activityLogData);
    setNotes(notesData);
    setNotesOriginal(notesData);
  };

  useEffect(() => {
    fetchContactNotes();
  }, [refetchData, contactId]);

  const onSearch = (term) => {
    const trimmedTerm = term.replace(/\s+/g, '').toLowerCase();
    const filteredArray = notesOriginal.filter((note) => {
      const title = note?.title.toLowerCase();
      const description = note?.description.toLowerCase();
      return title.includes(trimmedTerm) || description.includes(trimmedTerm);
    });
    setNotes(filteredArray);
  };

  return (
    <>
      <SimpleBar
        autoHide
        style={{
          maxHeight: 'calc(100vh - 222px)',
        }}
      >
        {notesOriginal &&
          (notesOriginal.length == 0 ? (
            <div className="h-full">
              <div
                className="flex flex-col items-center justify-center h-full max-w-[350px] mx-auto my-0"
                style={{ minHeight: 'calc(100vh - 222px)' }}
              >
                <Image src={noNotes}></Image>
                <Text h3 className="text-gray7 mb-2 mt-4 text-center">
                  You don’t have any notes for this contact yet
                </Text>
                <Text p className="text-gray4 relative text-center mb-6">
                  All notes about this contact will be placed here.
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
                    // onChange={(event) => setSearchTerm(event.target.value)}
                    onInput={(event) => onSearch(event.target.value)}
                    // value={searchTerm}
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
                  notes
                    .slice()
                    .sort((a, b) => b.id - a.id)
                    .map((note) => (
                      <div key={note.id} className="w-[50%] bg-gray10">
                        <div className="bg-white m-[12px] p-6 rounded-lg shadow">
                          <div className="flex justify-between">
                            <div className="pr-12 w-full">
                              <Text p className="mb-1">
                                {note?.title}
                              </Text>

                              <div className={`w-full h-[84px] relative `}>
                                <SimpleBar autoHide style={{ maxHeight: '100%' }}>
                                  <div className="text-sm font-normal text-gray4 flex items-start">
                                    {note?.description}
                                  </div>
                                </SimpleBar>
                              </div>
                              <Text className="text-gray4 text-xs mt-2">
                                {formatDateLL(note.updated_at ? note.updated_at : note.created_at)}
                              </Text>
                            </div>
                            <div className="flex">
                              <FilterDropdown
                                types={types}
                                icon={<More className="w-5" />}
                                data={note}
                                positionClass="right-0"
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
          ))}
      </SimpleBar>

      {noteModal && (
        <Overlay className="w-[632px]" handleCloseOverlay={handleCloseModal} title={`${formType} Note`}>
          <div className="p-6 bg-white">
            <form onSubmit={formik.handleSubmit}>
              <Input
                type="text-area"
                id="title"
                label="Title"
                className="mb-6"
                onChange={formik.handleChange}
                value={formik.values.title}
                error={errors.title && touched.title}
                errorText={errors.title}
              />
              <TextArea
                className="min-h-[120px]"
                // height="min-h-[120px]"
                id="description"
                label="Description"
                handleChange={formik.handleChange}
                value={formik.values.description}
                error={errors.description && touched.description}
                errorText={errors.description}
              ></TextArea>
              <div className="flex flex-row justify-end mt-6">
                <Button className="mr-3" white label="Cancel" onClick={handleCloseModal} />
                <Button type="submit" primary label="Save" loading={loadingButton} />
              </div>
            </form>
          </div>
        </Overlay>
      )}
    </>
  );
}
