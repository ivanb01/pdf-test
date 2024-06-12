import { createColumnHelper } from '@tanstack/react-table';
import * as TableCells from '../Cells';
import * as TableHeaders from '../Headers';

const columnHelper = createColumnHelper();

const COLUMNS = [
  columnHelper.accessor('client_first_name', {
    id: 'clientInfo',
    header: <TableHeaders.ClientHeader />,
    cell: ({ info }) => <TableCells.ClientCell info={info} />,
  }),
  columnHelper.accessor('occupants', {
    header: <TableHeaders.OccupantsHeader />,
    cell: ({ info }) => <TableCells.OccupantsCell info={info} />,
  }),

  columnHelper.accessor('property_address', {
    header: <TableHeaders.AddressHeader />,
    cell: ({ info }) => <TableCells.AddressCell info={info} />,
  }),
  columnHelper.accessor('created_at', {
    header: <TableHeaders.SubmittedHeader />,
    cell: ({ info }) => <TableCells.SubmittedCell info={info} />,
  }),
  columnHelper.accessor('documents', {
    header: <TableHeaders.FilesHeader />,
    cell: ({ info }) => {
      return <TableCells.FilesCell info={info} />;
    },
  }),

  columnHelper.accessor('emergency_contact_phone_number', {
    header: <TableHeaders.ApplicationFilledHeader />,
    cell: ({ info }) => <TableCells.ApplicationFilledCell info={info} />,
  }),
  columnHelper.accessor('credit_check_payment_successfull', {
    header: <TableHeaders.CreditCheckHeader />,
    cell: (props) => (
      <TableCells.CreditCheckCell info={props.info} fetchApplicationsParams={props.fetchApplicationsParams} />
    ),
  }),

  columnHelper.accessor('recipients', {
    header: <TableHeaders.RecipientsHeader />,
    cell: ({ info }) => <TableCells.RecipientsCell info={info} />,
  }),

  // columnHelperAccesor for the whole row data
  columnHelper.accessor('sentOn', {
    header: <TableHeaders.SentOnHeader />,
    cell: ({ info }) => <TableCells.SentOnCell info={info} />,
  }),

  columnHelper.accessor('files', {
    header: <TableHeaders.PdfHeader />,
    cell: ({ info }) => <TableCells.PdfCell info={info} />,
  }),
];

export default COLUMNS;
