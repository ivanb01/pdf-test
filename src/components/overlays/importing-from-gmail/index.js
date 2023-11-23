import Button from 'components/shared/button';
import Text from 'components/shared/text';
import Overlay from 'components/shared/overlay';
import img from '/public/images/importing.svg';
import Image from 'next/image';
import { CheckCircleIcon } from '@heroicons/react/solid';
import { useEffect, useState } from 'react';

const ImportGoogleContacts = ({ title, handleCloseOverlay, list, stateAfterImport, motionImage, emptyModal }) => {
  const [loadingButton, setLoadingButton] = useState(false);
  const [mainTitle, setMainTitle] = useState(title);
  const titleAfterImport = {
    'Not needed': 'No Contacts!',
    Successful: 'Imported Google Contacts',
    Failed: 'Something went wrong!',
  };
  const subtitleAfterImport = {
    'Not needed': 'There are no contacts to be imported from your Google Account.',
    Successful: 'Your contacts have been imported successfully.',
    Failed: 'Please contact dev@opgny.com so we can help you get your contacts imported.',
  };

  useEffect(() => {
    stateAfterImport && setMainTitle(titleAfterImport[stateAfterImport]);
  }, [stateAfterImport]);

  return (
    <Overlay title={mainTitle} className="min-w-[512px] max-w-[512px]">
      <div className="p-[24px]">
        <div className="">
          <div className="">
            <div className="mb-10 flex justify-center">
              {/* <Image src={img} alt="header-img" /> */}
              {!emptyModal ? (
                motionImage ? (
                  <lottie-player
                    src="/animations/importing.json"
                    background="transparent"
                    speed="1"
                    style={{ width: '160px', height: '128px' }}
                    loop
                    autoplay></lottie-player>
                ) : (
                  <Image src={img} alt="header-img" />
                )
              ) : (
                <div className="h-[228px]"></div>
              )}
            </div>

            {stateAfterImport && stateAfterImport != 'Not needed' ? (
              <>
                <Text h2 className="text-gray7 justify-center mb-2">
                  {titleAfterImport[stateAfterImport]}
                </Text>
                <Text p className="text-gray4 justify-center ">
                  {subtitleAfterImport[stateAfterImport]}
                </Text>
                <div className="flex justify-center">
                  <Button className="my-4" label="Okay" onClick={handleCloseOverlay} />
                </div>
              </>
            ) : list && list.length ? (
              list.map((item, index) => (
                <div
                  key={index}
                  className={`flex ${item.state === 'button' ? 'flex-row justify-end mt-5' : 'justify-center'}`}>
                  {item.state === 'button' ? (
                    <>
                      <Button className="mr-3 " white label="Cancel" onClick={handleCloseOverlay} />
                      <Button
                        label={item.text}
                        loading={loadingButton}
                        onClick={() => {
                          setLoadingButton(true);
                          item.handleClick();
                        }}
                      />
                    </>
                  ) : (
                    <>
                      <Text p className="text-gray7 text-center">
                        {item.text}
                      </Text>
                      {item.state === 'finished' ? <CheckCircleIcon className="h-5 w-5 text-green6" /> : null}
                    </>
                  )}
                </div>
              ))
            ) : null}

            {/* <Text p className="text-gray7 text-center">
              Importing contacts from Gmail{' '}
              <strong className="import-percentage ml-2">{progress}%</strong>
            </Text> */}
            {/* <div className="flex items-center justify-center">
              <div className="w-[300px] bg-lightBlue2 h-2 mb-6 rounded-lg mt-4">
                <div
                  className="bg-lightBlue3 h-2 rounded-lg"
                  style={{ width: progress + '%' }}
                ></div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </Overlay>
  );
};

export default ImportGoogleContacts;
