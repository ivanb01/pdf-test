import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar } from 'swiper/modules';

const PropertiesCarousel = ({ data, updateLightBoxTrigger }) => {
  const updateTrigger = (slide) => {
    if (updateLightBoxTrigger) {
      updateLightBoxTrigger(slide);
    } else {
      return;
    }
  };
  return (
    data && (
      <div className="flex md:h-[500px] h-[300px] relative">
        {data?.PHOTOS?.length == 1 ? (
          <div className="w-full h-full">
            <img
              src={data.PHOTOS[0].PHOTO_URL}
              className="object-cover w-full  h-[500px] object-center"
              onClick={() => {
                updateTrigger(0);
              }}
            />
          </div>
        ) : data?.PHOTOS?.length == 2 ? (
          <>
            <div className="md:w-1/2 w-full h-full pr-3">
              <img
                src={data.PHOTOS[0].PHOTO_URL}
                className="object-cover w-full object-center"
                onClick={() => {
                  updateTrigger(0);
                }}
              />
            </div>
            <div className="md:w-1/2 w-full h-full min-h-[500px]">
              <img
                src={data.PHOTOS[1].PHOTO_URL}
                className="object-cover w-full  object-center  h-[500px]"
                onClick={() => {
                  updateTrigger(1);
                }}
              />
            </div>
          </>
        ) : (
          <>
            <Swiper
              scrollbar={{ draggable: true }}
              slidesPerView={3}
              style={{ marginRight: '24px', marginLeft: '24px' }}
              loop
              spaceBetween={12}
              navigation
              modules={[Pagination, Navigation, Scrollbar]}
            >
              {data?.PHOTOS?.map((picture, index) => (
                <SwiperSlide key={index} className="mr-3 last:mr-0 md:w-2/5 w-full">
                  <img
                    onClick={() => {
                      updateTrigger(index);
                    }}
                    src={picture.PHOTO_URL}
                    alt={`Image ${index + 1}`}
                    className="object-cover w-full  object-center h-[300px] md:h-[500px] cursor-pointer"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </>
        )}
      </div>
    )
  );
};

export default PropertiesCarousel;
