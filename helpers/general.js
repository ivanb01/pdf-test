export const handleInputChange = (setState) => {
  return (e) => {
    setState(e.target.value);
  };
};

export const displayParsedCSV = (contents, headers = []) => {
  const json = contents.split('\n');
  let jsonObj = [];
  for (let i = 0; i < json.length; i++) {
    const data = json[i].replaceAll('"', '').split(',');
    const obj = {};
    for (let j = 0; j < data.length; j++) {
      obj[headers[j].trim()] = data[j].trim();
    }
    jsonObj.push(obj);
  }
  return jsonObj;
};

export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
