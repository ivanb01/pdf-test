const PropertyOtherDetails = ({ data }) => {
  const otherDetails = [
    {
      id: 0,
      name: 'Common Charges',
      value: data.COMMON_CHARGES
        ? `$${data.COMMON_CHARGES.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
        : data.COMMON_CHARGES,
    },
    {
      id: 1,
      name: 'Maintenance',
      value: data.MAINTENANCE
        ? `$${data.MAINTENANCE.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
        : data.MAINTENANCE,
    },
    {
      id: 2,
      name: 'Taxes',
      value: data.TAXES ? `$${data.TAXES.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}` : data.TAXES,
    },
    {
      id: 3,
      name: 'Deductible',
      value: data.DEDUCTIBLE,
    },
    {
      id: 4,
      name: 'Down Payment',
      value: data.DOWN_PAYMENT === '0%' ? undefined : data.DOWN_PAYMENT,
    },
    {
      id: 5,
      name: 'Available date',
      value: data.DATE_AVAILABLE,
    },
    {
      id: 6,
      name: 'Property type',
      value: data.PROPERTY_TYPE,
    },
    {
      id: 7,
      name: 'Approx SF',
      value: data?.SQUARE_FOOTAGE?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
    },
    {
      id: 8,
      name: 'Stories',
      value: data?.STORIES,
    },
    {
      id: 9,
      name: 'Unit Number',
      value: data.UNIT_NUMBER,
    },
    // {
    //   id: 10,
    //   name: 'Tour',
    //   value: data.VTOUR ?? data.VTOUR2,
    // },
  ];

  const getOtherDetails = () => {
    if (data?.STATUS?.toLowerCase().includes('sale')) {
      otherDetails.push(
        {
          id: 11,
          name: 'Closing Date',
          value: data.CLOSING_DATE,
        },
        {
          id: 12,
          name: 'Closing price',
          value: data.CLOSING_PRICE,
        },
      );
    }
    return otherDetails;
  };
  const checkAllItems = (details) => {
    return details?.every(
      (detail) =>
        detail.value === undefined ||
        detail.value === 0 ||
        detail.value.length === 0 ||
        (typeof detail.value === 'string' && detail?.value.slice(-1) === '%' && detail.value.slice(0, -1) === '0'),
    );
  };
  return (
    data &&
    !checkAllItems(getOtherDetails()) && (
      <div className="mt-[50px] mb-[50px]">
        <div className="text-gray7 text-xl mb-6 font-medium">Other Details</div>
        <div className="flex flex-wrap">
          {getOtherDetails().map((detail, index) => {
            if (
              detail.value !== undefined &&
              detail.value !== '' &&
              detail.value != 0 &&
              !(
                typeof detail.value === 'string' &&
                detail?.value.slice(-1) === '%' &&
                detail.value.slice(0, -1) === '0'
              )
            ) {
              return (
                <div className="md:w-1/4 sm:w-1/3 w-1/2 mb-4" key={index}>
                  <div className="text-gray4 text-sm">{detail.name}</div>
                  <div className="text-sm text-gray7 mt-1">{detail.value}</div>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    )
  );
};

export default PropertyOtherDetails;
