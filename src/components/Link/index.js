const Link = ({ label, href, onClick, className, children, underline, iconAfter }) => {
  return (
    <div>
    <a
      href={href}
      onClick={onClick}
      className={` ${
        underline ? 'underline' : ''
      } font-medium text-lightBlue3 hover:text-lightBlue4 ${className}`}
    >
      {children}
    </a>
    {iconAfter && iconAfter}
    </div>
  );
};

export default Link;
