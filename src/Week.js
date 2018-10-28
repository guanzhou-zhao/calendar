import React, { Component } from 'react';
import moment from 'moment';

class Week extends Component {
  constructor(props) {
    super(props);

    this.onCellClick = this.onCellClick.bind(this);
    this.onCategoryClick = this.onCategoryClick.bind(this);
  }
  getCategoryPicker(dayPicking, today) {
    let categoryPicker = null;
    if(dayPicking) {
      if (today.isSame(dayPicking)) {
        categoryPicker = (
          <div className="picker">
            <button className="category holiday" onClick={this.onCategoryClick(today, 'holiday')}>Holiday</button>
            <button className="category birthday" onClick={this.onCategoryClick(today, 'birthday')}>Birthday</button>
            <button className="category busy" onClick={this.onCategoryClick(today, 'busy')}>Busy</button>
            <button className="category anniversary" onClick={this.onCategoryClick(today, 'anniversary')}>Anniversary</button>
          </div>
        );
      }
    }
    return categoryPicker;
  }
  getCategoryClass(day) {
    let categoryClass='';
    let events = this.props.events;
    let e = events.find((element) => {
      return day.isSame(element.day);
    })
    // if there is event on this day
    if (e) {
      categoryClass = ' ' + e.category;
    }
    return categoryClass;
  }
  onCellClick(day) {
    return () => {
      this.props.handleChangingCategoryClick(day);
    }
  }
  onCategoryClick(day, category) {
    return () => {
      this.props.handleChangingCategory(day, category);
    }
  }
  render() {
    let daysOfWeek = this.props.week.daysOfWeek;
    let dayOfChangingCategory = this.props.dayOfChangingCategory;
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
    let categoryClass;
    let today = moment().startOf('day');
    daysOfWeek.forEach((day, index) => {
      currentDayClass = day.isSame(today) ? ' current-day' : '';
      weekendClass = day.day()===0 || day.day()===6 ? ' weekend' : '';
      categoryClass = this.getCategoryClass(day);
      days.push(
        <div
        className={'cell' + currentDayClass + weekendClass + categoryClass}
        onClick={this.onCellClick(day)}
        key={day.date()}>
          {day.date()}{this.getCategoryPicker(dayOfChangingCategory, day)}
        </div>
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
