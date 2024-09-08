module.exports = {
  // Format the given date as MM/DD/YYYY
  format_date: (date) => {
    const formattedDate = new Date(date);  // Convert to a Date object
    return `${formattedDate.getMonth() + 1}/${formattedDate.getDate()}/${formattedDate.getFullYear()}`;  // Return formatted date
  },
};