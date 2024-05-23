import TemplatesTable from '@components/shared/table/TemplatesTable';
import React, { useEffect, useState } from 'react';
import { getEmailTemplates } from '@api/campaign';
import Loader from '@components/shared/loader';
import { useRouter } from 'next/router';

const EmailTemplatesInCampaign = ({ emailTemplates, loadingData }) => {
  const router = useRouter();
  return loadingData ? (
    <div className={'relative mt-10'} style={{ height: 'calc(100vh - 500px)' }}>
      <Loader />
    </div>
  ) : (
    <div className={'p-[50px] '}>
      <div className={'flex px-6 py-4 bg-[#EFF6FF] justify-between  items-center mb-6 text-[#1D4ED8]'}>
        <div className={'flex gap-3'}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10ZM11 6C11 6.55228 10.5523 7 10 7C9.44772 7 9 6.55228 9 6C9 5.44772 9.44772 5 10 5C10.5523 5 11 5.44772 11 6ZM9 9C8.44772 9 8 9.44772 8 10C8 10.5523 8.44772 11 9 11V14C9 14.5523 9.44772 15 10 15H11C11.5523 15 12 14.5523 12 14C12 13.4477 11.5523 13 11 13V10C11 9.44772 10.5523 9 10 9H9Z"
              fill="#3B82F6"
            />
          </svg>
          <p className={'text-sm leading-5 font-normal'}>
            These are the email templates you can use when creating an event within the campaign. If you want to make
            edits you need to go to Settings.
          </p>
        </div>
        <p
          role="button"
          onClick={() => router.push('/settings/email-templates')}
          className={'text-sm leading-5 font-medium'}>
          Go to Settings→
        </p>
      </div>
      <TemplatesTable data={emailTemplates} isInCampaign />
    </div>
  );
};

export default EmailTemplatesInCampaign;
