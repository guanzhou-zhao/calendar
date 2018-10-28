import React, { Component } from 'react';
import './Calendar.css';
import calendarData from './CalendarData.js'
import Month from './Month.js'

class Calendar extends Component {

  render() {
    console.log(calendarData.length)
    let months = [];
    calendarData.forEach((month, index) => {
      months.push(<Month month={month} key={index}/>)
    })

    return (
      <div className="calendar">
        {months}
      </div>
    );
  }
}

export default Calendar;
