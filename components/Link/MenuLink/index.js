import Text from 'components/shared/text';

const MenuLink = ({ children, className, onClick }) => {
  return (
    <li
      className={`custom-menu-item cursor-pointer py-2 px-3 hover:bg-menuHover active:bg-menuHover rounded-md ${className}`}
      onClick={onClick}
    >
      <Text h4 href="#" className="text-white">
        {children}
      </Text>
    </li>
  );
};

export default MenuLink;
