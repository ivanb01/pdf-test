const Grid = ({ gridColumns, gridGap, children }) => {
  return <div className={`grid col-${gridColumns} gap-${gridGap}`}>{children}</div>;
};

export default Grid;
