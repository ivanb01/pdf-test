import oneLineLogo from 'public/images/oneline-logo.svg';
import one from 'public/images/property/1.png';
import two from 'public/images/property/2.png';
import three from 'public/images/property/3.png';
import four from 'public/images/property/4.png';
import five from 'public/images/property/5.png';
import Image from 'next/image';
import location from 'public/images/location.png';
import { useState } from 'react';
const index = () => {
  const pictures = [one, two, three, four, five];

  const [data, setData] = useState({
    ismls: 0,
    iscompany: 1,
    financials_freemonth: 0,
    main_zipcode: '10023',
    agents_coagent_phone: '',
    essentials_rooms: 10,
    extras_latitude: 40.772495,
    families: 0,
    built: 2002,
    agents_agent_name: 'Listing Manager',
    essentials_beds: 4.5,
    agents_coagent_name: '',
    idx: 0,
    agents_coagent_image: '',
    agents_coagent_id: '',
    essentials_video: '',
    lease_term_min: 12,
    essentials_size: 0,
    extras_openhouse: 0,
    agents_coagent_email: '',
    main_image:
      'https://images.realty.mx/618441d41cce47dbcfd9bed6e5ff64e6/images/assets/245748_56272005.jpg',
    main_street: 'Broadway',
    main_id: 245748,
    lease_term_max: 12,
    essentials_bath: 4.5,
    vow: 0,
    main_apt: '28G/28H',
    extras_nofee: 0,
    available_date: 'Immediately',
    extras_featured: 0,
    financials_monthsfreereqminlease: 0,
    financials_concession: '',
    main_cross: 'W 64TH & W 65TH ST.',
    essentials_units: 0,
    extras_webtitle: '',
    agents_agent_email: 'applymedia@gmail.com',
    main_hide_address: 1,
    agents_agent_id: 1,
    access_note: '212-769-1930',
    main_status: 'For Rent',
    essentials_type: 'Apartment',
    main_category: 0,
    agents_agent_phone: '646.723.2345',
    main_neighborhood: 'Upper West Side',
    main_address: 'W 64TH & W 65TH ST. Upper West Side',
    main_house: '1930',
    essentials_pets: 'Pets OK',
    city: 'New York',
    financials_price: 36900,
    extras_longitude: -73.98187,
    financials_taxes: 0,
    date_update: 'June, 12 2023 14:12:00',
    mls_no: '',
    agents_agent_image: '',
  });
  return (
    <>
      <div className="bg-white p-6 flex items-center properties-container">
        <Image src={oneLineLogo} alt="" className="h-[20px] w-full" />
      </div>
      <div className="flex h-[500px]">
        <div className="w-1/2 h-full pr-3 left-image">
          <Image
            src={pictures[0]}
            // style={{ backgroundImage: `url("${pictures[0]}")` }}
            className="next-image h-full w-full bg-cover bg-no-repeat"
          />
        </div>
        <div className="w-1/2 grid grid-cols-2 grid-rows-2 gap-3">
          {pictures.slice(1).map((picture, index) => (
            <Image
              key={index}
              src={picture}
              // style={{ backgroundImage: `url("${picture}")` }}
              className="h-full bg-cover bg-no-repeat"
            />
          ))}
        </div>
      </div>
      <div className="properties-container">
        <div className="flex justify-between border-gray2 border-b">
          <div className="py-5">
            <div className="flex">
              <div className="text-[#111827] font-semibold mr-2 text-2xl">
                {data.essentials_type} {data.main_status} in{' '}
                {data.main_neighborhood}
              </div>
              <div className="flex items-center justify-center border border-[#0891B2] bg-[#ECFEFF] rounded-full text-[#155E75] px-2 py-1 text-xs font-medium">
                {data.main_status}
              </div>
            </div>
            <div className="flex items-center mt-3">
              <Image src={location} alt="" />
              <div className="ml-3 text-[#1F2937] text-base">
                {data.main_address}
              </div>
            </div>
          </div>
          <div>
            <div className="clip-path min-w-[205px] bg-[#EFF7FA] h-full px-4 flex items-center justify-end text-gray7 font-semibold text-xl">
              $1200
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
