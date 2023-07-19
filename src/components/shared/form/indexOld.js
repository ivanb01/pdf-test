import { useFormik } from 'formik';
import Button from '../button';
import Input from '../input';

export default function BasicForm({
  handleSubmit,
  inputs = [],
  customButtons,
  initialValues,
  buttonText = 'Submit',
}) {
  const localInitialValues = initialValues
    ? initialValues
    : inputs.reduce((obj, cur) => {
        let value = '';
        if (cur.type === 'checkbox') value = [];
        return { ...obj, [cur.id]: value };
      }, {});
  const formik = useFormik({
    initialValues: {},
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex flex-row flex-wrap">
        {inputs.map((input) => (
          <>
            <Input
              key={input?.id}
              className={`mb-6 w-[100%] ${input?.className}`}
              id={input?.id}
              onChange={formik.handleChange}
              value={formik?.values?.id}
              type={input?.type}
              name={input?.name}
              placeholder={input?.placeholder}
              label={input?.label}
              autocomplete={input?.autocomplete}
              onBlur={formik.handleBlur}
              showForgotPassword={input?.showForgotPassword}
              iconAfter={input?.iconAfter}
              iconBefore={input?.iconBefore}
              {...input}
            />
            <br />
          </>
        ))}
      </div>
      {customButtons ? (
        customButtons
      ) : (
        <Button
          label={buttonText}
          className="w-full flex justify-center"
          type="submit"
        />
      )}
    </form>
  );
}
