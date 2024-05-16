import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import moment from 'moment';
import ResendEmail from '/public/icons/resend-email.svg';
import { sendEmail } from '@api/email';
import toast from 'react-hot-toast';
import CircularProgress from '@mui/material/CircularProgress';

import { TrashIcon } from '@heroicons/react/solid';
import { render } from '@react-email/components';
import OnlineFormEmailTemplate from '../../OnlineFormEmailTemplate';
import { useSelector } from 'react-redux';
import StatusChip, { VARIANT_ENUM } from '@components/shared/status-chip';

export const HeaderCell = ({ title }) => <p>{title}</p>;

export const DefaultCell = ({ label }) => (
  <div>
    <p className="text-sm">{label}</p>
  </div>
);

export const ClientCell = ({ name, email, imgSrc }) => {
  return (
    <div className="flex justify-start align-middle gap-[12px]">
      <Image src={imgSrc} alt="" width={40} height={40} className="rounded-full" />
      <div>
        <p>{name}</p>
        <p>{email}</p>
      </div>
    </div>
  );
};

export const StatusCell = ({ status, formTitle, clientEmail, clientName, formPublicIdentifier }) => {
  const [isSendingEmail, setSendingEmail] = useState(false);
  const userInfo = useSelector((state) => state.global.userInfo);

  const sendFormEmail = async () => {
    const emailBody = {
      to: [clientEmail],
      subject: formTitle ?? 'Opgny form',
      body: render(
        <OnlineFormEmailTemplate
          email={clientEmail}
          first_name={clientName}
          agent_first_name={userInfo?.first_name}
          agent_last_name={userInfo?.last_name}
          formLink={`${window.location.origin}/public/online-forms-sign/${formPublicIdentifier}`}
        />,
        {
          pretty: true,
        },
      ),
    };
    setSendingEmail(true);
    try {
      await sendEmail(emailBody);
      toast.success('Form resent successfully!');
    } catch (e) {
      toast.error('Unable to resend email!');
    } finally {
      setSendingEmail(false);
    }
  };

  return (
    <div className="flex flex-col gap-[6px] text-[12px] font-medium">
      <StatusChip
        text={status.toLowerCase()}
        variant={status.toLowerCase() === 'pending' ? VARIANT_ENUM.WARNING : VARIANT_ENUM.SUCCESS}
      />
      {status.toLowerCase() === 'pending' && (
        <button disabled={isSendingEmail} className=" flex gap-[6px]" onClick={sendFormEmail}>
          {!isSendingEmail ? <Image src={ResendEmail} alt="Resend email" /> : <CircularProgress size={16} />}
          Resend Form
        </button>
      )}
    </div>
  );
};
export const DateCell = ({ date }) => <p className="text-sm">{moment(new Date(date)).format('MMM DD, YYYY')}</p>;

export const ActionsCell = ({ onDownloadPdf, onDeleteForm }) => {
  return (
    <div className="flex gap-4">
      <button onClick={onDownloadPdf}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
          />
        </svg>
      </button>
      <button onClick={onDeleteForm}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-4 h-4">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
      </button>
    </div>
  );
};

HeaderCell.propTypes = {
  title: PropTypes.string,
};
DefaultCell.propTypes = {
  label: PropTypes.string,
};
ClientCell.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  imgSrc: PropTypes.string,
};

StatusCell.propTypes = {
  status: PropTypes.string,
  formTitle: PropTypes.string,
  clientEmail: PropTypes.string,
  clientName: PropTypes.string,
  formPublicIdentifier: PropTypes.string,
};

DateCell.propTypes = {
  date: PropTypes.string,
};

ActionsCell.propTypes = {
  formId: PropTypes.string,
};
