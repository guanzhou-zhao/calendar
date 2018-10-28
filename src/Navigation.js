import React, { Component } from 'react';
import moment from 'moment';

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleInputChange(e) {
    this.props.handleYearDisplayingChange(parseInt(e.target.value));
  }
  render() {
    let currentYearNum = moment().year();
    let prevYear = null;
    let nextYear = null;
    let yearDisplaying = this.props.yearDisplaying;
    let handleYearDisplayingChange = this.props.handleYearDisplayingChange;
    if (yearDisplaying >=2) {
      prevYear = (
        <h3 className="year-number" onClick={()=>handleYearDisplayingChange(yearDisplaying-1)}>{yearDisplaying-1}</h3>
      );
    }
    if (yearDisplaying <=3998) {
      nextYear = (
        <h3 className="year-number" onClick={()=>handleYearDisplayingChange(yearDisplaying+1)}>{yearDisplaying+1}</h3>
      );
    }
    let currentYear = (
      <h3 className="year-number displaying">{yearDisplaying}</h3>
    );
    return (
      <div className="nav">
        <button onClick={()=>handleYearDisplayingChange(currentYearNum)}> Go To Current Year </button>
        {prevYear}
        {currentYear}
        {nextYear}
        <input onChange={this.handleInputChange} type="number" min="1" max="3999" step="1" value={yearDisplaying} />
      </div>
    );
  }

}

export default Navigation;
