import axiosInstance from '@api/axiosInstance';

export const sendEmail = (body) => {
  return axiosInstance.post(
    'v1/email/send',
    { ...body },
    {
      headers: {
        'Content-Type': 'multipart/mixed',
      },
    },
  );
};

export const sendSMS = (to, message) => {
  return axiosInstance.post(
    'v1/sms/send',
    {
      to,
      message,
    },
    {
      headers: {
        'Content-Type': 'multipart/mixed',
      },
    },
  );
};

export const syncEmailOfContact = (contact_email) => {
  return axiosInstance.post('v1/email/sync/gmail', {
    contact_email: contact_email ?? undefined,
    number_of_emails: '20',
  });
};

export const getEmailsForSpecificContact = (contact_email, offset) => {
  return axiosInstance.get(`v1/email`, {
    params: {
      limit: 10,
      contact_email,
      offset,
    },
  });
};
export const getOneThread = (thread_id) => {
  return axiosInstance.get(`v1/email?thread_id=${thread_id}`);
};
export const getAIContacts = () => {
  return axiosInstance.post('v1/email/ai-categorize');
};
export const replyInThread = (contact_name, body, message_header_id, thread_id, subject) => {
  return axiosInstance.post('v1/email/send/gmail', {
    to: [contact_name],
    body: body,
    message_header_id: message_header_id,
    action: 'reply',
    thread_id: thread_id,
    subject: subject,
  });
};
