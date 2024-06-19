import MainMenu from '@components/shared/menu';
import MainMenuV2 from '@components/shared/menu/menu-v2';
import Applications from 'containers/Applications';

const ApplicationsPage = () => {
  return (
    <>
      <MainMenuV2 />
      <Applications />
    </>
  );
};

export default ApplicationsPage;
