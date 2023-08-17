import {
  types,
  statuses,
  clientStatuses,
  contactStatuses,
  professionalsStatuses,
  filtersForLastCommunicationDate,
  healthLastCommunicationDate,
  multiselectOptionsClients,
  multiselectOptionsProfessionals,
} from './variables';
import moment from 'moment';
import { multiselectOptions } from './variables';

export const getInitials = (name) => {
  // let fullName = name.split(' ');
  let fullName = name.split(/\s+/);
  return (fullName[0][0] + fullName[1][0]).toUpperCase();
};

export const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

export const formatNumber = (number) => {
  return number.toLocaleString(undefined, { maximumFractionDigits: 2 });
};

export const formatDate = (eventDate, hideTime) => {
  let dateObj = new Date(eventDate * 1000);
  const year = dateObj.getFullYear();
  const day = dateObj.getDate();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthIndex = dateObj.getMonth();
  const monthName = months[monthIndex];
  const time = dateObj.toLocaleString('en-US', {
    hour: 'numeric',
    hour12: true,
    minute: 'numeric',
  });
  return hideTime ? `${monthName} ${day}, ${year}` : `${monthName} ${day}, ${year} ${time}`;
};

export const removeClientFromArray = (clientList, clientEmail) => {
  return clientList.filter(function (el) {
    return el.email != clientEmail;
  });
};

export const getContactTypeByTypeId = (typeId) => {
  let foundType = null;
  types.forEach((allTypes) => {
    allTypes.types.filter((type) => {
      if (type.id == typeId) {
        foundType = type.name;
      }
    });
  });
  return foundType ? foundType : 'Unknown';
};
export const getContactStatusByStatusId = (category, statusId) => {
  let statuses = [4, 5, 6, 7].includes(category) ? clientStatuses : professionalsStatuses;
  let foundStatus = null;
  statuses.forEach((allStatuses) => {
    allStatuses.statuses.filter((type) => {
      if (type.id == statusId) {
        foundStatus = type.name;
      }
    });
  });
  return foundStatus ? foundStatus : '-';
};

export const getContactStatusColorByStatusId = (category, statusId) => {
  let statuses = [4, 5, 6, 7].includes(category) ? clientStatuses : professionalsStatuses;
  let foundStatus = null;
  statuses.forEach((allStatuses) => {
    allStatuses.statuses.filter((type) => {
      if (type.id == statusId) {
        foundStatus = type.color;
      }
    });
  });
  return foundStatus ? foundStatus : -1;
};

export const searchContacts = (originalArray, term) => {
  let filteredContacts = originalArray.filter((item) => {
    const fullName = `${item.first_name}${item.last_name}`.toLowerCase();
    const reversedFullName = `${item.last_name}${item.first_name}`.toLowerCase();
    const trimmedSearchValue = term.replace(/\s+/g, '').toLowerCase();
    return fullName.includes(trimmedSearchValue) || reversedFullName.includes(trimmedSearchValue);
  });

  let contactsState = {};
  contactsState.data = filteredContacts;

  return contactsState;
};

export const formatDateMDY = (date) => {
  return moment(date).format('MM/DD/YYYY');
};

export const formatDateLL = (date) => {
  return moment(date).format('LL');
};

export const formatDateLT = (date) => {
  return moment(date).format('MM/DD/YYYY, LT');
};

export const formatDateLThour = (date) => {
  return moment(date).format('LT');
};

export const formatDateCalendar = (date) => {
  const calendarDate = moment(date).calendar();
  const calendarDateArray = calendarDate.split(' ');
  return calendarDateArray[0];
};

export const formatDateAgo = (date, param) => {
  return moment(date).startOf(param).fromNow();
};

export const formatDateTo = (date, param) => {
  return moment(date).endOf(param).fromNow();
};

export const isValidDate = (date) => {
  return moment(date).isValid();
};

export const isToday = (date) => {
  return moment(date).isSameOrAfter(moment().startOf('date'));
};

export const dateBeforeDate = (date1, date2) => {
  return moment(date1).isBefore(date2);
};

export const dateAfterDate = (date1, date2) => {
  return moment(date1).isAfter(date2);
};

export const sortDateAsc = (array, arrayFieldName) => {
  const sortedArray = array.slice().sort(function (a, b) {
    if (dateBeforeDate(a[arrayFieldName], b[arrayFieldName])) {
      return -1;
    }
    if (dateAfterDate(a[arrayFieldName], b[arrayFieldName])) {
      return 1;
    }
    return 0;
  });

  return sortedArray;
};

