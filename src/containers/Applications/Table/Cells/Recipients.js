import React, { useEffect, useMemo, useRef, useState } from 'react';

export const RecipientsCell = ({ info }) => {
  const [showContacts, setShowContacts] = useState(false);
  const popOverRef = useRef(null);
  const contactsRef = useRef(null);
  const contactsLength = info.getValue().length;
  const otherContancts = [...info.getValue()];
  otherContancts.shift();

  const useOutsideAlerter = (ref) => {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target) && !contactsRef.current.contains(event.target)) {
          setShowContacts(false);
        }
      }
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  };

  useOutsideAlerter(popOverRef);
  const popOverClassName = useMemo(() => {
    return `absolute z-10 bg-white right-[25px] translate-x-full top-[40px] shadow-lg p-4 flex flex-col gap-3 rounded-lg opacity-0  ${
      showContacts ? 'opacity-100' : 'opacity-0 transition-opacity  duration-300 ease-in-out pointer-events-none'
    }`;
  }, [showContacts]);

  return (
    <div className="min-w-[200px] flex items-center gap-3 px-4 relative">
      {info.getValue().length ? (
        <>
          <div className=" flex flex-col">
            <p>{info.getValue()[0].name}</p>
            <p className="font-normal text-gray4">{info.getValue()[0].email}</p>
          </div>
          {!!(contactsLength - 1) && (
            <div className="relative">
              <div
                ref={contactsRef}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowContacts(!showContacts);
                }}
                className="cursor-pointer rounded-full flex justify-center items-center w-[25px] h-[25px] bg-gray4 text-white text-[10px] leading-4 font-medium ">
                <span className="mr-[2px]">{`+${contactsLength - 1}`}</span>
              </div>

              <div ref={popOverRef} className={popOverClassName}>
                {otherContancts.map((contact) => {
                  return (
                    <div className=" flex flex-col" id={contact.id} key={contact.id}>
                      <p className="text-xs leading-4">{contact.name}</p>
                      <p className="text-xs leading-4 font-normal text-gray4">{contact.email}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </>
      ) : (
        <span>--</span>
      )}
    </div>
  );
};
