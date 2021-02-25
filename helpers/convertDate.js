function convertDate(dataDate) {
  let year = dataDate.getFullYear()
  let month = dataDate.getMonth() + 1
  let date = dataDate.getDate();

  if (month < 10) month = `0${month}`
  if (date < 10) date = `0${date}`
  let newDate = `${year}-${month}-${date}`
  return newDate;
  
}

module.exports = convertDate