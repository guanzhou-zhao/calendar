import React, { Component } from 'react';
import Week from './Week.js'

class Month extends Component {

  render() {
    let month = this.props.month;
    let weeks = [];
    month.weeksOfMonth.forEach((week, index) => {
      weeks.push(<Week week={week} key={index}/>)
    })

    return (
      <div className="month">
        <h4 className="title">{month.name}</h4>
        <div className="week head">
          <div className="cell"> Su</div>
          <div className="cell"> M</div>
          <div className="cell"> Tu</div>
          <div className="cell"> W</div>
          <div className="cell"> Th</div>
          <div className="cell"> F</div>
          <div className="cell"> Sa</div>
        </div>
        { weeks }
      </div>
    );
  }
}

export default Month;
