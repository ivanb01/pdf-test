import { ChevronRightIcon, HomeIcon } from '@heroicons/react/solid';
import Router from 'next/router';

const pages = [
  { name: 'Clients', href: '/contacts', current: false },
  { name: 'Client Details', href: '#', current: true },
];

export default function Breadcrumbs({ className, ...props }) {
  return (
    <nav className={`flex w-[100%] ${className} `} aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-4">
        {pages.map((page, index) => (
          <li key={page.name}>
            <div className="flex items-center">
              <a
                href="#"
                className={`mr-4 text-sm font-medium text-gray-500 hover:text-gray6 ${page.current && 'text-gray6'} `}
                aria-current={page.current ? 'page' : undefined}
                onClick={() => Router.push('/contacts/clients')}
              >
                {page.name}
              </a>
              {index + 1 != pages.length && (
                <ChevronRightIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
