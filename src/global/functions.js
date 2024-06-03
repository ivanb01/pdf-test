import AIChip from '@components/shared/chip/ai-chip';
import GoogleContact from '/public/images/GoogleContact.png';

import {
  clientStatuses,
  filtersForLastCommunicationDate,
  healthLastCommunicationDate,
  multiselectOptionsClients,
  multiselectOptionsProfessionals,
  professionalsStatuses,
  types,
} from './variables';
import moment from 'moment';
import Image from 'next/image';

export const getInitials = (name) => {
  if (name.includes('|')) {
    let prePipe = name.split('|')[0].trim();
    return prePipe[0].toUpperCase();
  }

  let fullName = name.split(/\s+|\.+/);

  if (fullName.length > 1) {
    return (fullName[0][0] + fullName[1][0]).toUpperCase();
  } else if (fullName.length === 1) {
    return fullName[0][0].toUpperCase();
  }

  return '';
};
export const areObjectsEqual = (obj1, obj2) => {
  if (!obj2) {
    return;
  }
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2 && obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (let key of keys1) {
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }

  return true;
};

export const getTimeWithAMPM = (timestamp) => {
  const dateObject = new Date(timestamp);
  let hours = dateObject.getHours();
  const minutes = dateObject.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  return `${hours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;
};

export const formatDateStringMDY = (dateString) => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
};
export const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

export const formatNumber = (number) => {
  return number.toLocaleString(undefined, { maximumFractionDigits: 2 });
};

export const countActionTypes = (actions) => {
  const counts = {
    sms: 0,
    email: 0,
    total: 0,
  };

  actions.forEach((action) => {
    counts.total += 1;

    if (action.type === 'Email') {
      counts.email += 1;
    } else if (action.type === 'SMS') {
      counts.sms += 1;
    }
  });

  return counts;
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
export const getDateFormat = (timestamp) => {
  const dateObj = new Date(timestamp);

  const month = (dateObj.getUTCMonth() + 1).toString().padStart(2, '0');
  const day = dateObj.getUTCDate().toString().padStart(2, '0');
  const year = dateObj.getUTCFullYear();

  const mmddyyyyFormat = `${month}/${day}/${year}`;
  return mmddyyyyFormat;
};
export const removeClientFromArray = (clientList, clientEmail) => {
  return clientList.filter(function (el) {
    return el.email != clientEmail;
  });
};
export const capitalize = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};
export const getContactTypeByTypeId = (subtypes, typeId) => {
  let foundType = null;
  types.forEach((allTypes) => {
    allTypes.types.filter((type) => {
      if (type.id == typeId) {
        foundType = type.name;
      }
    });
  });

  if (!foundType && subtypes) {
    foundType = subtypes.find((subtype) => subtype.id == typeId).name;
  }

  return foundType ? foundType.charAt(0).toUpperCase() + foundType.slice(1) : 'Unknown';
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

export const getDateAfterDays = (days) => {
  const currentDate = new Date();
  const resultDate = new Date(currentDate);
  resultDate.setDate(currentDate.getDate() + days);
  return resultDate;
};

export const formatDateCalendar = (date) => {
  const calendarDate = moment(date).calendar();
  const calendarDateArray = calendarDate.split(' ');
  let indexOfAt = calendarDateArray.indexOf('at');

  if (indexOfAt !== -1) {
    calendarDateArray[indexOfAt] = '-';
  }

  let resultString = calendarDateArray.join(' ');
  return resultString;
};

export function daysBefore(dateString) {
  // Parse the input date string using Moment.js
  const inputDate = moment(dateString, 'YYYY-MM-DD');

  // Get the current date
  const currentDate = moment();

  // Calculate the difference in days
  const daysDifference = currentDate.diff(inputDate, 'days');

  return daysDifference + ' days ago';
}

export const formatDateAgo = (date, param) => {
  return moment(date).startOf(param).fromNow();
};

export function getFormattedDateFromTimestamp(timestamp) {
  const date = moment(timestamp);

  return date.format('MM/DD/YYYY');
}

export function isAfterToday(timestamp) {
  const currentDate = moment();
  const dateToCompare = moment(timestamp);

  return dateToCompare.isAfter(currentDate);
}

export const formatDateTo = (date, param) => {
  return moment(date).endOf(param).fromNow();
};

export const formatPrice = (price) => {
  return price?.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
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
  return moment(date1).isSameOrAfter(date2);
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
    return isHealthyCommuncationDate(date);
  }
  if (filterForDate === 'unhealthy') {
    const contactType = `${categoryType.toLowerCase()}s`;
    const healthyCommunicationDays = healthLastCommunicationDate[contactType][status];
    return !isHealthyCommuncationDate(date);
  }
  if (filterForDate === 'today') {
    return isToday(date);
  }

  const filterDate = moment().startOf('date').subtract(filterForDate[0], filterForDate[1]);
  return moment(date).isSameOrBefore(filterDate);
};

// export const isHealthyCommuncationDate = (date, healthyCommunicationDays) => {
//   const healthyCommunicationDate = moment().startOf('date').subtract(healthyCommunicationDays, 'days');
//   const isHealthyCommunication = dateAfterDate(date, healthyCommunicationDate);
//
//   return isHealthyCommunication;
// };

export const isHealthyCommuncationDate = (inputDate) => {
  const inputDateTime = moment(inputDate);
  const twoDaysAgo = moment().subtract(2, 'days');

  return inputDateTime.isSameOrBefore(moment(), 'day') && inputDateTime.isSameOrAfter(twoDaysAgo, 'day');
};

export const findTagsOption = (selectedOptions) => {
  if (!selectedOptions) return null;

  const option = multiselectOptionsClients.find((option) => option.value === selectedOptions);
  return {
    value: selectedOptions,
    label: option ? option.label : selectedOptions,
  };
};

export const getEmailParts = (email) => {
  const atIndex = email.indexOf('@');
  const dotIndex = email.indexOf('.');
  const domain = email.slice(dotIndex + 1, email.length - 4); // Remove '.com' or family domain extensions

  let firstName = email.slice(0, atIndex);
  let lastName = email.slice(atIndex + 1, dotIndex);

  // Map specific domains to corresponding names
  switch (lastName) {
    case 'opgny':
      lastName = '| Oxford';
      break;
    case 'levelgroup':
      lastName = '| Level';
      break;
    case 'spiregroupny':
      lastName = '| Spire';
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

export const valueOptions = (selectedOptions, multiselectOptions) => {
  if (!selectedOptions) {
    return null;
  }
  const options = selectedOptions?.map((el) => {
    return multiselectOptions.find((option) => option.value === el);
  });
  return options;
};

export const getBaseUrl = () => {
  if (typeof window !== 'undefined') return window.location.origin;
};

export const deepObjectsEqual = (x, y) => {
  const ok = Object.keys,
    tx = typeof x,
    ty = typeof y;
  return x && y && tx === 'object' && tx === ty
    ? ok(x).length === ok(y).length && ok(x).every((key) => deepObjectsEqual(x[key], y[key]))
    : x === y;
};

export const getTotalCountOfAllValues = (data) => {
  let totalCount = 0;

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const values = data[key];
      totalCount += values.length;
    }
  }

  return totalCount;
};

export const dataURLtoFile = (dataurl, filename) => {
  var arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[arr.length - 1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};

export const timeAgo = (timestamp) => {
  const dt = new Date(timestamp);
  const currentTime = new Date();
  const timeDifference = currentTime - dt;

  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
  const minutesDifference = Math.floor(timeDifference / (1000 * 60));

  if (daysDifference === 0) {
    if (hoursDifference !== 0) {
      const remainingMinutes = minutesDifference % 60;
      return `${hoursDifference === 1 ? ' 1 hour' : `${hoursDifference} hours`} and ${
        remainingMinutes === 1 ? ' 1 minute ago' : `${remainingMinutes} minutes ago`
      }`;
    } else {
      return `${
        minutesDifference === 1 || minutesDifference === 0 ? '1 minute ago' : `${minutesDifference} minutes ago`
      }`;
    }
  } else {
    return `${daysDifference === 1 ? ' 1 day ago' : `${daysDifference} days ago`}`;
  }
};

export const formatPhoneNumber = (phoneNumber) => {
  const numericPhoneNumber = phoneNumber.replace(/\D/g, '');
  if (numericPhoneNumber.startsWith('1')) {
    return `+${numericPhoneNumber.slice(0, 1)} ${numericPhoneNumber.slice(1, 4)} ${numericPhoneNumber.slice(
      4,
      7,
    )} ${numericPhoneNumber.slice(7)}`;
  } else {
    return numericPhoneNumber;
  }
};

export const generateSMSFooter = (user) => {
  const elements = [];
  let lastName = user.last_name ? ` ${user.last_name}` : '';
  let fullName = user.first_name ? `${user.first_name}${lastName}` : '';
  let phoneNumber = user.phone_number ? user.phone_number : '';
  let email = user.email ? user.email.toLowerCase() : '';
  // let company = getCompanyFromEmail(email);

  if (fullName) elements.push(fullName);
  if (phoneNumber) elements.push(phoneNumber);
  if (email) elements.push(email);
  // if (company) elements.push(company);

  return elements.join(', ') + '.';
};
export const getSource = (source, approvedAI = false) => {
  if (source === 'Smart Sync A.I.' || source === 'GmailAI' || source === 'AI Smart Synced Contact') {
    return {
      name: source,
      icon: <AIChip reviewed={approvedAI} />,
    };
  } else if (source === 'Manually Added') {
    return {
      name: 'Contact Added Manually',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M6.04175 13.9584H11.4584V12.7084H6.04175V13.9584ZM6.04175 10.625H13.9584V9.37508H6.04175V10.625ZM6.04175 7.29171H13.9584V6.04175H6.04175V7.29171ZM4.42316 17.0834C4.00222 17.0834 3.64591 16.9375 3.35425 16.6459C3.06258 16.3542 2.91675 15.9979 2.91675 15.577V4.42317C2.91675 4.00222 3.06258 3.64591 3.35425 3.35425C3.64591 3.06258 4.00222 2.91675 4.42316 2.91675H15.577C15.9979 2.91675 16.3542 3.06258 16.6459 3.35425C16.9375 3.64591 17.0834 4.00222 17.0834 4.42317V15.577C17.0834 15.9979 16.9375 16.3542 16.6459 16.6459C16.3542 16.9375 15.9979 17.0834 15.577 17.0834H4.42316Z"
            fill="#9CA3AF"
          />
        </svg>
      ),
    };
  } else if (source === 'Google Contacts') {
    return {
      name: 'Google Contact',
      icon: <Image src={GoogleContact} height={16} width={16} />,
    };
  } else return <></>;
};

export const convertTo12HourFormat = (time) => {
  const [hours, minutes] = time.split(':');
  let hour = parseInt(hours, 10);
  let period = 'AM';

  if (hour >= 12) {
    period = 'PM';
  }

  if (hour > 12) {
    hour -= 12;
  } else if (hour === 0) {
    hour = 12;
  }

  const hourString = hour.toString().padStart(2, '0');

  return `${hourString}:${minutes} ${period}`;
};

export const removeSecondsFromTime = (timeStr) => {
  var parts = timeStr.split(':');
  if (parts.length >= 2) {
    return parts.slice(0, 2).join(':');
  } else {
    return timeStr;
  }
};

export const getCompany = (email) => {
  let imageUrl = '';
  let companyName = '';
  console.log(email);
  if (email.includes('opgny')) {
    companyName = 'Oxford Property Group';
    imageUrl = 'https://i.imgur.com/kbMXf3r.png';
  } else if (email.includes('spire')) {
    companyName = 'Spire Group';
    imageUrl = 'https://i.imgur.com/RAyYKtU.png';
  } else if (email.includes('level')) {
    companyName = 'Level Group';
    imageUrl = 'https://i.imgur.com/Gq2NDtu.png';
  }
  return { imageUrl, companyName };
};
