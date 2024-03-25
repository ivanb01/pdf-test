import Button from 'components/shared/button';
import Overlay from 'components/shared/overlay';
import Dropdown from '@components/shared/dropdown';
import PropTypes from 'prop-types';
import ClientsMultiSelect from 'containers/OnlineForms/ClientsMultiSelect';
import { useFetchOnlineFormsTypes, useFetchOnlineFormsPaginated } from '../queries/queries';
import { useAssignForm, useSendEmail } from '../queries/mutations';
import { useFormik } from 'formik';
import { array, object, string } from 'yup';
import toast from 'react-hot-toast';

const SendForm = ({ params, onCancel, currentForm }) => {
  const { data: formsTypesData } = useFetchOnlineFormsTypes();
  const { refetch: formsRefetch } = useFetchOnlineFormsPaginated(params);

  const SendFormSchema = object().shape({
    form_type_id: string().required('Form name is required.'),
    clients: array().min(1, 'No clients selected.'),
  });
  const { handleSubmit, errors, setFieldValue, values } = useFormik({
    initialValues: {
      form_type_id: currentForm?.id ? currentForm?.id : '',
      clients: [],
    },
    validationSchema: SendFormSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => onSubmitForm(values),
  });

  const { mutate: mutateSendEmail } = useSendEmail();

  const onAssignFormSuccess = (data, variables) => {
    const { public_identifier } = data?.data;
    const emailsArray = variables.clients.map((client) => client.email);
    const emailBody = {
      to: emailsArray,
      subject: data?.data?.form_type.name ?? 'Opgny form',
      body: `<html>
          <h4>Form link : ${`${window.location.origin}/public/online-forms-sign/${public_identifier}`}</h4>
        </html>`,
    };
    mutateSendEmail(emailBody);
    onCancel(false);
    toast.success('Form type saved successfully!');
    formsRefetch();
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
            options={formsTypesData?.data?.map(({ id, name }) => {
              return { id, label: name };
            })}
            activeIcon={false}
            activeClasses="bg-lightBlue1"
            handleSelect={(source) => {
              setFieldValue('form_type_id', source.id);
            }}
            error={errors.form_type_id}
            errorText={errors.form_type_id}
            initialSelect={currentForm?.id ? currentForm.name : ''}
          />
          <ClientsMultiSelect
            handleChange={(clients) =>
              setFieldValue(
                'clients',
                clients.map(({ id, email, first_name, last_name }) => {
                  return {
                    id: id.toString(),
                    email,
                    first_name,
                    last_name,
                  };
                }),
              )
            }
            error={errors.clients}
            name={'clients'}
          />
        </div>
        <div className="flex justify-end gap-[17px]">
          <Button white className={'min-w-fit'} onClick={onCancel}>
            Cancel
          </Button>
          <Button className={'min-w-fit'} onClick={handleSubmit} loading={assignFormIsPending}>
            Save
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
