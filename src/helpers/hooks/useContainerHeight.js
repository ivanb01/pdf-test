import { useState } from 'react';

const useContainerHeight = () => {
  const [containerHeight, setContainerHeight] = useState(0);

  const containerRef = (node) => {
    if (node) {
      setContainerHeight(node.getBoundingClientRect().height);
    }
  };

  return [containerHeight, containerRef];
};

export default useContainerHeight;
