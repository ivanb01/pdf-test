import IframeWithLoader from 'components/shared/IframeWithLoader';
import MainMenuV2 from 'components/shared/menu/menu-v2';
import useAuthIframe from 'hooks/useAuthIframe';

const index = () => {
  const { token, baseUrl } = useAuthIframe();

  return (
    <>
      <MainMenuV2 />
      {token && baseUrl && <IframeWithLoader src={`${baseUrl}/Agent_crm/training_videos?token=${token}`} />}
    </>
  );
};

export default index;
