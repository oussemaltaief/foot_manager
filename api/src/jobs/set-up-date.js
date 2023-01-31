function formatExpire(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate() 
  )}T${pad(date.getHours()+1)}:${pad(date.getMinutes())}:${pad(
    date.getSeconds()
  )}`;
}

function formatDate(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
    date.getSeconds()
  )}`;
}

function pad(value) {
  return `${value < 10 ? '0' : ''}${value}`;
}

function formatDatee(date) {
  const dateObj = new Date(date);
  const formattedDate = [
    dateObj.getDate(),
    dateObj.getMonth() + 1,
    dateObj.getFullYear()
  ]
    .map(i => (i < 10 ? '0' + i : i))
    .join('/');
  return formattedDate;
}

module.exports = {
  formatExpire,
  formatDate,
  formatDatee
};
