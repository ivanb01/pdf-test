import React, {
  useState,
  createContext,
  useContext,
  Children,
  cloneElement,
  useEffect,
  useMemo,
  isValidElement,
} from 'react';
import usePostFileAws from '@helpers/hooks/usePostFileAws.js';
import { getIn, useFormikContext } from 'formik';
import { getChildDeep } from 'react-nanny';

const FileInputContext = createContext();

const FileInput = ({ children, ...rest }) => {
  const {
    name,
    title,
    handleUploading,
    onLargeFile = () => {},
    onSuccess = () => {},
    onRemoveFile,
    onWrongFileFormat = () => {},
    acceptedFormats = ['image/jpeg', 'image/png', 'application/pdf'],
    ...restProps
  } = rest;
  const formik = useFormikContext();
  const [uploadPhase, setUploadPhase] = useState('upload');
  const [elementPresentInForm, setElementPresentInForm] = useState(() => getIn(formik?.values, name));

  useEffect(() => {
    if (name && formik) setElementPresentInForm(getIn(formik?.values, name));
  }, [formik.values, name]);

  const onAbort = () => {
    formik.setFieldValue(name, null);
    setUploadPhase('upload');
  };

  const onUploadSuccess = (data) => {
    formik.setFieldValue(name, data);
    onSuccess(name, data);
  };

  const onRemove = () => {
    if (elementPresentInForm) setElementPresentInForm(null);
    if (!onRemoveFile) {
      formik.setFieldValue(name, null);
    } else onRemoveFile(name, null);
  };

  const postFileData = usePostFileAws({
    name: title,
    onUploadSuccess,
    onLargeFile,
    onAbort,
    onRemove,
    initialFile: elementPresentInForm,
  });

  const { totalLoading, totalError, uploadToS3, presigendUrlMutationData, postFileMutationData, remove, download } =
    postFileData;

  useEffect(() => {
    if (elementPresentInForm) {
      setUploadPhase('uploaded');
    } else if (!getIn(formik.values, name) && !totalLoading && !totalError) {
      setUploadPhase('upload');
    } else if (totalLoading) setUploadPhase('uploading');
    else if (!!getIn(formik.values, name)) setUploadPhase('uploaded');
    else if (!getIn(formik.values, name) && totalError) setUploadPhase('error');
  }, [postFileData]);

  const handleFileFormat = (file) => {
    if (!file.type || !acceptedFormats.includes(file.type)) {
      onWrongFileFormat();
      return false;
    }
    return true;
  };

  const upload = (file) => {
    if (handleFileFormat(file)) uploadToS3(file);
  };

  const onDrop = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const { files } = e.dataTransfer;
    upload(files[0]);
  };
  const onDragOver = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const handleFileInput = (e) => {
    const { files } = e.target;
    const file = files[0];

    if (handleFileFormat(file)) upload(files[0]);
  };

  const childComponentsPresent = useMemo(() => {
    return {
      upload: isValidElement(
        getChildDeep(
          children,
          (child) => typeof child.type === 'function' && child.type.name !== undefined && child.type.name === 'Upload',
        ),
      ),
      uploaded: isValidElement(
        getChildDeep(
          children,
          (child) =>
            typeof child.type === 'function' && child.type.name !== undefined && child.type.name === 'Uploaded',
        ),
      ),
      uploading: isValidElement(
        getChildDeep(
          children,
          (child) =>
            typeof child.type === 'function' && child.type.name !== undefined && child.type.name === 'Uploading',
        ),
      ),
      error: isValidElement(
        getChildDeep(
          children,
          (child) => typeof child.type === 'function' && child.type.name !== undefined && child.type.name === 'Error',
        ),
      ),
    };
  }, []);

  useEffect(() => {
    if (
      handleUploading &&
      (!childComponentsPresent.uploading ||
        !childComponentsPresent.uploaded ||
        !childComponentsPresent.upload ||
        !childComponentsPresent.error)
    )
      console.warn(
        'File Input Component: Automatic handle of uploading components is not possible without Upload, Uploading, Uploaded and Error component. Passing handleUploading prop will have no effect in this case!',
      );
  }, []);

  return (
    <FileInputContext.Provider
      value={{
        handleUploading,
        handleFileInput,
        postFileData,
        name,
        title,
        childComponentsPresent,
        uploadPhase,
        remove,
        elementPresentInForm,
        download,
      }}>
      <div {...restProps} onDrop={onDrop} onDragOver={onDragOver}>
        {Children.map(children, (child) => cloneElement(child, {}))}
      </div>
    </FileInputContext.Provider>
  );
};

