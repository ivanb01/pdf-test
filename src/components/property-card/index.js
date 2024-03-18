import { formatPrice, getBaseUrl } from '@global/functions';
import room from '/public/images/room.svg';
import InsertLinkOutlinedIcon from '@mui/icons-material/InsertLinkOutlined';
import bathroom from '/public/images/bathroom.svg';
import sqft from '/public/images/sqft.svg';
import placeholder from '/public/images/img-placeholder.png';
import { toast } from 'react-hot-toast';
import link from '/public/images/link-2.svg';
import React, { useEffect, useState } from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import TooltipComponent from '@components/shared/tooltip';
import ThumbUp from '../../../public/images/icons/thumbUp.svg';
import ThumbDown from '../../../public/images/icons/thumbDown.svg';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import TextArea from '@components/shared/textarea';
import Button from '@components/shared/button';
import PopoverComponent from '@components/shared/Popover';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Overlay from '@components/shared/overlay';
import { createPortal } from 'react-dom';
const ImageGallery = ({ images, url }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const showButtons = images?.length > 1;
  const showPrevButton = showButtons && currentIndex > 0;
  const showNextButton = showButtons && currentIndex < images.length - 1;
  const showNextImage = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  const showPrevImage = () => {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };

  return (
    <>
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className={`${!url ? 'pointer-events-none' : 'pointer-events-auto'}`}>
        <img
          className="object-cover h-full w-full"
          src={images?.length > 0 ? images[currentIndex].PHOTO_URL : placeholder.src}
          alt="Gallery Image"
        />
      </a>
      {showPrevButton && (
        <div
          className={
            'absolute top-[65px] left-3 h-[30px] w-[30px] rounded-full bg-black bg-opacity-60 flex items-center justify-center text-white cursor-pointer'
          }>
          <KeyboardArrowLeftIcon
            onClick={(e) => {
              e.stopPropagation();
              showPrevImage();
            }}
          />
        </div>
      )}
      {showNextButton && (
        <div
          className={
            'absolute right-3 top-[65px] h-[30px] w-[30px] rounded-full bg-black bg-opacity-60 flex items-center justify-center text-white cursor-pointer'
          }>
          <KeyboardArrowRightIcon
            onClick={(e) => {
              e.stopPropagation();
              showNextImage();
            }}
          />
        </div>
      )}
    </>
  );
};

