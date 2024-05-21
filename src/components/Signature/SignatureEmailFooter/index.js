import PropTypes from 'prop-types';
const SignatureEmailFooter = ({ userInfo, companyName, imageUrl }) => {
  return (
    <div className={'flex flex-col gap-[4px] text-gray8 text-sm font-normal'}>
      {(userInfo?.first_name != undefined || userInfo?.first_name.length != 0) &&
        (userInfo?.last_name != undefined || userInfo?.last_name.length != 0) && (
          <div className={'flex gap-3 items-center'}>
            <div>{userInfo?.first_name + ' ' + userInfo?.last_name}</div>
          </div>
        )}
      {companyName && <p>{companyName}</p>}
      {(userInfo?.phone_number != undefined || userInfo?.phone_number.length) != 0 && (
        <div>{userInfo?.phone_number}</div>
      )}
      {userInfo?.email && <p>{userInfo?.email}</p>}
      {imageUrl && (
        <div className={'mt-3'}>
          <img src={`${imageUrl}`} alt={''} width={120} />
        </div>
      )}
    </div>
  );
};

SignatureEmailFooter.PropTypes = {
  userInfo: PropTypes.shape({
    first_name: PropTypes.number.isRequired,
    last_name: PropTypes.string.isRequired,
    phone_number: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }),
  imageUrl: PropTypes.string,
  companyName: PropTypes.string.isRequired,
};

export default SignatureEmailFooter;