const Container = ({ children, ...rest }) => {
  const context = useContext(FileInputContext);

  const renderedChildren = typeof children === 'function' ? children(context) : children;

  return <div {...rest}>{renderedChildren}</div>;
};

const Input = ({ children }) => {
  const { name, handleFileInput } = useContext(FileInputContext);

  return (
    <div className="inline">
      <label htmlFor={name} className=" cursor-pointer">
        {children}
      </label>
      <input
        id={name}
        name={name}
        type="file"
        onChange={handleFileInput}
        className="hidden"
        accept="image/png, image/jpg, application/pdf"
      />
    </div>
  );
};

const Upload = ({ children, ...rest }) => {
  const { handleUploading, uploadPhase } = useContext(FileInputContext);

  const renderedChildren = typeof children === 'function' ? children(useContext(FileInputContext)) : children;

  if (handleUploading) {
    if (uploadPhase === 'upload') return <div {...rest}>{renderedChildren}</div>;
    else return <></>;
  }

  return <div {...rest}>{renderedChildren}</div>;
};
const Uploading = ({ children, ...rest }) => {
  const { handleUploading, uploadPhase } = useContext(FileInputContext);

  const renderedChildren =
    typeof children === 'function'
      ? children(useContext(FileInputContext))
      : Children.map(children, (child) => {
          return cloneElement(child, {});
        });

  if (handleUploading) {
    if (uploadPhase === 'uploading') {
      return <div {...rest}>{renderedChildren}</div>;
    } else return <></>;
  }

  return <div {...rest}>{renderedChildren}</div>;
};
const Uploaded = ({ children, ...rest }) => {
  const { handleUploading, uploadPhase } = useContext(FileInputContext);

  const renderedChildren =
    typeof children === 'function'
      ? children(useContext(FileInputContext))
      : Children.map(children, (child) => {
          return cloneElement(child, {});
        });

  if (handleUploading) {
    if (uploadPhase === 'uploaded') {
      return <div {...rest}>{renderedChildren}</div>;
    } else return <></>;
  }

  return <div {...rest}>{renderedChildren}</div>;
};
const Error = ({ children, ...rest }) => {
  const { handleUploading, uploadPhase } = useContext(FileInputContext);

  const renderedChildren =
    typeof children === 'function'
      ? children(useContext(FileInputContext))
      : Children.map(children, (child) => {
          return cloneElement(child, {});
        });

  if (handleUploading) {
    if (uploadPhase === 'error') {
      return <div {...rest}>{renderedChildren}</div>;
    } else return <></>;
  }

  return <div {...rest}>{renderedChildren}</div>;
};

const AbortButton = ({ children }) => {
  const { postFileData } = useContext(FileInputContext);
  const { abort } = postFileData;
  return (
    <button onClick={abort} type="button">
      {children}
    </button>
  );
};

const RetryButton = ({ children }) => {
  const { postFileData } = useContext(FileInputContext);
  return (
    <div
      onMouseDown={() => {
        postFileData.presigendUrlMutationData.reset();
        postFileData.postFileMutationData.reset();
        postFileData.retry();
      }}
      className="cursor-pointer">
      {children}
    </div>
  );
};

const RemoveButton = ({ children }) => {
  const { remove } = useContext(FileInputContext);
  return (
    <div onMouseDown={remove} className="cursor-pointer">
      {children}
    </div>
  );
};
const DownloadButton = ({ children }) => {
  const { download } = useContext(FileInputContext);
  return (
    <div onMouseDown={download} className="cursor-pointer">
      {children}
    </div>
  );
};

FileInput.Container = Container;
FileInput.Input = Input;
FileInput.AbortButton = AbortButton;
FileInput.RetryButton = RetryButton;
FileInput.Upload = Upload;
FileInput.Uploading = Uploading;
FileInput.Uploaded = Uploaded;
FileInput.RemoveButton = RemoveButton;
FileInput.Error = Error;
FileInput.DownloadButton = DownloadButton;

export default FileInput;
