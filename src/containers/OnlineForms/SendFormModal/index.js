import Button from 'components/shared/button';
import Overlay from 'components/shared/overlay';
import Dropdown from '@components/shared/dropdown';
import { useFetchOnlineFormsTypes } from '../queries/queries';
import { useAssignForm } from '../queries/mutations';
import { useFormik } from 'formik';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import ClientDropdown from '@components/shared/dropdown/ClientsDropdown';

const SendForm = ({ params, onCancel, currentForm }) => {
  const contacts = useSelector((state) => state.contacts.allContacts.data);
  const router = useRouter();
  const { data: formsTypesData } = useFetchOnlineFormsTypes();

  const SendFormSchema = yup.object().shape({
    form_type_id: yup.string().required('Form name is required.'),

    client: yup
      .object()
      .shape({
        value: yup.string().required('Client is required.'),
        email: yup.string(),
        firstName: yup.string(),
        lastName: yup.string(),
        label: yup.string(),
        profile_image_path: yup.string().nullable(),
      })
      .typeError('Client is required'),
  });
  const formik = useFormik({
    initialValues: {
      form_type_id: currentForm?.id ? currentForm?.id : '',
      client: null,
    },
    validationSchema: SendFormSchema,
    validateOnChange: true,
    validateOnBlur: false,
    onSubmit: (values) => {
      const { client, form_type_id } = values;

      onSubmitForm({
        form_type_id,
        clients: [
          {
            id: client.value.toString(),
            email: client.email,
            first_name: client.firstName,
            last_name: client.lastName,
          },
        ],
      });
    },
  });

  const onAssignFormSuccess = (data) => {
    router.push(
      {
        pathname: `/online-forms/agent-sign/${data.data.public_identifier}`,
        query: { params: JSON.stringify(params) },
      },
      `/online-forms/agent-sign/${data.data.public_identifier}`,
    );
  };
  const onAssignFormError = () => {
    toast.error('Unable to assign form to a user!');
  };

  const { isPending: assignFormIsPending, mutate: assignFormMutate } = useAssignForm({
    onSuccess: (data, variables) => onAssignFormSuccess(data, variables),
    onError: onAssignFormError,
  });

  const onSubmitForm = (values) => {
    assignFormMutate(values);
  };

  return (
    <Overlay
      className="w-[600px] min-h-[332px] [&>div]:overflow-visible"
      title={'Send New Form'}
      handleCloseOverlay={onCancel}>
      <div className="p-[24px] pt-0 flex flex-col gap-[24px]">
        <div className="flex flex-col gap-[24px]">
          <Dropdown
            placeHolder="Choose Form*"
            label="Choose Form*"
            options={formsTypesData?.data?.items.map(({ id, name }) => {
              return { id, label: name };
            })}
            activeIcon={false}
            activeClasses="bg-lightBlue1"
            handleSelect={async (source) => {
              formik.setFieldValue('form_type_id', source.id);
            }}
            error={formik.touched.form_type_id && formik.errors.form_type_id}
            errorText={formik.errors.form_type_id}
            initialSelect={currentForm?.id ? currentForm.name : ''}
          />
          <ClientDropdown
            indicatorStyles={{ display: 'none' }}
            options={contacts?.map((contact) => {
              return {
                value: contact.id,
                label: `${contact.first_name} ${contact.last_name} - ${contact.email}`,
                email: contact.email,
                firstName: contact.first_name,
                lastName: contact.last_name,
                profile_image_path: contact.profile_image_path,
              };
            })}
            label="Send Form To*"
            value={formik.values.client}
            handleSelect={(client) => {
              formik.setFieldValue('client', client);
            }}
            className="col-span-1"
            placeholder={''}
            error={formik.touched?.client && formik.errors?.client}
            errorText={formik.errors?.client}
          />
        </div>
        <div className="flex justify-end gap-[17px]">
          <Button white className={'min-w-fit'} onClick={onCancel}>
            Cancel
          </Button>
          <Button className={'min-w-fit'} onClick={formik.handleSubmit} loading={assignFormIsPending}>
            Next
          </Button>
        </div>
      </div>
    </Overlay>
  );
};

export default SendForm;
