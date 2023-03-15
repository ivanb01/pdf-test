const Link = ({ label, href, onClick, className, children, underline }) => {
  return (
    <a
      href={href}
      onClick={onClick}
      className={` ${
        underline ? 'underline' : ''
      } font-medium text-lightBlue3 hover:text-lightBlue4 ${className}`}
    >
      {children}
    </a>
  );
};

export default Link;