const PropertyCard = ({
  property,
  selected,
  setSelected,
  noSelect,
  isSelected,
  putFeedback,
  openPropertyModal,
  propertyStatus,
  addClientFeedback,
  deletePropertyFromPortfolio,
  clientNote,
}) => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  useEffect(() => {
    setLiked(propertyStatus !== 'liked');
    setDisliked(propertyStatus !== 'disliked');
  }, [propertyStatus, property]);
  const [openFeedbackModal, setOpenFeedbackModal] = useState(false);
  const [value, setValue] = useState(undefined);
  let status = '';
  if (property?.STATUS == 'Rented') {
    status = '&status=22';
  } else if (property?.STATUS == 'Sold') {
    status = '&status=19';
  }
  let url = `${getBaseUrl()}/property?id=${property?.ID}` + status;

  return (
    <div
      onClick={() => {
        if (putFeedback) {
          openPropertyModal();
        }
      }}
      className={`border transition-all border-gray-200 rounded-[4px] ${putFeedback && 'cursor-pointer'} ${
        isSelected && ' border border-lightBlue3 custom-box-shadow'
      }`}>
      <div className="h-[160px] relative">
        <ImageGallery images={property?.PHOTOS} property={property} url={!putFeedback ? url : undefined} />
        <div
          className={`absolute ${putFeedback ? 'top-2' : 'bottom-2'} left-2 flex items-center justify-center border ${
            property?.STATUS?.toLowerCase() === 'sold' || property?.STATUS?.toLowerCase() === 'for sale'
              ? 'bg-indigo-50 border-indigo-600 text-indigo-600'
              : 'border-cyan-800 bg-cyan-50 text-cyan-800'
          } rounded-full h-fit px-2 py-1 text-[10px] font-medium`}>
          {property?.STATUS}
        </div>
        {deletePropertyFromPortfolio && (
          <div className={'flex gap-2 absolute top-2 right-3 justify-center'}>
            {clientNote && clientNote.length > 0 && (
              <div
                role={'button'}
                onClick={() => setOpenFeedbackModal(true)}
                className={`rounded-full border border-gray1 bg-[#FFFFFF90] text-gray5 h-fit px-2 py-1 text-[10px] font-medium flex items-center justify-center cursor-pointer`}>
                Client’s thoughts
              </div>
            )}
          </div>
        )}
        {!putFeedback && (
          <div className={'flex gap-2'}>
            <TooltipComponent
              side={'bottom'}
              align={'center'}
              triggerElement={
                <a
                  className=" h-7 w-7  rounded-full flex items-center bg-white justify-center cursor-pointer absolute bottom-2 right-10"
                  onClick={() => {
                    navigator.clipboard.writeText(url);
                    toast.success('Link copied to clipboard');
                  }}>
                  <InsertLinkOutlinedIcon className={'h-5 w-5'} />
                </a>
              }>
              <p className={'text-[10px] text-white font-medium'}>Copy Link</p>
            </TooltipComponent>
            {deletePropertyFromPortfolio && (
              <TooltipComponent
                side={'bottom'}
                align={'center'}
                triggerElement={
                  <div
                    role={'button'}
                    onClick={() => deletePropertyFromPortfolio()}
                    className={` h-7 w-7  rounded-full flex items-center bg-white  absolute bottom-2 right-2 justify-center cursor-pointer`}>
                    <DeleteOutlinedIcon className={'h-5 w-5 text-red3'} />
                  </div>
                }>
                <p className={'text-[10px] text-white font-medium'}>Delete property</p>
              </TooltipComponent>
            )}
          </div>
        )}
      </div>
      <div
        className={`p-3 text-sm ${noSelect ? 'pointer-events-none' : 'pointer-events-auto'}`}
        onClick={() => {
          if (!putFeedback) {
            const currentSelected = selected.find((found) => found.ID == property.ID) ? true : false;
            if (currentSelected) {
              setSelected((prevSelected) => prevSelected.filter((item) => item.ID !== property.ID));
            } else {
              setSelected((prevSelected) => [...prevSelected, property]);
            }
          }
        }}>
        <div className="mb-4">
          <div className="font-semibold text-black mb-[6px]">
            {property?.PROPERTY_TYPE} in {property?.ADDRESS}
          </div>
          <div className="text-gray-600">
            {property?.ADDRESS} <br />
            {property?.NEIGHBORHOODS}, {property?.CITY}, {property?.STATE} {property?.ZIP_CODE}
          </div>
        </div>
        <div className="mb-3 flex font-medium">
          <div className="mr-3 bg-gray-100 text-gray-500 flex items-center p-[6px] rounded-[222px]">
            <img className="mr-2" src={room.src} alt="" />
            {property?.BEDROOMS}
          </div>
          <div className="mr-3 bg-gray-100 text-gray-500 flex items-center p-[6px] rounded-[222px]">
            <img className="mr-2" src={bathroom.src} alt="" />
            {property?.BATHROOMS}
          </div>
          {property?.SQUARE_FOOTAGE != 0 && (
            <div className="bg-gray-100 text-gray-500 flex items-center p-[6px] rounded-[222px]">
              <img className="mr-1" src={sqft.src} alt="" />
              {property?.SQUARE_FOOTAGE} sqft
            </div>
          )}
        </div>
        <div className="flex items-center justify-between">
          <div className="font-semibold text-gray-900 text-base">
            {formatPrice(property?.PRICE)}
            {property?.STATUS?.toLowerCase() == 'for rent' && <span className="text-gray-500 font-normal">/month</span>}
          </div>
          <div className="form-checkbox">
            {putFeedback && (
              <div className={'flex gap-[6px] pointer-events-auto'}>
                <div
                  className={'cursor-pointer'}
                  role={'button'}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!disliked) {
                      setDisliked(true);
                    }
                    setLiked(!liked);
                  }}>
                  {liked ? (
                    <img src={ThumbUp.src} onClick={() => addClientFeedback(property.ID, 'liked', '')} />
                  ) : (
                    <ThumbUpIcon
                      className={'text-lightBlue5 h-5 w-5'}
                      onClick={() => addClientFeedback(property.ID, 'saved', '')}
                    />
                  )}
                </div>
                {disliked ? (
                  <PopoverComponent
                    side={'bottom'}
                    align={'center'}
                    style={{ backgroundColor: 'white' }}
                    triggerElement={<img src={ThumbDown.src} onClick={(e) => e.stopPropagation()} />}>
                    <div className="max-w-[252px] bg-white">
                      <TextArea
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className={'min-h-[90px]'}
                        handleChange={(e) => {
                          setValue(e.target.value);
                        }}
                        placeholder={
                          'Please give us your opinion about this property. It will help us improve for next time.'
                        }
                        value={value}
                      />
                      <Button
                        primary
                        className={'min-w-[252px] mt-[14px]'}
                        onClick={(e) => {
                          e.stopPropagation();
                          setDisliked(false);
                          addClientFeedback(property.ID, 'disliked', value ?? '');
                          setValue('');
                        }}>
                        Send your feedback
                      </Button>
                    </div>
                  </PopoverComponent>
                ) : (
                  <ThumbDownIcon
                    className={'text-lightBlue5 h-5 w-5'}
                    onClick={(e) => {
                      e.stopPropagation();
                      setDisliked(true);
                      setLiked(true);
                      addClientFeedback(property.ID, 'saved', value);
                    }}
                  />
                )}
                {/*<div*/}
                {/*  role={'button'}*/}
                {/*  className={'cursor-pointer'}*/}
                {/*  onClick={(e) => {*/}
                {/*    e.stopPropagation();*/}
                {/*    if (!liked) {*/}
                {/*      setLiked(true);*/}
                {/*    }*/}
                {/*    setDisliked(!disliked);*/}
                {/*  }}>*/}
                {/*  {disliked ? <img src={ThumbDown.src} /> : <ThumbDownIcon className={'text-lightBlue5 h-5 w-5'} />}*/}
                {/*</div>*/}
              </div>
            )}
            <input
              type="checkbox"
              id={`checkbox-${property?.ID}`}
              class="hidden"
              value={selected?.length && selected?.includes(property)}
            />
            {!noSelect && (
              <label
                htmlFor={`checkbox-${property?.ID}`}
                class="flex items-center cursor-pointer"
                onClick={(e) => e.preventDefault()}>
                <div
                  class={`${
                    isSelected ? 'bg-lightBlue3' : 'border border-gray-300'
                  } relative rounded-full w-6 h-6 flex flex-shrink-0 justify-center items-center`}>
                  {isSelected && (
                    <svg
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                      version="1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 48 48"
                      enable-background="new 0 0 48 48">
                      <polygon fill="white" points="40.6,12.1 17,35.7 7.4,26.1 4.6,29 17,41.3 43.4,14.9" />
                    </svg>
                  )}
                </div>
              </label>
            )}
          </div>
        </div>
      </div>
      {openFeedbackModal &&
        createPortal(
          <Overlay
            handleCloseOverlay={() => setOpenFeedbackModal(false)}
            className="w-[500px]"
            title={"Client's thoughts"}>
            <p className={'text-sm pointer-events-none text-gray8 p-6 pt-0'}>{clientNote}</p>
          </Overlay>,
          document.getElementById('modal-portal'),
        )}
    </div>
  );
};

export default PropertyCard;
