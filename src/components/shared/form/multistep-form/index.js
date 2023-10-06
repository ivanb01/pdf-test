import { useState, useEffect } from 'react';
import Button from 'components/shared/button';
import Text from 'components/shared/text';
import { ArrowRightIcon } from '@heroicons/react/outline';
import { ArrowLeftIcon } from '@heroicons/react/outline';

const MultiStepOverlay = ({
  title,
  steps,
  children,
  handleClose,
  currentStep,
  prevStep,
  nextStep,
  changeStep,
  submit,
  isSubmittingNextButton,
  isSubmittingButton,
  className,
  hideHeader,
}) => {
  const [loadingButton, setLoadingButton] = useState(false);

  // useEffect(() => {
  //   setLoadingButton(isSubmittingButton);
  // }, [isSubmittingButton]);

  return (
    <div className="flex items-center justify-center overflow-y-auto overflow-x-hidden fixed top-40 right-0 left-0 z-50 w-full md:inset-0 h-modal bg-overlayBackground">
      <div className={`relative p-4 w-auto min-w-[635px]  ${className}`}>
        <div className="relative bg-white rounded-lg shadow">
          <div className="flex justify-between items-center p-5 rounded-t">
            <Text h3 className="text-gray7">
              {title}
            </Text>
            <Button closeButton onClick={handleClose}></Button>
          </div>
          <div className="p-6">
            {!hideHeader && (
              <nav aria-label="Progress" className="mb-10">
                <ol role="list" className="space-y-4 md:flex md:space-y-0 md:space-x-8">
                  {steps.map(
                    (step) =>
                      !step.hidden && (
                        <li key={step.name} className="md:flex-1" onClick={() => changeStep && changeStep(step.id)}>
                          {currentStep >= step.id ? (
                            <a
                              href={step.href}
                              className="group pl-4 py-2 flex flex-col border-l-4 border-lightBlue3 hover:border-lightBlue5 md:pl-0 md:pt-4 md:pb-0 md:border-l-0 md:border-t-4">
                              <span className="text-xs text-lightBlue3 font-semibold tracking-wide uppercase group-hover:text-lightBlue5">
                                Step {step.id}
                              </span>
                              <span className="text-sm font-medium">{step.name}</span>
                            </a>
                          ) : (
                            <a
                              href={step.href}
                              className="group pl-4 py-2 flex flex-col border-l-4 border-gray-200 hover:border-gray-300 md:pl-0 md:pt-4 md:pb-0 md:border-l-0 md:border-t-4">
                              <span className="text-xs text-gray-500 font-semibold tracking-wide uppercase group-hover:text-gray6">
                                Step {step.id}
                              </span>
                              <span className="text-sm font-medium">{step.name}</span>
                            </a>
                          )}
                        </li>
                      ),
                  )}
                </ol>
              </nav>
            )}

            {children}
          </div>
          <div className="flex items-center justify-between p-6 space-x-2 border-t border-gray-200">
            <div>
              {currentStep != 1 && (
                <Button
                  label="Go Back"
                  secondary
                  leftIcon={<ArrowLeftIcon height={15} />}
                  className="mr-3"
                  onClick={prevStep}></Button>
              )}
            </div>
            <div>
              <Button className="mr-3" label="Cancel" white onClick={handleClose}></Button>
              {currentStep != steps.length && (
                <Button
                  label="Next"
                  rightIcon={<ArrowRightIcon height={15} />}
                  loading={isSubmittingNextButton}
                  onClick={nextStep}></Button>
              )}
              {currentStep == steps.length && (
                <Button
                  label="Save"
                  loading={loadingButton}
                  // rightIcon={<ArrowRightIcon height={15} />}
                  onClick={() => {
                    setLoadingButton(true);
                    submit();
                  }}></Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiStepOverlay;
