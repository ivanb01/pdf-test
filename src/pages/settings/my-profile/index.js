import SettingsLayout from '@components/Layout/SettingsLayout';
import Button from '@components/shared/button';
import Input from '@components/shared/input';
import Text from '@components/shared/text';
import TopBar from '@components/shared/top-bar';
import { fetchCurrentUserInfo, updateUserInfo } from '@helpers/auth';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import useLocalStorage from 'hooks/useLocalStorage';
import { setUserInfo } from 'store/global/slice';
import Signature from '@components/Signature';
import { getCompany } from '@global/functions';

const index = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.global.userInfo);
  const [defaultUserInfo] = useLocalStorage('userInfo');
  const [changedUserInfo, setChangedUserInfo] = useState(defaultUserInfo);
  const [loadingActivate, setLoadingActivate] = useState(false);

  useEffect(() => {
    const getInfo = async () => {
      const info = await fetchCurrentUserInfo();
      dispatch(setUserInfo(info));
      setChangedUserInfo(info);
    };

    getInfo();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChangedUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);
  const handleSubmit = async () => {
    setLoadingActivate(true);
    try {
      await updateUserInfo(changedUserInfo);
      dispatch(setUserInfo(changedUserInfo));
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
        <div className="p-6 flex flex-col justify-between" style={{ height: 'calc(100vh - 160px)' }}>
          <div>
            <Text h3 className="mb-1 text-gray7">
              General Information
            </Text>
            <Text p className="text-gray4">
              Profile information that you will be presented to your contacts.
            </Text>
            <hr className="my-3" />
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
                value={changedUserInfo?.phone_number || ''}
                onChange={handleChange}
                hidePhonePrefix={true}
              />
            </div>
            <Text h3 className="mb-1 mt-[50px] text-gray7">
              Email and SMS Signature
            </Text>
            <Text p className="text-gray4">
              These signatures will be used when sending Email and SMS’s.
            </Text>
            <hr className="my-3" />
            <div className={'flex gap-[120px] mt-2'}>
              <div className={'flex flex-col gap-[24px]'}>
                <p className={'font-normal text-gray6'}>Email Signature</p>
                <Signature
                  userInfo={userInfo}
                  companyName={getCompany(userInfo).companyName}
                  imageUrl={getCompany(userInfo).imageUrl}
                />
              </div>
              <div className={'flex flex-col gap-[24px]'}>
                <p className={'font-normal text-gray6'}>SMS Signature</p>
                <Signature userInfo={userInfo} companyName={getCompany(userInfo).companyName} />
              </div>
            </div>
          </div>
          <div className="flex items-center self-end sticky bottom-4">
            <Button loading={loadingActivate} label="Save Changes" onClick={handleSubmit} />
          </div>
        </div>
      </SettingsLayout>
    </>
  );
};
export default index;
