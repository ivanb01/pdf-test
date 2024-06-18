import React from 'react';
import ApplicationDetails from 'containers/Applications/ApplicationDetails';
import MainMenu from '@components/shared/menu';
import MainMenuV2 from '@components/shared/menu/menu-v2';
const Application = () => {
  return (
    <>
      <MainMenuV2 />
      <ApplicationDetails />
    </>
  );
};

export default Application;
