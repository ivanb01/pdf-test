import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import moment from 'moment';
import ResendEmail from '/public/icons/resend-email.svg';
import FilterDropdown from '@components/shared/dropdown/FilterDropdown';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { DotsHorizontalIcon } from '@heroicons/react/outline';
import DeleteIcon from '@mui/icons-material/Delete';
import Text from '@components/shared/text';
import { sendEmail } from '@api/email';
import toast from 'react-hot-toast';
import CircularProgress from '@mui/material/CircularProgress';

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
  const sendFormEmail = async () => {
    const emailBody = {
      to: [clientEmail],
      subject: formTitle ?? 'Opgny form',
      body: `<html>
          <h4>Client : ${clientName ?? ''}</h4>
          <h4>Form link : ${`${window.location.origin}/public/online-forms-sign/${formPublicIdentifier}`}</h4>
        </html>`,
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
    <div className="flex flex-col gap-[6px]">
      <p
        className={`text-sm ${
          status.toLowerCase() === 'pending' ? '[&>*]:text-yellow2 text-yellow3' : '[&>*]:text-green5 text-green7'
        }`}>
        <span className="text-base mr-[6px]">&#9679;</span>
        {status}
      </p>
      {status.toLowerCase() === 'pending' && (
        <button disabled={isSendingEmail} className="text-xs flex gap-[6px]" onClick={sendFormEmail}>
          {!isSendingEmail ? <Image src={ResendEmail} alt="Resend email" /> : <CircularProgress size={16} />}
          Resend Form
        </button>
      )}
    </div>
  );
};
export const DateCell = ({ date }) => <p className="text-sm">{moment(new Date(date)).format('MMM DD, YYYY')}</p>;

export const ActionsCell = ({ formId, onDownloadPdf, onDeleteForm }) => {
  const types = [
    {
      name: (
        <span className="flex flex-row">
          <PictureAsPdfIcon height={20} className="text-gray6 mr-3" />
          <Text p className="text-gray6">
            Download PDF
          </Text>
        </span>
      ),
      handleClick: () => {
        onDownloadPdf();
      },
    },
    {
      name: (
        <span className="flex flex-row">
          <DeleteIcon height={20} className="text-red5 mr-3" fontSize="small" />
          <Text p className="text-red5">
            Move to Trash
          </Text>
        </span>
      ),
      handleClick: () => {
        onDeleteForm();
      },
    },
  ];
  return <FilterDropdown types={types} icon={<DotsHorizontalIcon height={20} />} positionClass="right-0" />;
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