// export const phoneUSAFormat = (input) => { //returns (###) ###-####
//   input = input.replace(/\D/g,'');
//   let size = input.length;
//   if (size>0) {input="("+input}
//   if (size>3) {input=input.slice(0,4)+") "+input.slice(4,11)}
//   if (size>6) {input=input.slice(0,9)+"-" +input.slice(9)}
//   return input;
// }

export const phoneNumberFormat = (phoneNumber) => {
  if (!phoneNumber) return 'N/A';
  const countryCode = phoneNumber.substring(0, 2);
  if (countryCode === '+1') {
    const number = phoneNumber.substring(2);
    return number.replace(/(\d{3})(\d{3})(\d{4})/, '($1) - $2 - $3');
  } else {
    const number = phoneNumber.trim().replace(/[^0-9]/g, '');
    return number.replace(/(\d{3})(\d{3})(\d{4})/, '($1) - $2 - $3');
  }
};

export const phoneNumberInputFormat = (phoneNumber) => {
  if (!phoneNumber) return;

  const countryCode = phoneNumber.substring(0, 2);
  let number = '';
  if (countryCode === '+1') {
    number = phoneNumber
      .substring(2)
      .trim()
      .replace(/[^0-9]/g, '');
  } else {
    number = phoneNumber.trim().replace(/[^0-9]/g, '');
  }
  // console.log(phoneNumber, number,'foormating')
  if (number.length < 4) return number;
  if (number.length < 7) return number.replace(/(\d{3})(\d{1})/, '($1) - $2');
  if (number.length < 11) return number.replace(/(\d{3})(\d{3})(\d{1})/, '($1) - $2 - $3');
  return number.replace(/(\d{3})(\d{3})(\d{4})/, '($1) - $2 - $3');
};

export const revertPhoneNumberInputFormat = (phoneNumber) => {
  const number = phoneNumber.trim().replace(/[^0-9]/g, '');
  // console.log('reverting', `+1${number}`)
  if (!number.length) return;
  return `+1${number}`;
};

export const filterLastCommuncationDate = (date, filterDateString, categoryType, status) => {
  // console.log('filteringdate', date, filterDateString, categoryType, status);

  const filterForDate = filtersForLastCommunicationDate[filterDateString];
  if (filterForDate === 'healthy') {
    const contactType = `${categoryType.toLowerCase()}s`;
    const healthyCommunicationDays = healthLastCommunicationDate[contactType][status];
    return isHealthyCommuncationDate(date, healthyCommunicationDays);
  }
  if (filterForDate === 'unhealthy') {
    const contactType = `${categoryType.toLowerCase()}s`;
    const healthyCommunicationDays = healthLastCommunicationDate[contactType][status];
    return !isHealthyCommuncationDate(date, healthyCommunicationDays);
  }
  if (filterForDate === 'today') {
    return isToday(date);
  }

  const filterDate = moment().startOf('date').subtract(filterForDate[0], filterForDate[1]);
  return moment(date).isSameOrBefore(filterDate);
};

export const isHealthyCommuncationDate = (date, healthyCommunicationDays) => {
  const healthyCommunicationDate = moment().startOf('date').subtract(healthyCommunicationDays, 'days');
  const isHealthyCommunication = dateAfterDate(date, healthyCommunicationDate);

  return isHealthyCommunication;
};

export const findTagsOption = (selectedOptions, typeOfContact) => {
  if (!selectedOptions) {
    return null;
  }
  const options = selectedOptions.map((label) => {
    const value = label;
    let multiselectOptions = typeOfContact === 0 ? multiselectOptionsClients : multiselectOptionsProfessionals;
    const option = multiselectOptions.find((option) => option.value === value);
    return {
      value: value,
      label: option ? option.label : label,
    };
  });
  return options;
  // return multiselectOptions.find((option) => option.label === selectedOption);
};

export const getEmailParts = (email) => {
  const atIndex = email.indexOf('@');
  const dotIndex = email.indexOf('.');
  const domain = email.slice(dotIndex + 1, email.length - 4); // Remove '.com' or other domain extensions

  let firstName = email.slice(0, atIndex);
  let lastName = email.slice(atIndex + 1, dotIndex);

  // Map specific domains to corresponding names
  switch (lastName) {
    case 'opgny':
      lastName = 'Oxford';
      break;
    case 'levelgroup':
      lastName = 'Level';
      break;
    case 'spiregroupny':
      lastName = 'Spire';
      break;
    default:
      // Capitalize the first letter of the last name
      lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);
      break;
  }

  // Capitalize the first letter of the first name
  firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);

  return { firstName, lastName };
};

export const findProfessionalSubtype = (id) => {
  return professionalsStatuses[0].statuses.find((status) => status.id == id).name;
};
