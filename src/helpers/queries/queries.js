import { useQuery } from '@tanstack/react-query';
import { getAwsFileBlob } from '@api/files';

export const useFetchDocumentBlob = (url, options) => {
  return useQuery({
    queryKey: [`aws-file-blob-${url}`],
    queryFn: () => getAwsFileBlob(url),
    refetchOnWindowFocus: false,
    enabled: false,
    ...options,
  });
};
