import Button from 'components/shared/button';
import Overlay from 'components/shared/overlay';
import Dropdown from '@components/shared/dropdown';
import PropTypes from 'prop-types';
import ClientsMultiSelect from 'containers/OnlineForms/ClientsMultiSelect';
import { useFetchOnlineFormsTypes } from '../queries/queries';
import { useAssignForm } from '../queries/mutations';
import { useFormik } from 'formik';
import { array, object, string } from 'yup';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';

const SendForm = ({ params, onCancel, currentForm }) => {
  const router = useRouter();
  const { data: formsTypesData } = useFetchOnlineFormsTypes();

  const SendFormSchema = object().shape({
    form_type_id: string().required('Form name is required.'),
    clients: array().min(1, 'No clients selected.'),
  });
  const { handleSubmit, errors, setFieldValue, values } = useFormik({
    initialValues: {
      form_type_id: currentForm?.id.hex ? currentForm?.id.hex : '',
      clients: [],
    },
    validationSchema: SendFormSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      onSubmitForm(values);
    },
  });

  const onAssignFormSuccess = (data) => {
    router.push(
      {
        pathname: `/online-forms/agent-sign/${data.data.public_identifier.hex}`,
        query: { params: JSON.stringify(params) },
      },
      `/online-forms/agent-sign/${data.data.public_identifier.hex}`,
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
      handleCloseOverlay={onCancel}
    >
      <div className="p-[24px] pt-0 flex flex-col gap-[24px]">
        <div className="flex flex-col gap-[24px]">
          <Dropdown
            placeHolder="Choose Form*"
            label="Choose Form*"
            options={formsTypesData?.data?.map(({ id, name }) => {
              return { id, label: name };
            })}
            activeIcon={false}
            activeClasses="bg-lightBlue1"
            handleSelect={(source) => {
              setFieldValue('form_type_id', source.id.hex);
            }}
            error={errors.form_type_id}
            errorText={errors.form_type_id}
            initialSelect={currentForm?.id.hex ? currentForm.name : ''}
          />
          <ClientsMultiSelect
            handleChange={(client) => {
              const formattedClient = {
                id: client.value.toString(),
                email: client.email,
                first_name: client.first_name,
                last_name: client.last_name,
              };
              setFieldValue('clients', [formattedClient]);
            }}
            error={errors.clients}
            placeholder="Search for a Contact..."
          />
        </div>
        <div className="flex justify-end gap-[17px]">
          <Button white className={'min-w-fit'} onClick={onCancel}>
            Cancel
          </Button>
          <Button className={'min-w-fit'} onClick={handleSubmit} loading={assignFormIsPending}>
            Send
          </Button>
        </div>
      </div>
    </Overlay>
  );
};

export default SendForm;

SendForm.propTypes = {
  formsList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string,
      name: PropTypes.string,
    }),
  ),
  clientsList: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number,
      label: PropTypes.string,
    }),
  ),
  onCancel: PropTypes.func,
};
