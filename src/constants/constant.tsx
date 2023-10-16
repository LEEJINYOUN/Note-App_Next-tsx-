export const characterLimit = 200;

export const getFormatDate = (date: any) => {
  let year = date.getFullYear();
  let month = 1 + date.getMonth();
  month = month >= 10 ? month : "0" + month;
  let day = date.getDate();
  day = day >= 10 ? day : "0" + day;
  let hours = date.getHours();
  hours = hours > 10 ? hours : "0" + hours;
  let minutes = date.getMinutes();
  minutes = minutes > 10 ? minutes : "0" + minutes;
  return `${year}/${month}/${day} ${hours}:${minutes} `;
};
