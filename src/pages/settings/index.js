import MainMenu from '@components/shared/menu';
import { Disclosure } from '@headlessui/react';
import { ChevronRightIcon, CreditCardIcon, UserIcon } from '@heroicons/react/solid';
import {
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
} from '@heroicons/react/outline';
import { Security, Summarize } from '@mui/icons-material';

const index = () => {
  const templatesTab = () => {
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
      <>
        <TopBar text="Templates" />
        <hr></hr>
        <Table tableFor={'templates'} data={emailTemplate} />
      </>
    );
  };
  const navigation = [
    { name: 'My Profile', href: '#', icon: <UserIcon height={20} className="w-[20px]" />, current: true },
    {
      name: 'Account Management',
      icon: <Security height={20} className="w-[20px]" />,
      current: false,
    },
    {
      name: 'Billing',
      icon: <CreditCardIcon height={20} className="w-[20px]" />,
      current: false,
    },
    {
      name: 'Templates',
      href: '#',
      icon: <Summarize height={20} className="w-[20px]" />,
      current: false,
      children: [
        { name: 'Email', href: '#' },
        { name: 'SMS', href: '#' },
      ],
    },
  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }
  return (
    <>
      <MainMenu />
      <div className="flex h-full">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-gray-200 bg-white p-6 border-r min-w-[350px]">
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      {!item.children ? (
                        <a
                          href={item.href}
                          className={classNames(
                            item.current ? 'bg-lightBlue1 text-lightBlue3' : 'hover:bg-gray-50',
                            'cursor-pointer group flex gap-x-3 rounded-md p-2 text-sm leading-6 text-gray5',
                          )}>
                          {item.icon}
                          {item.name}
                        </a>
                      ) : (
                        <Disclosure as="div">
                          {({ open }) => (
                            <>
                              <Disclosure.Button
                                className={classNames(
                                  item.current ? 'bg-lightBlue1 text-lightBlue3' : 'hover:bg-gray-50',
                                  'flex items-center w-full text-left rounded-md p-2 gap-x-3 text-sm leading-6 text-gray5',
                                )}>
                                {item.icon}
                                {item.name}
                                <ChevronRightIcon
                                  className={classNames(
                                    open ? 'rotate-90 text-gray-500' : 'text-gray-400',
                                    'ml-auto h-5 w-5 shrink-0',
                                  )}
                                  aria-hidden="true"
                                />
                              </Disclosure.Button>
                              <Disclosure.Panel as="ul" className="mt-1 px-2">
                                {item.children.map((subItem) => (
                                  <li key={subItem.name}>
                                    {/* 44px */}
                                    <Disclosure.Button
                                      as="a"
                                      href={subItem.href}
                                      className={classNames(
                                        subItem.current ? 'bg-lightBlue1 text-lightBlue3' : 'hover:bg-gray-50',
                                        'block rounded-md py-2 pr-2 pl-9 text-sm leading-6 text-gray5',
                                      )}>
                                      {subItem.name}
                                    </Disclosure.Button>
                                  </li>
                                ))}
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                      )}
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
        <div className="w-full">Content</div>
      </div>
    </>
  );
};

export default index;
