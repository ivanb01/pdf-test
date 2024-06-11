import moment from 'moment';

export const SubmittedCell = ({ info }) => {
  const createdAt = info.getValue();
  var date = moment(createdAt).format('MMM DD,YYYY');
  var time = moment(createdAt).format('HH:mm');

  return (
    <div className="flex flex-col items-center min-w-[150px] px-6  ">
      <p>{date}</p>
      <p className="font-normal text-gray4">{time}</p>
    </div>
  );
};
