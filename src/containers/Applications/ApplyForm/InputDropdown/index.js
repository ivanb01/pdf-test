import React, { useState } from 'react';
import ApiInputDropdown from '@components/shared/ApiInputDropdown';
import useDebouncedValue from 'hooks/useDebounceValue';
import { useFetchProperties } from 'containers/Applications/queries/queries';
import Image from 'next/image';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const InputDropdown = ({ onListItemClick }) => {
  const [searchValue, setSearchValue] = useState('');
  const debounceValue = useDebouncedValue(searchValue, 500);

  const { data, isFetched } = useFetchProperties(debounceValue);

  return (
    <div>
      <ApiInputDropdown>
        <ApiInputDropdown.SearchInput searchValue={searchValue} setSearchValue={setSearchValue} />
        <ApiInputDropdown.List className="rounded-b shadow-md">
          {isFetched && data ? (
            data?.LISTINGS.map((listing) => {
              const url = listing.PHOTOS.find((photo) => photo.PHOTO_URL.includes('https://rls.realty.mx'));

              return (
                <ApiInputDropdown.ListItem onItemClick={() => onListItemClick(listing)} key={listing.ID}>
                  <div key={listing.ID} className="p-4 hover:bg-gray10 cursor-pointer">
                    <div className="flex gap-[10px] items-center relative">
                      <div className="h-[72px] w-[72px] flex justify-center items-center">
                        {url && (
                          <Image
                            className="rounded object-cover"
                            src={url.PHOTO_URL}
                            alt=""
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{ width: 'auto', height: '100%' }}
                          />
                        )}
                      </div>
                      <div className="flex flex-col font-medium leadin-5 text-sm text-gray7 grow">
                        <p>{listing.LISTING_TITLE}</p>
                        <p className="text-gray4">{listing.NEIGHBORHOODS}</p>
                        <p>
                          ${listing.PRICE}
                          <span className="text-gray4">/mo</span>
                        </p>
                      </div>
                      <div className="absolute right-0 top-0 flex items-start text-blue2 cursor-pointer">
                        <OpenInNewIcon className="w-[16px] h-[16px]" />
                      </div>
                    </div>
                  </div>
                </ApiInputDropdown.ListItem>
              );
            })
          ) : (
            <div></div>
          )}
        </ApiInputDropdown.List>
      </ApiInputDropdown>
    </div>
  );
};

export default InputDropdown;
