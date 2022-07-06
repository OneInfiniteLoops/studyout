export const getTimeDate = (longFormDate) => {
    const dayjs = require('dayjs');
    const monthDayYear = dayjs(longFormDate).format('HH:mm MMM DD, YYYY');
    return(monthDayYear)
  }