import SettingsLayout from '@components/Layout/SettingsLayout';
import IframeWithLoader from 'components/shared/IframeWithLoader';
import MainMenuV2 from 'components/shared/menu/menu-v2';
import useAuthIframe from 'hooks/useAuthIframe';

const index = () => {
  const { token, baseUrl } = useAuthIframe();

  return (
    <SettingsLayout>
      {token && baseUrl && <IframeWithLoader src={`${baseUrl}/Account_management_crm?token=${token}`} />}
    </SettingsLayout>
  );
};

export default index;
