import React from 'react';
import { useRouter } from 'next/router';

const PageHeaderBar = () => {
  const { pathname } = useRouter();
  return (
    <div className="capitalize h-[72px] border-b-[1px] flex items-center p-6 text-lg leading-6 text-gray7">
      {pathname.replace('/', '').replace('-', ' ')}
    </div>
  );
};

export default PageHeaderBar;
