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
import PropTypes from 'prop-types';

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
  const getCompany = () => {
    let imageUrl = '';
    let companyName = '';
    switch (userInfo.tenantId) {
      case '9b11bc70b91411eda0b1722084980ce8':
        companyName = 'Oxford Property Group';
        imageUrl = 'https://i.imgur.com/kbMXf3r.png';
        break;
      case 'aa47d67ab91411eda0b1722084980ce8':
        companyName = 'Spire Group';
        imageUrl = 'https://i.imgur.com/RAyYKtU.png';
        break;
      case 'ba3b15bab91411eda0b1722084980ce8':
        companyName = 'Level Group';
        imageUrl = 'https://i.imgur.com/Gq2NDtu.png';
        break;
    }
    return { imageUrl, companyName };
  };
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
                value={changedUserInfo?.phone_number || ''}
                onChange={handleChange}
                hidePhonePrefix={true}
              />
            </div>
            <hr className="my-5" />
            <Text h3 className="mb-1">
              Email & SMS Signature Preview
            </Text>
            <div className={'flex gap-[120px] mt-2'}>
              <div className={'flex flex-col gap-[23px]'}>
                <p className={'text-gray-800 text-sm font-medium'}>Email Signature:</p>
                {userInfo?.first_name && userInfo?.last_name && userInfo?.phone_number && userInfo?.tenantId && (
                  <Signature
                    userInfo={userInfo}
                    companyName={getCompany().companyName}
                    imageUrl={getCompany().imageUrl}
                  />
                )}
              </div>
              <div className={'flex flex-col gap-[23px]'}>
                <p className={'text-gray-800 text-sm font-medium'}>SMS:</p>
                {userInfo?.first_name && userInfo?.last_name && userInfo?.phone_number && userInfo?.tenantId && (
                  <Signature userInfo={userInfo} companyName={getCompany().companyName} />
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center self-end">
            <Button loading={loadingActivate} label="Save Changes" onClick={handleSubmit} />
          </div>
        </div>
      </SettingsLayout>
    </>
  );
};

const Signature = ({ userInfo, companyName, imageUrl }) => {
  return (
    <div className={'flex flex-col gap-[2px] text-gray5 text-sm font-medium'}>
      <p>
        {userInfo?.first_name} {userInfo?.last_name}
      </p>
      <p>{companyName}</p>
      <p>{userInfo?.phone_number}</p>
      <p>{userInfo?.email}</p>
      {imageUrl && (
        <div className={'mt-3'}>
          <img src={`${imageUrl}`} alt={''} height={20} width={120} />
        </div>
      )}
    </div>
  );
};

Signature.PropTypes = {
  userInfo: PropTypes.shape({
    first_name: PropTypes.number.isRequired,
    last_name: PropTypes.string.isRequired,
    phone_number: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }),
  imageUrl: PropTypes.string,
  companyName: PropTypes.string.isRequired,
};
export default index;
