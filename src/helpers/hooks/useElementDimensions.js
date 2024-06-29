import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

const isServer = typeof window === 'undefined';

const isSupported = !isServer && 'ResizeObserver' in window;

const noop = () => {};

const noopObserver = { observe: noop, unobserve: noop };

const resizeObserver = !isSupported
  ? noopObserver
  : new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { target } = entry;

        const boundingClient = target.getBoundingClientRect();
        boundingClient.scrollHeight = target.scrollHeight;
        boundingClient.scrollWidth = target.scrollWidth;

        const set = target.$$useElementDimensionsSet;

        if (set) {
          set(boundingClient);
        }
      }
    });

const useIsomorphicLayoutEffect = isServer ? useEffect : useLayoutEffect;

class Rect {
  bottom;
  height;
  left;
  right;
  top;
  width;
  x;
  y;
  scrollWidth;
  scrollHeigth;

  constructor() {
    this.bottom = 0;
    this.height = 0;
    this.left = 0;
    this.right = 0;
    this.top = 0;
    this.width = 0;
    this.x = 0;
    this.y = 0;
    this.scrollWidth = 0;
    this.scrollHeight = 0;
  }

  toJSON() {
    return JSON.stringify(this);
  }
}

const contentRect = new Rect();
const domRect = new Rect();
const size = { inlineSize: 0, blockSize: 0 };
const defaultValue = Object.assign(domRect, {
  contentBoxSize: size,
  borderBoxSize: size,
  contentRect,
  target: null,
});

const useDimensions = () => {
  const ref = useRef(null);

  const [dimensions, set] = useState(defaultValue);

  const setRef = useCallback((element) => {
    if (ref.current) {
      resizeObserver.unobserve(ref.current);
    }
    if (element instanceof Element) {
      element.$$useElementDimensionsSet = set;
      resizeObserver.observe(element);
    }
  }, []);

  useIsomorphicLayoutEffect(
    () => () => {
      if (ref.current) {
        resizeObserver.unobserve(ref.current);
      }
    },
    [],
  );

  return [dimensions, setRef];
};

export default useDimensions;
