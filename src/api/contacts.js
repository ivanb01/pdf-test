import axios from 'axios';
import axiosInstance from 'api/axiosInstance';

export const clearData = () => {
  return axiosInstance.post('v1/profile/delete/my/data');
};
export const getContactCategories = () => {
  return axiosInstance.get('v1/contact/categories');
};

export const getCount = () => {
  return axiosInstance.get('v1/contact/count/by_category');
};
export const getContacts = (category, searchterm) => {
  return axiosInstance.get('v1/contacts', {
    params: { category_ids: category, search_term: searchterm },
  });
};

export const getContactsSearch = (queryParams) => {
  return axiosInstance.get('v1/contacts/search', {
    params: queryParams,
  });
};

export const getContact = (id) => {
  return axiosInstance.get(`v1/contact/${id}`);
};

export const addContact = (contact) => {
  return axiosInstance.post('v1/contact', contact);
};

export const updateContact = (id, contact) => {
  return axiosInstance.put(`v1/contact/${id}`, contact);
};

export const bulkAddContacts = (contacts) => {
  return axiosInstance.post(`v1/contact/bulk`, contacts);
};

export const bulkUpdateContacts = (contacts) => {
  return axiosInstance.put(`v1/contact/bulk`, contacts);
};

export const findContactByEmail = (queryParams) => {
  return axiosInstance.get(`v1/contact/find_by`, {
    params: queryParams,
  });
};

export const getContactProfiles = (id) => {
  return axiosInstance.get(`v1/contact/${id}/profiles`);
};

export const addContactProfile = (id, profile) => {
  return axiosInstance.post(`v1/contact/${id}/profile`, profile);
};

export const getContactNotes = (id, queryParams) => {
  return axiosInstance.get(`v1/contact/${id}/notes`, {
    params: queryParams,
  });
};

export const getContactNote = (id, note_id) => {
  return axiosInstance.get(`v1/contact/${id}/note/${note_id}`);
};

export const addContactNote = (id, note) => {
  return axiosInstance.post(`v1/contact/${id}/note`, { ...note, title: ' ' });
};

export const updateContactNote = (id, note_id, note) => {
  return axiosInstance.put(`v1/contact/${id}/note/${note_id}`, note);
};

export const deleteContactNote = (id, note_id) => {
  return axiosInstance.delete(`v1/contact/${id}/note/${note_id}`);
};

export const getContactRelationships = (id) => {
  return axiosInstance.get(`v1/contact/${id}/relationships`);
};

export const getContactRelationship = (id, relationship_id) => {
  return axiosInstance.get(`v1/contact/${id}/relationship/${relationship_id}`);
};

export const addContactRelationship = (id, relationship) => {
  return axiosInstance.post(`v1/contact/${id}/relationship`, relationship);
};

export const updateContactRelationship = (id, relationship_id, relationship) => {
  return axiosInstance.put(`v1/contact/${id}/relationship/${relationship_id}`, relationship);
};

export const deleteContactRelationship = (id, relationship_id) => {
  return axiosInstance.delete(`v1/contact/${id}/relationship/${relationship_id}`);
};

export const getContactActivities = (id) => {
  return axiosInstance.get(`v1/contact/${id}/activities`);
};

export const getContactActivity = (id, activity_id) => {
  return axiosInstance.get(`v1/contact/${id}/activity/${activity_id}`);
};

export const addContactActivity = (id, note) => {
  return axiosInstance.post(`v1/contact/${id}/activity`, note);
};

export const updateContactActivity = (id, activity_id, note) => {
  return axiosInstance.put(`v1/contact/${id}/activity/${activity_id}`, note);
};

export const deleteContactActivity = (id, activity_id) => {
  return axiosInstance.delete(`v1/contact/${id}/activity/${activity_id}`);
};

export const getContactLookingProperties = (id) => {
  return axiosInstance.get(`v1/contact/${id}/properties_looking_for`);
};

export const addContactLookingProperty = (id, property) => {
  return axiosInstance.post(`v1/contact/${id}/property_looking_for`, property);
};

export const updateContactLookingProperty = (id, property_id, property) => {
  return axiosInstance.put(`v1/contact/${id}/property_looking_for/${property_id}`, property);
};
