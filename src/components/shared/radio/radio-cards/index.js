import call from '/public/images/call.svg';

const RadioCards = ({ className, options, selected, setSelected }) => {
  return (
    <div className={`flex ${className}`}>
      {options.map((option) => (
        <Card
          narrow
          className="mr-2 bg-white"
          title={option.title}
          icon={option.icon}
          active={option.id == selected}
          onClick={() => setSelected(option.id)}
        />
      ))}
      {/* <Card
        narrow
        className="bg-white"
        title={'SMS'}
        icon={call.src}
        active={selectedEvent.type == 1}
        onClick={() => setTypeOfEvent(1)}
      /> */}
    </div>
  );
};

export default RadioCards;
