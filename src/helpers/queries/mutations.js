import { useMutation } from '@tanstack/react-query';
import { useState, useCallback, useRef } from 'react';
import { postPresignedUrl, postFile } from '@api/files';
import { sendEmail } from '@api/email';

export const usePostPresignedUrl = (options) => {
  const abortControllerRef = useRef(null);

  const mutation = useMutation({
    mutationFn: async (fileName) => {
      abortControllerRef.current = new AbortController();
      return postPresignedUrl(fileName, abortControllerRef.current.signal);
    },
    ...options,
  });

  const abort = useCallback(() => {
    abortControllerRef.current?.abort();
    mutation.reset();
  }, [mutation.reset]);

  return { ...mutation, abort, abortControllerRef };
};

export const usePostFile = (options) => {
  const abortControllerRef = useRef(null);

  const [uploadProgress, setUploadProgress] = useState({
    progress: 0,
    loaded: 0,
    total: 0,
  });

  const resetProgress = () => {
    setUploadProgress({
      progress: 0,
      loaded: 0,
      total: 0,
    });
  };

  const onUploadProgress = (e) => {
    setUploadProgress({
      progress: Math.round((e.loaded * 100) / e.total),
      loaded: e.loaded,
      total: e.total,
    });
  };

  const onSettled = () => {
    resetProgress();
  };

  const mutation = useMutation({
    mutationFn: async ({ url, data, ...rest }) => {
      abortControllerRef.current = new AbortController();
      return postFile(url, data, { ...rest, onUploadProgress, signal: abortControllerRef.current.signal });
    },
    onSettled,
    ...options,
  });

  const abort = useCallback(() => {
    abortControllerRef.current?.abort();
    mutation.reset();
    resetProgress();
  }, [mutation.reset, setUploadProgress]);

  return { ...mutation, uploadProgress, abort, abortControllerRef };
};

export const useSendEmail = (options) => {
  return useMutation({
    mutationFn: (emailBody) => {
      return sendEmail(emailBody);
    },
    ...options,
  });
};
