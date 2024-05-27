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
import FsLightbox from 'fslightbox-react';
import { useRouter } from 'next/router';
import { createPortal } from 'react-dom';
import CircularProgress from '@mui/material/CircularProgress';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import CollectionsIcon from '@mui/icons-material/Collections';
import { AnimatePresence, motion } from 'framer-motion';

const ImageGallery = ({ images, onClick, noSelect, selected, isSelected, property, putFeedback, setSelected }) => {
  return (
    <div className={`group h-full w-full cursor-pointer`} role={'button'}>
      <img
        className="object-cover h-full w-full rounded-[3px]"
        src={images?.length > 0 ? images[0].PHOTO_URL : placeholder.src}
        alt="Gallery Image"
      />
      {!noSelect && (
        <div className="absolute right-2 top-2 z-10" role={'button'}>
          <input
            type="checkbox"
            id={`checkbox-${property?.ID}`}
            className="hidden"
            value={selected?.length && selected?.includes(property)}
          />
          <label
            htmlFor={`checkbox-${property?.ID}`}
            className="flex items-center cursor-pointer"
            onClick={(e) => {
              if (!putFeedback) {
                const currentSelected = selected.find((found) => found.ID == property.ID) ? true : false;
                if (currentSelected) {
                  setSelected((prevSelected) => prevSelected.filter((item) => item.ID !== property.ID));
                } else {
                  setSelected((prevSelected) => [...prevSelected, property]);
                }
              }
            }}>
            <div
              className={`${
                isSelected ? 'bg-lightBlue3 border-lightBlue3' : 'border-white bg-[#0000007c]'
              } relative rounded-lg border-2  w-6 h-6 flex flex-shrink-0 justify-center items-center`}>
              {isSelected && (
                <svg
                  className=" h-[16px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  version="1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 50 50"
                  enable-background="new 0 0 50 50">
                  <polygon fill="white" points="40.6,12.1 17,35.7 7.4,26.1 4.6,29 17,41.3 43.4,14.9" />
                </svg>
              )}
            </div>
          </label>
        </div>
      )}
    </div>
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
  isPropertyDeleteing,
}) => {
  const [liked, setLiked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
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
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxPhotos, setLightboxPhotos] = useState([]);
  const [lightboxSlide, setLightboxSlide] = useState(0);

  return (
    <div
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onClick={() => {
        if (putFeedback) {
          openPropertyModal();
        }
      }}
      className={`group border transition-all border-gray-200 rounded-[4px] cursor-pointer ${
        isSelected && ' border border-lightBlue3 custom-box-shadow'
      }`}>
      <div className="h-[160px] relative">
        <ImageGallery
          images={property?.PHOTOS}
          property={property}
          url={!putFeedback ? url : undefined}
          selected={selected}
          setSelected={setSelected}
          isSelected={isSelected}
          noSelect={noSelect}
          putFeedback={putFeedback}
        />
        {deletePropertyFromPortfolio && (
          <div className={'flex  gap-2 absolute bottom-2 left-2 justify-center '}>
            {clientNote && clientNote.length > 0 && (
              <TooltipComponent
                side={'bottom'}
                align={'center'}
                triggerElement={
                  <div
                    role={'button'}
                    onClick={() => setOpenFeedbackModal(true)}
                    className={`rounded-full pb-[3px]  px-2 pt-1  flex items-center justify-center cursor-pointer h-7 w-7 bg-white`}>
                    <InsertCommentIcon className={'text-gray5 h-4 w-4'} />
                  </div>
                }>
                <p className={'text-[10px] text-white font-medium'}>Client's feedback</p>
              </TooltipComponent>
            )}
          </div>
        )}

        {!putFeedback && (
          <div className={'flex absolute top-2 px-3 justify-between items-center w-full'}>
            <div
              className={`flex items-center justify-center  ${
                property?.STATUS?.toLowerCase() === 'sold' || property?.STATUS?.toLowerCase() === 'for sale'
                  ? 'bg-indigo-50 border-indigo-600 text-indigo-600'
                  : 'border-cyan-800 bg-cyan-50 text-cyan-800'
              } rounded-full h-fit px-2 py-1 text-[11px] font-medium`}>
              {property?.STATUS}
            </div>
          </div>
        )}
        {!putFeedback && (
          <AnimatePresence>
            <div className="flex items-center gap-3 absolute bottom-2  right-2">
              <TooltipComponent
                side={'bottom'}
                align={'center'}
                triggerElement={
                  isVisible && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      transition={{ ease: 'circOut' }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      role="button"
                      onClick={() => {
                        if (property.PHOTOS?.length > 0) {
                          setLightboxPhotos(property.PHOTOS);
                          setLightboxSlide(0);
                          setLightboxOpen(!lightboxOpen);
                        }
                      }}
                      className={'flex h-7 w-7  rounded-full  items-center bg-white justify-center cursor-pointer'}>
                      <CollectionsIcon className={'text-gray5 h-4 w-4'} />
                    </motion.div>
                  )
                }>
                <p className={'text-[10px] text-white font-medium'}>View Images</p>
              </TooltipComponent>
              <TooltipComponent
                side={'bottom'}
                align={'center'}
                triggerElement={
                  isVisible && (
                    <motion.a
                      initial={{ opacity: 0 }}
                      transition={{ ease: 'circOut' }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className=" h-7 w-7  rounded-full flex items-center bg-white justify-center cursor-pointer"
                      onClick={() => {
                        navigator.clipboard.writeText(url);
                        toast.success('Link copied to clipboard');
                      }}>
                      <InsertLinkOutlinedIcon className={'h-5 w-5 text-gray5'} />
                    </motion.a>
                  )
                }>
                <p className={'text-[10px] text-white font-medium'}>Copy Link</p>
              </TooltipComponent>

              {deletePropertyFromPortfolio && (
                <TooltipComponent
                  side={'bottom'}
                  align={'center'}
                  triggerElement={
                    isVisible && (
                      <motion.div
                        role={'button'}
                        onClick={() => deletePropertyFromPortfolio()}
                        className={` h-7 w-7  bg-red1 rounded-full flex items-center bg-red-1 justify-center cursor-pointer`}>
                        {isPropertyDeleteing?.loading && property?.ID == isPropertyDeleteing?.id ? (
                          <CircularProgress className={'h-5 w-5'} />
                        ) : (
                          <DeleteOutlinedIcon className={'h-5 w-5 text-red3'} />
                        )}
                      </motion.div>
                    )
                  }>
                  <p className={'text-[10px] text-white font-medium'}>
                    {!isPropertyDeleteing?.loading ? 'Delete property' : 'Property is being deleted'}
                  </p>
                </TooltipComponent>
              )}
            </div>
          </AnimatePresence>
        )}
      </div>
      <div
        onClick={() => {
          if (!putFeedback) {
            window.open(url, 'blank');
          }
        }}>
        <div className={`p-3 text-sm ${noSelect ? 'pointer-events-none' : 'pointer-events-auto'}`}>
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
            <div className="mr-3 bg-gray-100 text-gray-500 gap-[6px] flex items-center p-[6px] rounded-[222px]">
              <img src={room.src} alt="" />
              {property?.BEDROOMS}
            </div>
            <div className="mr-3 bg-gray-100  gap-[6px] text-gray-500 flex items-center p-[6px] rounded-[222px]">
              <img src={bathroom.src} alt="" />
              {property?.BATHROOMS}
            </div>
            {property?.SQUARE_FOOTAGE != 0 && (
              <div className="bg-gray-100 gap-[6px] text-gray-500 flex items-center p-[6px] rounded-[222px]">
                <img src={sqft.src} alt="" />
                {property?.SQUARE_FOOTAGE} sqft
              </div>
            )}
          </div>
          <div className="flex items-center justify-between">
            <div className="font-semibold text-gray-900 text-base">
              {formatPrice(property?.PRICE)}
              {property?.STATUS?.toLowerCase() == 'for rent' && (
                <span className="text-gray-500 font-normal">/month</span>
              )}
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
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {openFeedbackModal &&
        createPortal(
          <Overlay
            handleCloseOverlay={() => setOpenFeedbackModal(false)}
            className="w-[500px]"
            title={"Client's comments"}>
            <p className={'text-sm pointer-events-none text-gray8 p-6 pt-0'}>{clientNote}</p>
          </Overlay>,
          document.getElementById('modal-portal'),
        )}
      {createPortal(
        <FsLightbox
          types={[...new Array(lightboxPhotos?.length).fill('image')]}
          toggler={lightboxOpen}
          zoomIncrement={0.5}
          sourceIndex={lightboxSlide}
          sources={lightboxPhotos?.map((i) => i.PHOTO_URL)}
        />,
        document.getElementById('modal-portal'),
      )}
    </div>
  );
};

export default PropertyCard;
