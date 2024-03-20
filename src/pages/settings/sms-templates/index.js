import SettingsLayout from '@components/Layout/SettingsLayout';
import Table from '@components/shared/table';
import TopBar from '@components/shared/top-bar';
import React from 'react';

const index = () => {
  let emailTemplate = [
    {
      agent_id: 'blendar@opgny.com',
      body_html: '<p>test message</p>',
      body_text: 'test message',
      created_at: '2024-03-13T12:36:27.948949+00:00',
      deleted: false,
      deleted_at: null,
      id: 22,
      status: 'active',
      subject: 'test templateoo',
      tenant_id: {
        hex: '9b11bc70b91411eda0b1722084980ce8',
      },
      updated_at: null,
    },
    {
      agent_id: 'blendar@opgny.com',
      body_html: '<p>New Template</p>',
      body_text: 'New Template',
      created_at: '2024-03-14T12:37:12.279584+00:00',
      deleted: false,
      deleted_at: null,
      id: 26,
      status: 'active',
      subject: 'New Template',
      tenant_id: {
        hex: '9b11bc70b91411eda0b1722084980ce8',
      },
      updated_at: null,
    },
  ];

  let smsTemplate = [
    {
      agent_id: 'blendar@opgny.com',
      created_at: '2024-03-13T12:36:06.290347+00:00',
      deleted: false,
      deleted_at: null,
      id: 19,
      message: 'test message 1',
      name: 'test template 1',
      status: 'test status 1',
      tenant_id: {
        hex: '9b11bc70b91411eda0b1722084980ce8',
      },
      updated_at: null,
    },
    {
      agent_id: 'blendar@opgny.com',
      created_at: '2024-03-14T12:06:50.398951+00:00',
      deleted: false,
      deleted_at: null,
      id: 20,
      message: '<p>Happy <strong>holidays sms&nbsp;</strong></p>',
      name: 'Happy Holidays SMS',
      status: 'active',
      tenant_id: {
        hex: '9b11bc70b91411eda0b1722084980ce8',
      },
      updated_at: null,
    },
    {
      agent_id: 'blendar@opgny.com',
      created_at: '2024-03-14T12:37:15.427033+00:00',
      deleted: false,
      deleted_at: null,
      id: 21,
      message: 'New SMS Temp',
      name: 'New SMS Temp',
      status: 'active',
      tenant_id: {
        hex: '9b11bc70b91411eda0b1722084980ce8',
      },
      updated_at: null,
    },
  ];
  return (
    <SettingsLayout>
      <TopBar text="SMS Templates" />
      <hr></hr>
      <Table tableFor={'templates'} data={smsTemplate} />
    </SettingsLayout>
  );
};

export default index;
