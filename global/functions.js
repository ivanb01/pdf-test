import {
  types,
  statuses,
  clientStatuses,
  contactStatuses,
  professionalsStatuses,
  filtersForLastCommunicationDate,
} from './variables';
import moment from 'moment';


export const getInitials = (name) => {
  let fullName = name.split(' ');
  return fullName[0][0] + fullName[1][0];
};

export const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

export const formatDate = (eventDate, hideTime) => {
  let dateObj = new Date(eventDate * 1000);
  const year = dateObj.getFullYear();
  const day = dateObj.getDate();
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const monthIndex = dateObj.getMonth();
  const monthName = months[monthIndex];
  const time = dateObj.toLocaleString('en-US', {
    hour: 'numeric',
    hour12: true,
    minute: 'numeric',
  });
  return hideTime
    ? `${monthName} ${day}, ${year}`
    : `${monthName} ${day}, ${year} ${time}`;
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
  return foundType ? foundType : -1;
};
export const getContactStatusByStatusId = (category, statusId) => {
  console.log(category, statusId);
  let statuses = [4, 5, 6, 7].includes(category)
    ? clientStatuses
    : professionalsStatuses;
  let foundStatus = null;
  statuses.forEach((allStatuses) => {
    allStatuses.statuses.filter((type) => {
      if (type.id == statusId) {
        foundStatus = type.name;
      }
    });
  });
  return foundStatus ? foundStatus : -1;
};

export const getContactStatusColorByStatusId = (category, statusId) => {
  let statuses = [4, 5, 6, 7].includes(category)
    ? clientStatuses
    : professionalsStatuses;
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
    const reversedFullName =
      `${item.last_name}${item.first_name}`.toLowerCase();
    const trimmedSearchValue = term.replace(/\s+/g, '').toLowerCase();
    return (
      fullName.includes(trimmedSearchValue) ||
      reversedFullName.includes(trimmedSearchValue)
    );
  });

  let contactsState = {};
  contactsState.data = filteredContacts;

  return contactsState;
};

export const formatDateMDY = (date) => {
  return moment(date).format("MM/DD/YYYY")
};

export const formatDateLL = (date) => {
  return moment(date).format("LL")
};

export const formatDateLT = (date) => {
  return moment(date).format("MM/DD/YYYY, LT")
};

export const formatDateAgo = (date, param) => {
  return moment(date).startOf(param).fromNow();
};

export const formatDateTo = (date, param) => {
  return moment(date).endOf(param).fromNow();
};

// export const phoneUSAFormat = (input) => { //returns (###) ###-####
//   input = input.replace(/\D/g,'');
//   let size = input.length;
//   if (size>0) {input="("+input}
//   if (size>3) {input=input.slice(0,4)+") "+input.slice(4,11)}
//   if (size>6) {input=input.slice(0,9)+"-" +input.slice(9)}
//   return input;
// }

export const formatPhoneNumber = (input) => {
  let output = "";
  input.replace( /^\D*(\d{0,3})\D*(\d{0,3})\D*(\d{0,4})/, function( match, g1, g2, g3 )
      {
        if( g1.length ) output = "(" + g1;
        if( g2.length ) output += ") " + g2 ;
        if( g3.length ) output += " - " + g3 ;
      }       
    );        
  return output;
}

export const filterLastCommuncationDate = (date, filterDateString) => {
  
  let filterDate = filtersForLastCommunicationDate[filterDateString]
  let test = moment().subtract(filterDate[0], filterDate[1]);
  // console.log('filteringdate', date, test, moment(date).isSameOrAfter(test));
  return moment(date).isSameOrAfter(test);
}
