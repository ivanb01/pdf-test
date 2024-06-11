import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useEffect, useMemo } from 'react';
import useIsScrolledToBottom from '@helpers/hooks/useIsScrolledToBottom';
import CircularProgress from '@mui/material/CircularProgress';
import { useRouter } from 'next/router';
import { useFetchPropertyApplicationsPaginated } from '../queries/queries';
import COLUMNS from './Columns';

const ApplicationsTable = ({ searchInput, currentButton }) => {
  const router = useRouter();
  const [isScrolledToBottom, handleScroll] = useIsScrolledToBottom();
  const fetchApplicationsParams = useMemo(() => {
    let email_status;
    switch (currentButton) {
      case 1:
        email_status = 'UNSENT';
        break;
      case 2:
        email_status = 'SENT';
        break;
      default:
        email_status = null;
    }

    return {
      page_size: 10,
      count_items: true,
      search_param: searchInput,
      sort: 'created_at,desc',
      email_status: email_status,
    };
  }, [searchInput, currentButton]);

  const {
    data: applicationsData,
    isError: isApplicationsErrors,
    isLoading: applicationsIsLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useFetchPropertyApplicationsPaginated(fetchApplicationsParams);

  useEffect(() => {
    if (isScrolledToBottom && hasNextPage) {
      fetchNextPage();
    }
  }, [isScrolledToBottom, hasNextPage, fetchNextPage]);

  const applications = useMemo(() => {
    if (applicationsData)
      return applicationsData?.pages
        .map((page) => {
          return page?.data?.data?.map((singlePage) => singlePage);
        })
        .flat();
    else return [];
  }, [applicationsData]);

  const table = useReactTable({
    data: applications ?? [],
    columns: COLUMNS,
    getCoreRowModel: getCoreRowModel(),
  });

  if (applicationsIsLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <CircularProgress size={50} />
      </div>
    );
  }

  if (isApplicationsErrors) {
    return (
      <div className="w-full h-full flex justify-center items-center text-center">
        <p>Something went wrong while trying to fetch applications...</p>
      </div>
    );
  }

  return (
    <div className="w-full h-[calc(100%-84px)] overflow-scroll" onScroll={handleScroll}>
      {table && (
        <>
          {
            <table className="w-full relative">
              <thead className="bg-gray10 w-full h-[60px] sticky z-40">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="sticky top-0  bg-gray10 text-left justify-start leading-4 text-xs text-gray4 font-medium tracking-[0.6px] uppercase ">
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="leading-5 text-sm font-medium">
                {table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b hover:bg-gray10 cursor-pointer"
                    onClick={(e) => {
                      router.push(`/applications/${row.original.public_identifier}`);
                    }}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td key={cell.id} className="py-4">
                          {flexRender(cell.column.columnDef.cell, {
                            info: cell.getContext(),
                            fetchApplicationsParams,
                          })}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          }
        </>
      )}

      {hasNextPage && (
        <div className="h-[80px] flex items-center justify-center">
          {isFetchingNextPage && <CircularProgress size={20} />}
        </div>
      )}
    </div>
  );
};

export default ApplicationsTable;
