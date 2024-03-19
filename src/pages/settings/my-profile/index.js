import SettingsLayout from '@components/Layout/SettingsLayout';
import Button from '@components/shared/button';
import Input from '@components/shared/input';
import Text from '@components/shared/text';
import TopBar from '@components/shared/top-bar';
import { updateUserInfo } from '@helpers/auth';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const index = () => {
  const [changedUserInfo, setChangedUserInfo] = useState({});
  const [loadingActivate, setLoadingActivate] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChangedUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setLoadingActivate(true);
    try {
      await updateUserInfo(changedUserInfo);
      toast.success('Changes saved successfully.');
    } catch (error) {
      console.error('Failed to save user info', error);
      toast.error('Failed to save the information.');
    }
    setLoadingActivate(false);
  };

  return (
    <>
      <SettingsLayout>
        <TopBar text="My profile" />
        <div className="p-6">
          <Text h3 className="mb-1">
            General Information
          </Text>
          <Text p className="text-gray4">
            Profile information that you will be presented to your contacts.
          </Text>
          <hr className="my-5" />
          <div className="w-[40%]">
            <div className="flex mb-6">
              <Input
                type="text"
                label="First Name"
                name="first_name"
                className="mr-6"
                value={changedUserInfo?.first_name || ''}
                onChange={handleChange}
              />
              <Input
                type="text"
                label="Last Name"
                name="last_name"
                value={changedUserInfo?.last_name || ''}
                onChange={handleChange}
              />
            </div>
            <Input
              type="phone"
              label="Phone Number"
              name="phone_number"
              value={changedUserInfo?.phone_number}
              onChange={handleChange}
              secondaryLabel="We may use this phone number to contact you about security events, sending workflow SMS, and for owner property values. Please refer to our privacy policy for more information."
            />
          </div>
          <hr className="my-5" />
          <div className="flex items-center">
            <Button loading={loadingActivate} label="Save Changes" onClick={handleSubmit} />
          </div>
        </div>
      </SettingsLayout>
    </>
  );
};

export default index;
