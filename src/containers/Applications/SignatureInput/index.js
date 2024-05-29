import React, { useRef, useState } from 'react';
import SignaturePad from 'react-signature-canvas';
import DeleteIcon from '@mui/icons-material/Delete';
import { useFormikContext, getIn } from 'formik';
import { dataURLtoFile } from '@global/functions';
import CircularProgress from '@mui/material/CircularProgress';
import usePostFileAws from '@helpers/hooks/usePostFileAws';
import Button from '@components/shared/button';
import NotificationAlert from '@components/shared/alert/notification-alert';

const SigantureInput = ({ name }) => {
  const sigCanvas = useRef({});
  const formik = useFormikContext();
  const [currentSignature, setCurrentSignature] = useState(null);

  const onUploadSuccess = (data) => {
    formik.setFieldValue(name, data);
  };

  const { uploadToS3, totalLoading } = usePostFileAws({
    onUploadSuccess,
    name: 'Signature',
  });

  const setSignature = () => {
    const signature = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
    const file = dataURLtoFile(signature, 'signature.png');
    setCurrentSignature(file);
  };

  const onDoneSignature = () => {
    uploadToS3(currentSignature);
  };

  const clear = () => {
    setCurrentSignature(null);
    sigCanvas.current.clear();
    formik.setFieldValue(name, null);
  };

  return (
    <div>
      <div className="relative w-full  border-[1px] rounded shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
        <SignaturePad
          ref={(node) => (sigCanvas.current = node)}
          canvasProps={{
            className: 'w-full ',
          }}
          onEnd={setSignature}
        />
        <div className="absolute right-[12px] h-full py-[12px] top-0 ">
          {formik.values.signature ? (
            <button onClick={clear} className="flex items-center">
              <DeleteIcon className="h-4 w-4 text-overlayBackground" />
              <span className="text-[10px] leading-3 text-gray7">remove</span>
            </button>
          ) : (
            <div className="flex flex-col gap-1 justify-between  h-full">
              <button onClick={clear} className="flex items-center">
                <DeleteIcon className="h-4 w-4 text-overlayBackground" />
                <span className="text-[10px] leading-3 text-gray7">remove</span>
              </button>
              <Button
                disabled={
                  sigCanvas && sigCanvas.current && Object.keys(sigCanvas.current).length
                    ? sigCanvas.current.isEmpty()
                    : true
                }
                className={'text-xs h-[20px] min-w-[50px]'}
                onClick={onDoneSignature}>
                Done
              </Button>
            </div>
          )}
        </div>
        {totalLoading && (
          <div className="absolute inset-0 bg-slate-50 opacity-50 flex justify-center items-center">
            <CircularProgress size={20} />
          </div>
        )}
      </div>
      {getIn(formik.errors, name) && getIn(formik.touched, name) && (
        <NotificationAlert className="mt-2 p-2" type={'error'}>
          {formik.errors[name]}
        </NotificationAlert>
      )}
    </div>
  );
};

export default SigantureInput;
