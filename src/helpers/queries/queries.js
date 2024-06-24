import { useQuery } from '@tanstack/react-query';
import { getAwsFileBlob } from '@api/files';
import { fetchUsers } from '@api/user';

export const useFetchDocumentBlob = (url, options) => {
  return useQuery({
    queryKey: [`aws-file-blob-${url}`],
    queryFn: () => getAwsFileBlob(url),
    refetchOnWindowFocus: false,
    enabled: false,
    ...options,
  });
};

export const useFetchUsers = (params, options) => {
  return useQuery({
    queryKey: ['users', params],
    queryFn: () => fetchUsers({ params }),
    select: ({ data }) => data,
    ...options,
  });
};
