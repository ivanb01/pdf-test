import { useLayoutEffect, useRef, useState } from 'react';
import MainMenu from 'components/shared/menu';
import Table from 'components/shared/table';

const index = () => {
  const [data, setData] = useState([
    {
      agent_id: 'blendar@opgny.com',
      campaign_id: null,
      campaign_name: null,
      category_1: 'Client',
      category_2: 'Seller',
      category_id: 5,
      city: null,
      country: null,
      created_at: '2023-05-11T16:43:49.781059+00:00',
      deleted: false,
      deleted_at: null,
      email: 'willard@hotmail.com',
      facebook: null,
      first_name: 'Willard',
      id: 3710,
      import_source: 'Google Contacts',
      instagram: null,
      is_in_campaign: null,
      last_communication_category_id: null,
      last_communication_date: '2023-06-05T12:15:58.155795+00:00',
      last_name: 'Kolmetz',
      lead_source: null,
      linkedin: null,
      phone_number: null,
      postal_code: null,
      primary_contact_id: null,
      profile_image_path:
        'https://lh3.googleusercontent.com/cm/AOLgnvsoqcVzGZc4xAAs0gpHstxXaO_8ArTMlK7sN1WHTX-8TNJEzIx5ZuX_r0nRKpZX=s100',
      state: null,
      status_1: 'Closed',
      status_2: 'Contract Signed',
      status_id: 9,
      street_name: null,
      street_number: null,
      tags: ['High Priority'],
      tenant_id: '9b11bc70-b914-11ed-a0b1-722084980ce8',
      tiktok: null,
      twitter: null,
      updated_at: '2023-06-09T08:49:20.820059+00:00',
      youtube: null,
    },
    {
      agent_id: 'blendar@opgny.com',
      campaign_id: null,
      campaign_name: null,
      category_1: 'Client',
      category_2: 'Seller',
      category_id: 5,
      city: null,
      country: null,
      created_at: '2023-05-11T16:43:49.781059+00:00',
      deleted: false,
      deleted_at: null,
      email: 'willard@hotmail.com',
      facebook: null,
      first_name: 'Willard',
      id: 3710,
      import_source: 'Google Contacts',
      instagram: null,
      is_in_campaign: null,
      last_communication_category_id: null,
      last_communication_date: '2023-06-05T12:15:58.155795+00:00',
      last_name: 'Kolmetz',
      lead_source: null,
      linkedin: null,
      phone_number: null,
      postal_code: null,
      primary_contact_id: null,
      profile_image_path:
        'https://lh3.googleusercontent.com/cm/AOLgnvsoqcVzGZc4xAAs0gpHstxXaO_8ArTMlK7sN1WHTX-8TNJEzIx5ZuX_r0nRKpZX=s100',
      state: null,
      status_1: 'Closed',
      status_2: 'Contract Signed',
      status_id: 9,
      street_name: null,
      street_number: null,
      tags: ['High Priority'],
      tenant_id: '9b11bc70-b914-11ed-a0b1-722084980ce8',
      tiktok: null,
      twitter: null,
      updated_at: '2023-06-09T08:49:20.820059+00:00',
      youtube: null,
    },
    {
      agent_id: 'blendar@opgny.com',
      campaign_id: null,
      campaign_name: null,
      category_1: 'Client',
      category_2: 'Seller',
      category_id: 5,
      city: null,
      country: null,
      created_at: '2023-05-11T16:43:49.781059+00:00',
      deleted: false,
      deleted_at: null,
      email: 'willard@hotmail.com',
      facebook: null,
      first_name: 'Willard',
      id: 3710,
      import_source: 'Google Contacts',
      instagram: null,
      is_in_campaign: null,
      last_communication_category_id: null,
      last_communication_date: '2023-06-05T12:15:58.155795+00:00',
      last_name: 'Kolmetz',
      lead_source: null,
      linkedin: null,
      phone_number: null,
      postal_code: null,
      primary_contact_id: null,
      profile_image_path:
        'https://lh3.googleusercontent.com/cm/AOLgnvsoqcVzGZc4xAAs0gpHstxXaO_8ArTMlK7sN1WHTX-8TNJEzIx5ZuX_r0nRKpZX=s100',
      state: null,
      status_1: 'Closed',
      status_2: 'Contract Signed',
      status_id: 9,
      street_name: null,
      street_number: null,
      tags: ['High Priority'],
      tenant_id: '9b11bc70-b914-11ed-a0b1-722084980ce8',
      tiktok: null,
      twitter: null,
      updated_at: '2023-06-09T08:49:20.820059+00:00',
      youtube: null,
    },
  ]);

  const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ');
  };

  const checkbox = useRef();
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const [selectedPeople, setSelectedPeople] = useState([]);

  useLayoutEffect(() => {
    const isIndeterminate =
      selectedPeople.length > 0 && selectedPeople.length < data.length;
    setChecked(selectedPeople.length === data.length);
    setIndeterminate(isIndeterminate);
    checkbox.current.indeterminate = isIndeterminate;
  }, [selectedPeople]);

  const toggleAll = () => {
    setSelectedPeople(checked || indeterminate ? [] : data);
    setChecked(!checked && !indeterminate);
    setIndeterminate(false);
  };
  return (
    <div className="">
      <MainMenu />
      <Table
        data={data}
        tableFor="ai-summary"
        checkbox={checkbox}
        checked={checked}
        toggleAll={toggleAll}
        selectedPeople={selectedPeople}
        setSelectedPeople={setSelectedPeople}
      />
    </div>
  );
};

export default index;
