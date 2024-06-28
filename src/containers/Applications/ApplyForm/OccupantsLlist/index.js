import React, { useRef, useState, useEffect } from 'react';
import Input, { RadioButton } from '@components/shared/input';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { Field, FieldArray, getIn, useFormikContext } from 'formik';
import uuid from 'react-uuid';
import AnimateHeight from '@components/shared/AnimatedHeight';

const OccupantsList = () => {
  const listRef = useRef(null);
  const formik = useFormikContext();

  const [listHeight, setListHeight] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    if (listRef && formik.values.existing_occupant) {
      setListHeight(listRef.current.scrollHeight);
    }
  }, [formik.values.occupants, formik.errors.occupants, formik.touched.occupants]);

  useEffect(() => {
    if (formik.values.existing_occupant) {
      setContainerHeight('auto');

      formik.values.occupants.push({
        id: uuid(),
        full_name: '',
        phone_number: '',
        email: '',
        relationship_description: '',
      });
      formik.setValues(formik.values);
    } else {
      setContainerHeight(0);
      formik.setFieldValue('occupants', []);
    }
  }, [formik.values.existing_occupant]);

  return (
    <div className="py-[50px]">
      <div className="flex flex-col ">
        <div>
          <p className="text-gray6 text-sm font-medium leading-5">Is there any other occupant?</p>
          <div className="h-[38px] flex gap-[18px] items-center font-medium leading-4 text-sm">
            <Field
              component={RadioButton}
              name="existing_occupant"
              id="Yes"
              label="Yes"
              onChange={(e) => formik.setFieldValue('existing_occupant', true)}
              checked={formik.values.existing_occupant ? true : false}
            />
            <Field
              component={RadioButton}
              name="existing_occupant"
              id="No"
              label="No"
              checked={formik.values.existing_occupant ? false : true}
              onChange={(e) => formik.setFieldValue('existing_occupant', false)}
            />
          </div>
        </div>
        <AnimateHeight
          height={containerHeight}
          onHeightAnimationEnd={() => {
            if (listRef) {
              setListHeight(listRef.current.scrollHeight);
            }
          }}>
          <div>
            <div className=" pt-6">
              <span className="leading-6 font-medium text-base">List of Other Applicants or Occupants</span>
            </div>

            <AnimateHeight height={listHeight}>
              <FieldArray
                name="occupants"
                render={(arrayHelpers) => (
                  <div className="  transition-[height] duration-300 ease-in">
                    {formik.values.occupants.map((occupant, index) => {
                      return (
                        <div key={index}>
                          <div className="flex flex-col py-6 gap-6">
                            <div className="flex justify-between items-center bg-gray10 py-2.5 px-4">
                              <span className="leading-5 font-medium text-sm text-gray7 ">Occupant {index + 1}</span>
                              <button
                                type="button"
                                onClick={async () => {
                                  await arrayHelpers.remove(index);
                                  if (arrayHelpers.form.values.occupants.length === 1) {
                                    setContainerHeight(0);
                                    arrayHelpers.form.setFieldValue('existing_occupant', false);
                                  }
                                }}>
                                <RemoveCircleIcon className="h-4 w-4 text-overlayBackground" />
                              </button>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
                              <Input
                                label="*Name"
                                name={`occupants[${index}].full_name`}
                                value={formik.values.occupants[index].full_name}
                                onChange={formik.handleChange}
                                error={
                                  getIn(formik.touched, `occupants[${index}].full_name`) &&
                                  getIn(formik.errors, `occupants[${index}].full_name`)
                                }
                                errorText={
                                  getIn(formik.touched, `occupants[${index}].full_name`) &&
                                  getIn(formik.errors, `occupants[${index}].full_name`)
                                }
                              />
                              <Input
                                label="*Email Address"
                                name={`occupants[${index}].email`}
                                value={formik.values.occupants[index].email}
                                onChange={formik.handleChange}
                                error={
                                  getIn(formik.touched, `occupants[${index}].email`) &&
                                  getIn(formik.errors, `occupants[${index}].email`)
                                }
                                errorText={
                                  getIn(formik.touched, `occupants[${index}].email`) &&
                                  getIn(formik.errors, `occupants[${index}].email`)
                                }
                              />

                              <Input
                                label="*Phone Number"
                                type="phone"
                                name={`occupants[${index}].phone_number`}
                                value={formik.values.occupants[index].phone_number}
                                onChange={formik.handleChange}
                                error={
                                  getIn(formik.touched, `occupants[${index}].phone_number`) &&
                                  getIn(formik.errors, `occupants[${index}].phone_number`)
                                }
                                errorText={
                                  getIn(formik.touched, `occupants[${index}].phone_number`) &&
                                  getIn(formik.errors, `occupants[${index}].phone_number`)
                                }
                              />
                              <Input
                                label="*Relationship"
                                name={`occupants[${index}].relationship_description`}
                                value={formik.values.occupants[index].relationship_description}
                                onChange={formik.handleChange}
                                error={
                                  getIn(formik.touched, `occupants[${index}].relationship_description`) &&
                                  getIn(formik.errors, `occupants[${index}].relationship_description`)
                                }
                                errorText={
                                  getIn(formik.touched, `occupants[${index}].relationship_description`) &&
                                  getIn(formik.errors, `occupants[${index}].relationship_description`)
                                }
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              />
              <button
                type="button"
                onClick={async () => {
                  await formik.values.occupants.push({
                    id: uuid(),
                    full_name: '',
                    phone_number: '',
                    email: '',
                    relationship_description: '',
                  });
                  await formik.setValues(formik.values);
                  setListHeight(listRef.current.scrollHeight);
                }}
                className="flex  items-center gap-2 leading-3 font-medium text-xs text-gray6 border-[1px] py-[7px] px-[11px] rounded shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] my-[26px]">
                <PersonAddIcon className="h-4 w-4 text-overlayBackground" />
                Add Occupant
              </button>
            </AnimateHeight>
            <FieldArray
              name="occupants"
              render={(arrayHelpers) => (
                <div className="transition-[height] duration-300 ease-in h-0 overflow-hidden" ref={listRef}>
                  {formik.values.occupants.map((occupant, index) => {
                    return (
                      <div key={index}>
                        <div className="flex flex-col py-6 gap-6">
                          <div className="flex justify-between items-center bg-gray10 py-2.5 px-4">
                            <span className="leading-5 font-medium text-sm text-gray7 ">Occupant {index + 1}</span>
                            <button
                              type="button"
                              onClick={() => {
                                arrayHelpers.remove(index);
                                // onRemoveOccupant(formik.values.occupants);
                              }}>
                              <RemoveCircleIcon className="h-4 w-4 text-overlayBackground" />
                            </button>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
                            <Input
                              label="Name"
                              name={`occupants[${index}].full_name`}
                              value={formik.values.occupants[index].full_name}
                              onChange={formik.handleChange}
                              error={
                                getIn(formik.touched, `occupants[${index}].full_name`) &&
                                getIn(formik.errors, `occupants[${index}].full_name`)
                              }
                              errorText={
                                getIn(formik.touched, `occupants[${index}].full_name`) &&
                                getIn(formik.errors, `occupants[${index}].full_name`)
                              }
                            />
                            <Input
                              label="Email Address"
                              name={`occupants[${index}].email`}
                              value={formik.values.occupants[index].email}
                              onChange={formik.handleChange}
                              error={
                                getIn(formik.touched, `occupants[${index}].email`) &&
                                getIn(formik.errors, `occupants[${index}].email`)
                              }
                              errorText={
                                getIn(formik.touched, `occupants[${index}].email`) &&
                                getIn(formik.errors, `occupants[${index}].email`)
                              }
                            />

                            <Input
                              label="Phone Number"
                              type="phone"
                              name={`occupants[${index}].phone_number`}
                              value={formik.values.occupants[index].phone_number}
                              onChange={formik.handleChange}
                              error={
                                getIn(formik.touched, `occupants[${index}].phone_number`) &&
                                getIn(formik.errors, `occupants[${index}].phone_number`)
                              }
                              errorText={
                                getIn(formik.touched, `occupants[${index}].phone_number`) &&
                                getIn(formik.errors, `occupants[${index}].phone_number`)
                              }
                            />
                            <Input
                              label="Relationship"
                              name={`occupants[${index}].relationship_description`}
                              value={formik.values.occupants[index].relationship_description}
                              onChange={formik.handleChange}
                              error={
                                getIn(formik.touched, `occupants[${index}].relationship_description`) &&
                                getIn(formik.errors, `occupants[${index}].relationship_description`)
                              }
                              errorText={
                                getIn(formik.touched, `occupants[${index}].relationship_description`) &&
                                getIn(formik.errors, `occupants[${index}].relationship_description`)
                              }
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <button
                    type="button"
                    onClick={async () => {
                      await formik.values.occupants.push({
                        id: uuid(),
                        full_name: '',
                        phone_number: '',
                        email: '',
                        relationship_description: '',
                      });
                      await formik.setValues(formik.values);
                      setListHeight(listRef.current.scrollHeight);
                    }}
                    className="flex  items-center gap-2 leading-3 font-medium text-xs text-gray6 border-[1px] py-[7px] px-[11px] rounded shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] my-[26px]">
                    <PersonAddIcon className="h-4 w-4 text-overlayBackground" />
                    Add Occupant
                  </button>
                </div>
              )}
            />
          </div>
        </AnimateHeight>
      </div>
    </div>
  );
};

export default OccupantsList;
