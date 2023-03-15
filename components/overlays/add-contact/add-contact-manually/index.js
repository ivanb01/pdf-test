import Text from 'components/shared/text';
import Button from 'components/shared/button';
import { ArrowRightIcon } from '@heroicons/react/outline';
import ContactCategoryCard from 'components/contact/contact-category-card';
import Avatar from 'components/shared/avatar';
import { inputs } from './list';
import Radio from 'components/shared/radio';
import { useEffect, useState } from 'react';
import StatusSelect from 'components/status-select';
import MultiStepOverlay from 'components/shared/form/multistep-form';
import { UserGroupIcon } from '@heroicons/react/outline';
import { IdentificationIcon } from '@heroicons/react/solid';
import { statuses } from 'global/variables';
import { useFormik } from 'formik';
import Input from 'components/shared/input';

const AddContactManuallyOverlay = ({
  handleClose,
  selectedCard,
  setSelectedCard,
  selectedContactType,
  setSelectedContactType,
  selectedStatus,
  setSelectedStatus,
  title,
}) => {
  useEffect(() => {
    return () => {
      setCurrentStep(1);
    };
  }, []);

  const [options, setOptions] = useState([
    {
      id: 0,
      name: 'Renter',
    },
    {
      id: 1,
      name: 'Buyer',
    },
    {
      id: 2,
      name: 'Seller',
    },
    {
      id: 3,
      name: 'Landlord',
    },
  ]);

  const steps = [
    { id: 1, name: 'Contact Group', href: '#' },
    {
      id: 2,
      name: 'General Information',
      href: '#',
      status: 'current',
    },
    { id: 3, name: 'Type and Status', href: '#' },
  ];

  const [cards, setCards] = useState([
    {
      id: 0,
      name: 'Client',
      description:
        'Clients are renters, buyers, landlords or tenants that you can close a deal with and earn income.',
      icon: <UserGroupIcon height={25} className="text-lightBlue3" />,
    },
    {
      id: 1,
      name: 'Professional',
      description:
        'Professionals are people who help you close transactions like agents, lawyers, movers, title companies, photographers etc.',
      icon: <IdentificationIcon height={25} className="text-lightBlue3" />,
    },
  ]);

  const resetForm = () => {
    setSelectedCard(0);
    setSelectedContactType(0);
    setSelectedStatus(0);
    setCurrentStep(1);
    handleClose();
  };

  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  //* FORMIK *//
  const formik = useFormik({
    initialValues: {},
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = (values) => {
    console.log(values);
    handleAddingProfile(false)();
  };

  return (
    <MultiStepOverlay
      handleClose={resetForm}
      steps={steps}
      currentStep={currentStep}
      nextStep={nextStep}
      prevStep={prevStep}
      changeStep={(arg) => setCurrentStep(arg)}
      title={title}
      submit={handleSubmit}
    >
      <div className="step">
        {currentStep == 1 ? (
          <div>
            <Text h4 className="text-gray7 text-center mb-6">
              Please choose what is the contact you are adding?
            </Text>
            <div className="flex flex-col items-center justify-center">
              {cards.map((card) => (
                <ContactCategoryCard
                  key={card.id}
                  id={card.id}
                  name={card.name}
                  description={card.description}
                  icon={card.icon}
                  setSelectedCard={setSelectedCard}
                  selectedCard={selectedCard}
                />
              ))}
            </div>
          </div>
        ) : currentStep == 2 ? (
          <div>
            <div className="flex items-center mb-6">
              <Avatar size="large" className="mr-4" />
              <Button white label="Upload Picture" />
            </div>
            <div>
              <form onSubmit={formik.handleSubmit}>
                <div className="grid grid-cols-4 gap-4">
                  <Input
                    type="text"
                    label="First Name"
                    id="firstName"
                    className="mb-6 col-span-2"
                    onChange={formik.handleChange}
                  />
                  <Input
                    type="text"
                    label="Last Name"
                    id="lastName"
                    className="mb-6 col-span-2"
                    onChange={formik.handleChange}
                  />
                  <Input
                    type="email"
                    label="Email"
                    id="phone"
                    className="mb-6 col-span-2"
                    onChange={formik.handleChange}
                  />
                  <Input
                    type="phone"
                    label="Phone"
                    id="phone"
                    className="mb-6 col-span-2"
                    onChange={formik.handleChange}
                  />
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div>
            <Radio
              options={options}
              label="What kind of contact is this for you?"
              selectedContactType={selectedContactType}
              changeContactType={setSelectedContactType}
              className="mb-6"
            />
            <StatusSelect
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
              label="In what stage of communication?"
              statuses={statuses}
            />
          </div>
        )}
      </div>
    </MultiStepOverlay>
  );
};

export default AddContactManuallyOverlay;
