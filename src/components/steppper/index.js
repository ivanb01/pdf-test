import React from 'react';
import PropTypes from 'prop-types';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Stepper = ({ steps, currentStep, title }) => {
  return (
    <div className="h-[72px] flex gap-[54px] px-6 items-center border-gray2 border">
      <span className="w-[250px] font-medium leading-8	text-lg	text-gray7">{title}</span>
      <div className="flex grow">
        {steps.map(({ id, order, label }) => {
          return (
            <div className={`flex ${order !== steps.length ? 'grow' : 'grow-0'}`} key={id}>
              <div className="flex items-center">
                {order >= currentStep ? (
                  <span
                    className={`grow-0 border-2  ${
                      currentStep === order ? 'border-lightBlue3 text-lightBlue3' : 'border-gray3 text-gray3'
                    }  rounded-full min-h-[30px] min-w-[30px] flex justify-center items-center`}
                  >
                    {order}
                  </span>
                ) : (
                  <CheckCircleIcon className="w-[30px] h-[30px] text-green5" />
                )}
                <span className="ml-2">{label}</span>
              </div>

              {order !== steps.length && (
                <div className={`grow 'border-lightBlue3' border-b-[3px] h-[16.5px] mx-2`}>&nbsp;</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

Stepper.propTypes = {
  currentStep: PropTypes.number.isRequired,
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      order: PropTypes.number,
      label: PropTypes.string,
    }),
  ).isRequired,
  title: PropTypes.string.isRequired,
};

export default Stepper;
