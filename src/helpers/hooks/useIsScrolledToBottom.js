import { useState } from 'react';

const useIsScrolledToBottom = () => {
  const [isScrolledToBottom, setScrolledToBottom] = useState(false);

  const handleScroll = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      setScrolledToBottom(true);
    } else setScrolledToBottom(false);
  };
  return [isScrolledToBottom, handleScroll];
};
export default useIsScrolledToBottom;
