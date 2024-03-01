const Divider = ({ fill, props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={2} height={15} fill="none" {...props}>
    <path stroke={fill || '#0EA5E9'} strokeDasharray="2 2" strokeWidth={1.5} d="M.75 0v15" />
  </svg>
);
export default Divider;
