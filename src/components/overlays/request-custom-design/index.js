import Overlay from '@components/shared/overlay';
import Input from '@components/shared/input';
import TextArea from '@components/shared/textarea';
import Button from '@components/shared/button';
import { useEffect, useState } from 'react';
import ImagesGrid from '@components/marketing/ImagesGrid';
import SimpleBar from 'simplebar-react';

const RequestCustomDesign = ({ handleOverlayClose }) => {
  const [totalFileSize, setTotalFileSize] = useState(0);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const calculatedTotalFileSize = images.length > 0 && images.reduce((sum, obj) => sum + obj.fileSize, 0);
    setTotalFileSize(calculatedTotalFileSize);
  }, [images]);
  const generateRandomID = () => {
    let randomID = '';
    for (let i = 0; i < 5; i++) {
      randomID += Math.floor(Math.random() * 10);
    }
    return randomID;
  };

  const uploadImage = (e) => {
    const { files } = e.target;
    if (files.length === 0) {
      return;
    }

    const file = files[0];
    const fileReader = new FileReader();
    const newImage = {
      id: generateRandomID(),
      src: null,
      uploadPercentage: 0,
      fileSize: file.size,
      fileName: file.name,
    };
    fileReader.onload = () => {
      newImage.src = fileReader.result;
      setImages([...images, newImage]);
    };
    fileReader.readAsDataURL(file);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'your_upload_endpoint_here', true);
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentage = (event.loaded / event.total) * 100;

        newImage.uploadPercentage = percentage; // Set the src property of newImage
        setImages([...images, newImage]);
      }
    };

    const formData = new FormData();
    formData.append('file', file);

    xhr.send(formData);
  };

  const deleteImage = (imageId) => {
    const updatedItems = images.filter((item) => item.id !== imageId);
    setImages(updatedItems);
  };

  return (
    <Overlay title={'Request Custom Digital Design'} handleCloseOverlay={handleOverlayClose} className="w-[1000px]">
      <div className={'flex gap-10 mx-6 mt-6 mb-8'}>
        <div className={'flex-1'}>
          <h6 className={'text-xs leading-4 font-medium text-gray-500 mb-3'}>
            If you have anything specific, or a sample that would like to show to us. Please upload down below.
          </h6>
          <div className="col-span-full">
            <div
              className="mt-2 flex justify-center rounded-lg px-6 py-10"
              style={{
                backgroundImage: `url(
                "data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='6' ry='6' stroke='%23D1D5DBFF' stroke-width='2' stroke-dasharray='6%2c 14' stroke-dashoffset='61' stroke-linecap='square'/%3e%3c/svg%3e"
  )`,
                borderRadius: '6px',
                height: '210px',
                width: '420px',
              }}>
              <div className="text-center flex flex-col items-center justify-center">
                <svg
                  width="48"
                  height="49"
                  viewBox="0 0 48 49"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={'mx-auto'}>
                  <path
                    d="M28 8.44287H12C10.9391 8.44287 9.92172 8.8643 9.17157 9.61444C8.42143 10.3646 8 11.382 8 12.4429V32.4429M8 32.4429V36.4429C8 37.5037 8.42143 38.5212 9.17157 39.2713C9.92172 40.0214 10.9391 40.4429 12 40.4429H36C37.0609 40.4429 38.0783 40.0214 38.8284 39.2713C39.5786 38.5212 40 37.5037 40 36.4429V28.4429M8 32.4429L17.172 23.2709C17.9221 22.521 18.9393 22.0997 20 22.0997C21.0607 22.0997 22.0779 22.521 22.828 23.2709L28 28.4429M40 20.4429V28.4429M40 28.4429L36.828 25.2709C36.0779 24.521 35.0607 24.0997 34 24.0997C32.9393 24.0997 31.9221 24.521 31.172 25.2709L28 28.4429M28 28.4429L32 32.4429M36 8.44287H44M40 4.44287V12.4429M28 16.4429H28.02"
                    stroke="#9CA3AF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="mt-1 flex text-sm leading-6 text-gray-600 items-center">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-lightBlue3 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                    <span className={'text-sm leading-5 font-medium text-lightBlue3'}>Upload a file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      onChange={(e) => {
                        uploadImage(e);
                        e.target.value = null;
                      }}
                    />
                  </label>
                  <p className="pl-1 text-sm leading-5 font-medium text-gray-600">or drag and drop</p>
                </div>
                <p className="text-xs leading-4 font-normal text-gray-600 ">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>
          <SimpleBar style={{ height: '250px' }}>
            {images.length > 0 &&
              images.map((image) => <ImagesGrid {...image} deleteImage={deleteImage} totalFileSize={totalFileSize} />)}
          </SimpleBar>
        </div>
        <div className={'w-px bg-gray-200'}></div>
        <div className={'flex-1'}>
          <form className={'flex flex-col gap-6 '}>
            <div className={'grid grid-cols-2 gap-6'}>
              <Input type="text" label="Name" id="name" placeholder={'Enter Name'} />
              <Input type="text" label="Lastname" id="lastname" placeholder={'Enter Name'} />
            </div>
            <div className={'grid grid-cols-2 gap-6'}>
              <Input type="email" label="Email address" id="email" placeholder={'Enter Email'} />
              <Input type="text" label="Phone Number" id="phoneNumber" placeholder={'+1(123) 123 1234'} />
            </div>
            <Input type="text" label="Lasting url" id="lastingUrl" placeholder={'Enter url'} />
            <TextArea className="min-h-[120px]" id="note" label="Note"></TextArea>
            <div className={'grid grid-cols-2 gap-6'}>
              <Input
                type="date"
                label="I need this to be ready until"
                id="date"
                className={'col-span-1'}
                placeholder={'mm/dd/yyyy'}
              />
            </div>
          </form>
        </div>
      </div>
      <div
        className="flex items-end justify-end py-4 pr-6"
        style={{ boxShadow: '0px -2px 12px 1px rgba(0, 0, 0, 0.07)' }}>
        <Button className={`mr-4`} white onClick={handleOverlayClose}>
          Cancel
        </Button>
        <Button primary onClick={handleOverlayClose}>
          Send Request
        </Button>
      </div>
    </Overlay>
  );
};

export default RequestCustomDesign;
