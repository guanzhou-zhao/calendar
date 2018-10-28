import React, { Component } from 'react';
import './Calendar.css';
import calendarData from './CalendarData.js'
import Month from './Month.js'

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dayOfChangingCategory: null,
      events: []
    };

    this.handleChangingCategoryClick = this.handleChangingCategoryClick.bind(this);
    this.handleChangingCategory = this.handleChangingCategory.bind(this);
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

  handleChangingCategory(day, category) {
    let events = this.state.events;
    let i = events.findIndex((element) => {
      return day.isSame(element.day);
    });
    // if there is no category set for this day
    if (i < 0) {
      events.push({day, category })
    } else {
      // else there is category set for this day
      // if category set is not equal to new category, set it to new category
      if (category !== events[i].category) {
        events[i].category = category;
      } else {
        // else remove this day from events
        events.splice(i, 1);
      }
    }
    this.setState({events})
  }
  render() {
    let months = [];
    calendarData.forEach((month, index) => {
      months.push(
        <Month
          month={month}
          events={this.state.events}
          dayOfChangingCategory={this.state.dayOfChangingCategory}
          handleChangingCategoryClick = {this.handleChangingCategoryClick}
          handleChangingCategory = {this.handleChangingCategory}
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
