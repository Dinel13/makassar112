export const parseDateSQLtoString = (date) => {
   const dateObj = new Date(date);
   return `${dateObj.getFullYear()}/${dateObj.getMonth()+1}/${dateObj.getDate()} ${dateObj.getHours()}:${dateObj.getMinutes()}`;
 }

 export const parseDateSQLtoStringDate = (date) => {
  const dateObj = new Date(date);
  return `${dateObj.getFullYear()}/${dateObj.getMonth()+1}/${dateObj.getDate()}`;
}