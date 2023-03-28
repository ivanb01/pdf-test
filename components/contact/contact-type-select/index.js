import Button from 'components/shared/button';

const ContactTypeSelect = ({ type, setSelectedType, selectedType }) => {
  return (
    <>
      <div className="flex items-center mb-2">
        {type.icon}
        <div className="text-lightBlue3 text-xs uppercase">{type.name}</div>
      </div>
      <div className="min-h-[40px] font-normal text-xs text-gray4 border-b pb-2 mb-3 border-gray2">
        {type.description}
      </div>
      <div className="contact-type">
        {type.types.map((contactType) => {
          return (
            <Button
              className="block min-w-[100px] mb-2"
              ternary
              key={contactType.id}
              onClick={() => setSelectedType(contactType.id)}
              label={contactType.name}
              active={selectedType == contactType.id}
            />
          );
        })}
      </div>
    </>
  );
};

export default ContactTypeSelect;
