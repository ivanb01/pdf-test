import Button from '@components/shared/button';
import SlideOver from '@components/shared/slideOver';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const CreateCampaignSidebar = ({ open, setOpen }) => {
  return (
    <SlideOver
      width="w-[740px]"
      open={open}
      setOpen={setOpen}
      title="Buyers, Settling in & Referrals"
      className="top-[70px]"
      buttons={
        <>
          <Button
            white
            label="Cancel"
            onClick={() => {
              setOpen(false);
            }}
          />
          <Button
            // disabled={!Object.values(clientsFilters).flat().length > 0}
            primary
            label="Save Campaign Template"
            onClick={() => {
              setFiltersCleared(true);
              dispatch(setClientsFilters({}));
            }}
          />
        </>
      }></SlideOver>
  );
};

export default CreateCampaignSidebar;
