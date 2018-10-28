import React, { Component } from 'react';
import moment from 'moment';
import './Calendar.css';
import calendarData from './CalendarData.js';
import Month from './Month.js';
import Navigation from './Navigation';

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      yearDisplaying: moment().year(),
      dayOfChangingCategory: null,
      events: []
    };

    this.handleChangingCategoryClick = this.handleChangingCategoryClick.bind(this);
    this.handleChangingCategory = this.handleChangingCategory.bind(this);
    this.handleYearDisplayingChange = this.handleYearDisplayingChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    console.log(`input change event value: ${e.target.value}`);
    let year = e.target.value;
    let isInteger = Math.floor(year) === year;

    if (year >= 1 && year <= 3999 && isInteger) {
      this.setState({
        yearDisplaying: year
      })
    }
  }
  handleYearDisplayingChange(year) {
    // return () => {
    //   let isInteger = Math.floor(year) === year;
    //
    //   if (year >= 1 && year <= 3999 && isInteger) {
    //     this.setState({
    //       yearDisplaying: year
    //     })
    //   }
    //   console.log(`state year displaying: ${this.state.yearDisplaying}`)
    // }
    this.setState({yearDisplaying: year});
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
        <Navigation
          yearDisplaying={this.state.yearDisplaying}
          handleYearDisplayingChange={this.handleYearDisplayingChange}
        />
        {months}
      </div>
    );
  }
}

export default Calendar;
