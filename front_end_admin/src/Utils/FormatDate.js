function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

export const formatDate = (date) => {
    
    var d = new Date(date)
    
  return [
    padTo2Digits(d.getDate()),
    padTo2Digits(d.getMonth() + 1),
    d.getFullYear(),
  ].join('/');
}