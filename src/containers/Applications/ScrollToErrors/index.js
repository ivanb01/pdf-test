import { useEffect } from 'react';
import { useFormikContext } from 'formik';

const ScrollToErrors = () => {
  const formik = useFormikContext();

  const getFieldErrorNames = (formikErrors) => {
    const transformObjectToDotNotation = (obj, prefix = '', result = []) => {
      Object.keys(obj).forEach((key) => {
        const value = obj[key];
        if (!value) return;

        const nextKey = prefix ? `${prefix}.${key}` : key;

        if (typeof value === 'object') {
          transformObjectToDotNotation(value, nextKey, result);
        } else {
          if (nextKey === 'client_signature.untrimmedCanvas') result.push('client_signature');
          if (nextKey === 'property_state.id') result.push('property_state');
          else result.push(nextKey);
        }
      });

      return result;
    };

    return transformObjectToDotNotation(formikErrors);
  };
  useEffect(() => {
    if (!formik.submitCount) return;
    if (formik.isValid) return;
    if (!Object.keys(formik.errors).length) return;

    const fieldErrorNames = getFieldErrorNames(formik.errors);

    const fieldsOrder = fieldErrorNames
      .reduce((acc, error, index) => {
        const element = document.querySelectorAll(
          `input[name='${fieldErrorNames[index]}'], canvas[name='${fieldErrorNames[index]}'], button[name='${fieldErrorNames[index]}'], div[name='${fieldErrorNames[index]}']`,
        )[0];

        if (!element) {
          return acc;
        } else
          return [
            ...acc,
            {
              name: error,
              topDistance: element.getBoundingClientRect().top,
            },
          ];
      }, [])
      .sort((a, b) => {
        return a.topDistance - b.topDistance;
      });

    const element = document.querySelectorAll(
      `input[name='${fieldsOrder[0].name}'], canvas[name='${fieldsOrder[0].name}'], button[name='${fieldsOrder[0].name}'], div[name='${fieldsOrder[0].name}']`,
    )[0];

    if (!element) return;

    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [formik.submitCount]);

  return null;
};

export default ScrollToErrors;
