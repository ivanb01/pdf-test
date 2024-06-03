import axiosInstance from "./axiosInstance";

export const getUnapprovedContacts = () => {
  return axiosInstance.get("v1/contacts/gmail_ai/unapproved");
};
export const getAIData = (id) => {
  return axiosInstance.get(`v1/gmail/ai/log/contact/${id}`);
};

export const getUnapprovedAI = (limit, offset, category_names) => {
  return axiosInstance.get("v1/contacts?ai_approved=false", {
    params: {
      limit: limit,
      offset: offset,
      category_names: category_names,
    },
  });
};
