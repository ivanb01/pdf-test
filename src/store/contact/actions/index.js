import { getContacts } from './get';
import { addContact, bulkAddContacts } from './post';
import {
  updateContact,
  bulkUpdateContactActive,
  bulkUpdateContactType,
  bulkUpdateContactStatus,
} from './update';
import { deleteContact } from './delete';

export {
  getContacts,
  addContact,
  updateContact,
  deleteContact,
  bulkUpdateContactActive,
  bulkUpdateContactType,
  bulkUpdateContactStatus,
  bulkAddContacts,
};
