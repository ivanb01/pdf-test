export const getFileSize = (fileSize) => {
  let size = fileSize;
  var fSExt = new Array('Bytes', 'KB', 'MB', 'GB'),
    i = 0;
  while (size > 900) {
    size /= 1024;
    i++;
  }
  var exactSize = parseInt(Math.round(size * 100) / 100) + ' ' + fSExt[i];
  return exactSize;
};
