import { useState, useEffect } from 'react';

const useIsScrolledToBottom = () => {
  const [isScrolledToBottom, setScrolledToBottom] = useState(false);

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const bottom = Math.abs(scrollHeight - scrollTop - clientHeight) <= 1;
    setScrolledToBottom(bottom);
  };

  return [isScrolledToBottom, handleScroll];
};

export default useIsScrolledToBottom;
