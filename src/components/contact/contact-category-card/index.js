import Text from 'components/shared/text';

const ContactCategoryCard = ({ title, description, icon, className, setSelectedCard, id, name, selectedCard }) => {
  return (
    <div
      className={`${
        selectedCard == id ? 'border-lightBlue3 bg-lightBlue1' : 'border-gray2'
      } cursor-pointer rounded-lg border hover:bg-lightBlue1 hover:border-lightBlue3 px-12 py-6 w-[380px] mb-6 flex items-center justify-center flex-col text-center ${className}`}
      onClick={() => setSelectedCard(id)}
    >
      {icon}
      <Text h4 className="text-gray7 mt-3 mb-2">
        {name}
      </Text>
      <Text paragraph className="text-gray4">
        {description}
      </Text>
    </div>
  );
};

export default ContactCategoryCard;
