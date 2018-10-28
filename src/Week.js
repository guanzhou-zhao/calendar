import React, { Component } from 'react';
import moment from 'moment';

class Week extends Component {
  constructor(props) {
    super(props);

    this.onCellClick = this.onCellClick.bind(this);
  }
  getCategoryPicker(dayPicking, today) {
    let categoryPicker = null;
    if(dayPicking) {
      if (today.isSame(dayPicking)) {
        categoryPicker = (
          <div className="picker">
            <button className="holiday">Holiday</button>
            <button className="birthday">Birthday</button>
            <button className="busy">Busy</button>
            <button className="anniversary">Anniversary</button>
          </div>
        );
      }
    }
    return categoryPicker;
  }
  onCellClick(day) {
    return () => {
      this.props.handleChangingCategoryClick(day);
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
    let today = moment().startOf('day');
    daysOfWeek.forEach((day, index) => {
      currentDayClass = day.isSame(today) ? ' current-day' : '';
      weekendClass = day.day()===0 || day.day()===6 ? ' weekend' : '';
      days.push(
        <div
        className={'cell' + currentDayClass + weekendClass}
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
