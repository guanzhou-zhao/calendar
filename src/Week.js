import React, { Component } from 'react';
import moment from 'moment';

class Week extends Component {

  render() {
    let daysOfWeek = this.props.week.daysOfWeek;
    let days = [];

    // Fill empty cell before first day of month when needed
    let firstDayOfWeek = moment(daysOfWeek[0]).startOf('week');
    if (daysOfWeek.length < 7 && !firstDayOfWeek.isSame(daysOfWeek[0])) {
      do {
        days.push(<div className="cell hidden" key={firstDayOfWeek.date()}></div>)
        firstDayOfWeek.add(1, 'day');
      } while (firstDayOfWeek.isBefore(daysOfWeek[0]))
    }

    // Fill normal day cell
    let currentDayClass;
    let weekendClass;
    let today = moment().startOf('day');
    daysOfWeek.forEach((day, index) => {
      currentDayClass = day.isSame(today) ? ' current-day' : '';
      weekendClass = day.day()===0 || day.day()===6 ? ' weekend' : '';
      days.push(
        <div className={'cell' + currentDayClass + weekendClass} key={day.date()}>{day.date()}</div>
      );
    })


    return (
      <div className="week">
        {days}
      </div>
    );
  }
}

export default Week;
