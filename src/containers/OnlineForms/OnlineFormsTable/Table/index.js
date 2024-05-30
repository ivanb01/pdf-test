import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import * as React from 'react';
import { DefaultCell, ClientCell, DateCell, ActionsCell, HeaderCell, StatusCell } from '../TableCells';
import PropTypes from 'prop-types';
import NoFormsSent from '/public/icons/no-forms-sent.svg';
import { downloadPdf } from 'containers/OnlineForms/Pdf/generatePdf';
import Image from 'next/image';
import { useFetchOnlineFormsTypes } from 'containers/OnlineForms/queries/queries';

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor('form_type', {
    header: () => <HeaderCell title="FORM TYPE" />,
    cell: ({ info }) => <DefaultCell label={info.getValue()?.name} />,
    minSize: 258,
  }),
  columnHelper.accessor('client_email', {
    header: () => <HeaderCell title="CLIENT" />,

    cell: ({ info }) => {
      const firstName = info?.row?.original?.client_first_name;
      const lastName = info?.row?.original?.client_last_name;
      const fullName = (firstName ?? '') + ' ' + (lastName ?? '');
      return (
        <ClientCell
          imgSrc="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
          name={fullName}
          email={info.getValue()}
        />
      );
    },
    minSize: 280,
  }),
  columnHelper.accessor('status', {
    header: () => <HeaderCell title="STATUS" />,
    cell: ({ info }) => {
      return <StatusCell {...info.row.original} />;
    },
    minSize: 150,
  }),
  columnHelper.accessor('sent_by_email_at', {
    header: () => <HeaderCell title="SENT ON" />,
    cell: ({ info }) => {
      const createdAt = info.row.original.created_at;
      const sentAt = info.getValue();

      return <DateCell date={sentAt || createdAt} />;
    },
    minSize: 200,
  }),
  columnHelper.accessor('actions', {
    header: () => <HeaderCell title="ACTIONS" />,
    cell: ({ info, onDeleteForm }) => {
      const formTypeId = info.row.original.form_type.id.hex;
      const { data, isSuccess } = useFetchOnlineFormsTypes();

      const onDownloadPdf = async () => {
        if (isSuccess && formTypeId) {
          const typeData = data?.data?.find((type) => type.id.hex === formTypeId);
          downloadPdf(typeData.content, false, info.row.original.submitted_answers, typeData.name);
        }
      };

      return (
        <ActionsCell
          onDownloadPdf={onDownloadPdf}
          onDeleteForm={() => {
            onDeleteForm(info.row.original.id.hex);
          }}
        />
      );
    },
    minSize: 150,
  }),
];

const OnlineFormsTable = ({ onlineForms, onDeleteForm }) => {
  const table = useReactTable({
    data: onlineForms,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      {onlineForms && (
        <table className="w-full" style={{ tableLayout: 'fixed' }}>
          <thead className="h-[60px] bg-gray-50">
            {table?.getHeaderGroups().map((headerGroup) => {
              return (
                <tr
                  key={headerGroup.id}
                  className="w-fit [&>*]:px-[16px] [&>*]:py-[12px] [&>*:first-child]:px-[24px]  border-y-[1px] border-gray-200">
                  {headerGroup.headers.map((header) => {
                    return (
                      <th
                        key={header.id}
                        className="[&>*]:w-fit  text-xs leading-4 font-medium text-gray-500"
                        style={{
                          width: header.column.getSize(),
                        }}>
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </th>
                    );
                  })}
                </tr>
              );
            })}
          </thead>
          <tbody>
            {table?.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="h-[70px] text-sm  border-b-[1px] border-gray-200 [&>*]:p-[16px] [&>*:first-child]:px-[24px]">
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td
                      key={cell.id}
                      className="[&>*]:w-max"
                      style={{
                        width: cell.column.getSize(),
                      }}>
                      {flexRender(cell.column.columnDef.cell, {
                        info: cell.getContext(),
                        onDeleteForm,
                      })}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {!onlineForms.length && (
        <div className="w-full  h-[calc(100%-61px)] flex flex-col items-center justify-center text-center leading-5 text-sm gap-6">
          <Image src={NoFormsSent} width={64} height={64} alt="no-forms" />
          <div className="space-y-2">
            <p className="font-medium text-gray7">No Forms Found</p>
            <p className="text-gray4">We couldn't find anything matching your search criteria...</p>
          </div>
        </div>
      )}
    </>
  );
};

export default OnlineFormsTable;
