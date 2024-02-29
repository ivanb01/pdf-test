import { useEffect, useState } from 'react';

//reredner argument is optional, used if container height is calculated later on such as in FormBuilder container
const useDetectOverflow = () => {
  const [parentHeight, setParentHeight] = useState(null);
  const [childHeight, setChildHeight] = useState(null);

  const [parentNode, setParentNode] = useState(null);
  const [childNode, setChildNode] = useState(null);

  const parentRefCallback = (node) => {
    if (node) {
      setParentHeight(node.getBoundingClientRect().height);
      setParentNode(node);
    }
  };

  const childRefCallback = (node) => {
    if (node) {
      setChildHeight(node.getBoundingClientRect().height);
      setChildNode(node);
    }
  };

  useEffect(() => {
    if (parentNode && childNode) {
      if (!parentNode.contains(childNode)) {
        // eslint-disable-next-line no-console
        console.warn(
          'useDetectOverflow: hook returned callbacks that are not assigned to DOM elements correctly. Element with assigned child ref is not child of element with assigned parent ref. This will lead to unexpected behaviour',
        );
      }
    }
  }, [parentNode, childNode]);
  return [childHeight > parentHeight, parentRefCallback, childRefCallback];
};

export default useDetectOverflow;
