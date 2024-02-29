import * as React from 'react';
import { Suspense, useRef } from 'react';
import PropTypes from 'prop-types';
import mockSignature from '/public/images/signature.png';

const imageCache = new Set();

function useSuspenseImage(src) {
  if (!imageCache.has(src)) {
    throw new Promise((resolve) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        imageCache.add(src);
        resolve(null);
      };
    });
  }
}

const LazyImage = ({ altText, className, imageRef, src, width, height, maxWidth }) => {
  useSuspenseImage(src);
  return (
    <img
      className={className || undefined}
      src={src || mockSignature.src}
      alt={altText}
      ref={imageRef}
      style={{
        height,
        maxWidth,
        width,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
      }}
    />
  );
};

const SignatureComponent = ({ src, altText, width, height, maxWidth }) => {
  const imageRef = useRef(null);

  return (
    <Suspense fallback={null}>
      <LazyImage
        className=""
        src={src}
        altText={altText}
        imageRef={imageRef}
        width={width}
        height={height}
        maxWidth={maxWidth}
      />
    </Suspense>
  );
};
export default SignatureComponent;

LazyImage.propTypes = {
  altText: PropTypes.string,
  className: PropTypes.string,
  imageRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({ current: PropTypes.any })]),
  src: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  maxWidth: PropTypes.number,
};
SignatureComponent.propTypes = {
  altText: PropTypes.string,
  src: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  maxWidth: PropTypes.number,
};
