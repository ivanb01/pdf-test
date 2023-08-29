const Badge = ({ label, className, ...props }) => {
  return (
    <div className={`uppercase inline-flex items-center px-[6px] py-1 rounded text-[10px] font-medium ${className}`}>
      {label}
    </div>
  );
};

export default Badge;
