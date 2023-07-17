import Text from '../text';

const TopBar = ({ text, onBackClick, className }) => {
  return (
    <nav className="p-6">
      <Text h2 onBackClick={onBackClick} className={`text-gray7 ${className}`}>
        {text}
      </Text>
    </nav>
  );
};

export default TopBar;
