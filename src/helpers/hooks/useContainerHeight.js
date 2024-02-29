import { useState } from 'react';

const useContainerHeight = () => {
  const [containerHeight, setContainerHeight] = useState(null);

  const containerRef = (node) => {
    if (node && node?.current) {
      setContainerHeight(node.getBoundingClientRect().height);
    }
  };

  return [containerHeight, containerRef];
};

export default useContainerHeight;
