import React, { Component } from 'react';
import moment from 'moment';
import './Calendar.css';
import calendarData from './CalendarData.js'
import Month from './Month.js'

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dayOfChangingCategory: moment().startOf('day')
    };

    this.handleChangingCategoryClick = this.handleChangingCategoryClick.bind(this);
  }

  handleChangingCategoryClick(day) {
    let newValue = null;
    if (!day.isSame(this.state.dayOfChangingCategory)) {
      newValue = day;
    }
    this.setState({
      dayOfChangingCategory: newValue
    });
  }

  render() {
    let months = [];
    calendarData.forEach((month, index) => {
      months.push(
        <Month
          month={month}
          dayOfChangingCategory={this.state.dayOfChangingCategory}
          handleChangingCategoryClick = {this.handleChangingCategoryClick}
          key={index}
        />
      );
    })

    return (
      <div className="calendar">
        {months}
      </div>
    );
  }
}

export default Calendar;
