import PropTypes from 'prop-types';
const Signature = ({ userInfo, companyName, imageUrl }) => {
  const ErrorState = ({ message }) => {
    return (
      <p className={'rounded-md px-3 py-1 bg-red1 min-w text-sm leading-5 font-medium text-[#991B1B]'}>{message}</p>
    );
  };

  return (
    <div className={'flex flex-col gap-[4px] text-gray8 text-sm font-normal'}>
      <div className={'flex gap-3 items-center'}>
        <div>
          {userInfo?.first_name === undefined || userInfo?.first_name.length === 0 ? (
            <ErrorState message={'First name is missing'} />
          ) : (
            userInfo?.first_name
          )}
          {userInfo?.last_name === undefined || userInfo?.last_name.length === 0 ? (
            <ErrorState message={'Last name is missing'} />
          ) : (
            ` ` + userInfo?.last_name
          )}
        </div>
      </div>
      <p>{companyName}</p>
      <div>
        {userInfo?.phone_number === undefined || userInfo?.phone_number.length === 0 ? (
          <ErrorState message={'Phone Number is missing'} />
        ) : (
          userInfo?.phone_number
        )}
      </div>
      {!userInfo?.email ? <ErrorState message={'Email is missing'} /> : <p>{userInfo?.email}</p>}
      {imageUrl && (
        <div className={'mt-3'}>
          <img src={`${imageUrl}`} alt={''} height={20} width={120} />
        </div>
      )}
    </div>
  );
};

Signature.PropTypes = {
  userInfo: PropTypes.shape({
    first_name: PropTypes.number.isRequired,
    last_name: PropTypes.string.isRequired,
    phone_number: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }),
  imageUrl: PropTypes.string,
  companyName: PropTypes.string.isRequired,
};

export default Signature;
