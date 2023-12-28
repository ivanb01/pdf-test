import Overlay from '@components/shared/overlay';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import React, { useState } from 'react';
import TextArea from '@components/shared/textarea';
import Button from '@components/shared/button';
import toast from 'react-hot-toast';
import { addContactNote, updateContactNote } from '@api/contacts';

const NoteModal = ({ note, handleCloseModal, action, setNotes, id }) => {
  const [loadingButton, setLoadingButton] = useState(false);

  const AddNoteSchema = Yup.object().shape({
    description: Yup.string().required('Description required'),
  });

  const formik = useFormik({
    initialValues: {
      // title: '',
      description: note ? note.description : '',
    },
    validationSchema: AddNoteSchema,
    onSubmit: (values) => {
      if (note) {
        handleEditSubmit(values);
      } else {
        handleAddSubmit(values);
      }
    },
  });

  const { errors, touched, resetForm } = formik;

  const handleAddSubmit = async (values) => {
    try {
      setLoadingButton(true);
      const newNote = {
        id: Date.now().toString(),
        description: values.description,
        created_at: new Date().toISOString(),
      };
      handleCloseModal();
      console.log(newNote);
      setNotes((prevNotes) => [...prevNotes, newNote]);
      // setNotes([...(notesData || []), newNote]);
      console.log(newNote);
      toast.success('Note added successfully');
      addContactNote(id, values);
    } catch (error) {
      toast.error(error);
      setLoadingButton(false);
    }
  };

  const handleEditSubmit = async (values) => {
    try {
      setLoadingButton(true);
      handleCloseModal();
      // console.log(note.id, id, values);
      setNotes((prevNotes) =>
        prevNotes.map((existingNote) => (existingNote.id === note.id ? { ...existingNote, ...values } : existingNote)),
      );
      toast.success('Note edited successfully');
      updateContactNote(id, note.id, values);
    } catch (error) {
      toast.error(error);
      setLoadingButton(false);
    }
  };

  return (
    <Overlay className="w-[632px]" handleCloseOverlay={handleCloseModal} title={note ? `Edit Note` : `Add Note`}>
      <div className="p-6 pt-0 bg-white">
        <form onSubmit={formik.handleSubmit}>
          <TextArea
            className="min-h-[120px]"
            id="description"
            label="Description"
            handleChange={formik.handleChange}
            value={formik.values.description}
            error={errors.description && touched.description}
            errorText={errors.description}
          />
          <div className="flex flex-row justify-end mt-6">
            <Button className="mr-3" white label="Cancel" onClick={handleCloseModal} />
            <Button type="submit" primary label="Save" loading={loadingButton} />
          </div>
        </form>
      </div>
    </Overlay>
  );
};

export default NoteModal;
