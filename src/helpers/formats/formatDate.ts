
// Obtener la fecha como 29/09/2021
const getFormattedDate = (date: Date): string => {
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()

  return `${day}/${month}/${year}`
}

// Obtener hora de la fecha como 12:00 PM o 12:00 AM
const getFormattedTime = (date: Date): string => {
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const ampm = hours >= 12 ? 'PM' : 'AM'

  return `${hours}:${minutes} ${ampm}`
}

// Obtener fecha y hora como 29/09/2021 12:00 PM
const getFormattedDateTime = (date: Date): string => {
  return `${getFormattedDate(date)} ${getFormattedTime(date)}`
}

export { getFormattedDate, getFormattedTime, getFormattedDateTime }