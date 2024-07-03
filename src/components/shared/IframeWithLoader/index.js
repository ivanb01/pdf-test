import { useState } from 'react';
import Loader from 'components/shared/loader';
import Iframe from 'react-iframe';

const IframeWithLoader = ({ src }) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className={`${loading && `relative h-vsh w-vsw`} bg-white h-full w-full`}>
      {loading && <Loader />}
      <Iframe
        url={src}
        onLoad={() => setLoading(false)}
        width="100%"
        height="100%"
        id=""
        className=""
        display="block"
        position="relative"
      />
    </div>
  );
};

export default IframeWithLoader;
