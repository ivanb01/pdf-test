import axios from 'axios';
import axiosInstance from 'api/axiosInstance';

export const getCount = () => {
  return axiosInstance.get('contact/count/by_category');
};
export const getContacts = (category, searchterm) => {
  return axiosInstance.get('contacts', {
    params: { category_ids: category, search_term: searchterm },
  });
};

export const getContactsSearch = (queryParams) => {
  return axiosInstance.get('contacts/search', {
    params: queryParams,
  });
};

export const getContact = (id) => {
  return axiosInstance.get(`contact/${id}`);
};

export const addContact = (contact) => {
  return axiosInstance.post('contact', contact);
};

export const updateContact = (id, contact) => {
  return axiosInstance.put(`contact/${id}`, contact);
};

export const bulkAddContacts = (contacts) => {
  return axiosInstance.post(`contact/bulk`, contacts);
};

export const bulkUpdateContacts = (contacts) => {
  return axiosInstance.put(`contact/bulk`, contacts);
};

export const findContactByEmail = (queryParams) => {
  return axiosInstance.get(`contact/find_by`, {
    params: queryParams,
  });
};

export const getContactProfiles = (id) => {
  return axiosInstance.get(`contact/${id}/profiles`);
};

export const addContactProfile = (id, profile) => {
  return axiosInstance.post(`contact/${id}/profile`, profile);
};

export const getContactNotes = (id, queryParams) => {
  return axiosInstance.get(`contact/${id}/notes`, {
    params: queryParams,
  });
};

export const getContactNote = (id, note_id) => {
  return axiosInstance.get(`contact/${id}/note/${note_id}`);
};

export const addContactNote = (id, note) => {
  return axiosInstance.post(`contact/${id}/note`, note);
};

export const updateContactNote = (id, note_id, note) => {
  return axiosInstance.put(`contact/${id}/note/${note_id}`, note);
};

export const deleteContactNote = (id, note_id) => {
  return axiosInstance.delete(`contact/${id}/note/${note_id}`);
};

export const getContactRelationships = (id) => {
  return axiosInstance.get(`contact/${id}/relationships`);
};

export const getContactRelationship = (id, relationship_id) => {
  return axiosInstance.get(`contact/${id}/relationship/${relationship_id}`);
};

export const addContactRelationship = (id, relationship) => {
  return axiosInstance.post(`contact/${id}/relationship`, relationship);
};

export const updateContactRelationship = (
  id,
  relationship_id,
  relationship
) => {
  return axiosInstance.put(
    `contact/${id}/relationship/${relationship_id}`,
    relationship
  );
};

export const deleteContactRelationship = (id, relationship_id) => {
  return axiosInstance.delete(`contact/${id}/relationship/${relationship_id}`);
};

export const getContactActivities = (id) => {
  return axiosInstance.get(`contact/${id}/activities`);
};

export const getContactActivity = (id, activity_id) => {
  return axiosInstance.get(`contact/${id}/activity/${activity_id}`);
};

export const addContactActivity = (id, note) => {
  return axiosInstance.post(`contact/${id}/activity`, note);
};

export const updateContactActivity = (id, activity_id, note) => {
  return axiosInstance.put(`contact/${id}/activity/${activity_id}`, note);
};

export const deleteContactActivity = (id, activity_id) => {
  return axiosInstance.delete(`contact/${id}/activity/${activity_id}`);
};

export const getContactLookingProperties = (id) => {
  return axiosInstance.get(`contact/${id}/properties_looking_for`);
};

export const addContactLookingProperty = (id, property) => {
  return axiosInstance.post(`contact/${id}/property_looking_for`, property);
};

export const updateContactLookingProperty = (id, property_id, property) => {
  return axiosInstance.put(
    `contact/${id}/property_looking_for/${property_id}`,
    property
  );
};

// export const deleteContact = ({ tenant, email }) =>
//   axios.delete(
//     `${process.env.NEXT_PUBLIC_CONTACT_API_BASE_URL}/v1/contact/${tenant}/${email}`
//   );

// export const bulkAddContacts = (contacts) =>
//   axios.post(
//     `${process.env.NEXT_PUBLIC_CONTACT_API_BASE_URL}/v1/contact/bulk`,
//     { contacts }
//   );

// export const bulkUpdateContactStatus = (contact) =>
//   axios.put(
//     `${process.env.NEXT_PUBLIC_CONTACT_API_BASE_URL}/v1/contact/bulk`,
//     contact
//   );

// export const bulkUpdateContactType = (contact) =>
//   axios.put(
//     `${process.env.NEXT_PUBLIC_CONTACT_API_BASE_URL}/v1/contact/bulk`,
//     contact
//   );

// export const bulkUpdateContactActive = (contact) =>
//   axios.put(
//     `${process.env.NEXT_PUBLIC_CONTACT_API_BASE_URL}/v1/contact/bulk`,
//     contact
//   );
