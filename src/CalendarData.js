import moment from 'moment';

function getCalendarDate(year) {
  let aDay = moment().year(year).startOf('year');
  let lastDayOfYear = moment(aDay).endOf('year');
  let calendar = [];
  let aMonth;
  let aWeek;

  do {
    if (aDay.isSame(moment(aDay).startOf('month'))) {
      aMonth = {
        name: aDay.format('MMMM'),
        weeksOfMonth: []
      }
      calendar.push(aMonth);
    }
    if (aDay.isSame(moment(aDay).startOf('month')) || aDay.isSame(moment(aDay).startOf('week'))) {
      aWeek = {
        weekNum: aDay.week(),
        daysOfWeek: []
      }
      aMonth.weeksOfMonth.push(aWeek);
    }
    aWeek.daysOfWeek.push(moment(aDay));

    aDay.add(1, 'day');
  } while (aDay.isSameOrBefore(lastDayOfYear));

  return calendar;
}

export default getCalendarDate;
