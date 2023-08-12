import { DateTime } from "luxon"

const isThisMonth = (today: DateTime, date: DateTime) => {
  const thisMonth = today.month
  return date.month === thisMonth
}

export default isThisMonth