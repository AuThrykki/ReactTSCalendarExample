import { stat } from "fs";
import { useState } from "react";
import { JsxElement } from "typescript";

// type calendarProps = {
//   year: number
// };
type calendarState = {
  year: number
};

function CalendarFrame() {
  const [state, setCount] = useState<calendarState>({ year: 2020});
  
  var content: JSX.Element[] = [];

  for (var i = 1; i <= 12; i++) {
    content.push(
      <Month
        year={state.year}
        key={i}
        monthNo={i}
      />
    )
  }

  return (
    <div id="calendarFrame">
      <div className="yearChooser">
        <button onClick={() => {setCount({year: state.year-100})}}>◀100</button>
        <button onClick={() => {setCount({year: state.year-10})}}>◀10</button>
        <button onClick={() => {setCount({year: state.year-1})}}>◀1</button>
        <div className="chosenYear">{state.year}年</div>
        <button onClick={() => {setCount({year: state.year+1});}}>1▶</button>
        <button onClick={() => {setCount({year: state.year+10});}}>10▶</button>
        <button onClick={() => {setCount({year: state.year+100});}}>100▶</button>
      </div>
      <div className="MonthContainer">
        {content}
      </div>

    </div>
  );
}

export default CalendarFrame;


const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

type monthProp = {
  monthNo: number;
  year: number;
};
type MonthState = {
};

function Month(props: monthProp, state: MonthState) {
  var isEvenNumber = props.monthNo % 2 === 0;
  var oddOrEvenClass = isEvenNumber === true ? "evenMonth" : "oddMonth"
  var fullName = monthNames[props.monthNo - 1];
  var name = fullName.slice(0, 3);
  var classes = "month monthNo" + props.monthNo + " " + oddOrEvenClass +" "+ name;

  var containedDays: JSX.Element[] = [];
  var noDaysInMonth = daysInAGivenMonthAndYear(props.monthNo, props.year);
  var weekNumberOfFirstDayInMonth = new Date(props.year, props.monthNo - 1, 0).getDay();

  for (var i = 1; i <= noDaysInMonth; i++) {

    var dayOfWeek = (weekNumberOfFirstDayInMonth + (-1 + i)) % 7;

    containedDays.push(
      <Day
        key={i}
        month={props.monthNo}
        year={props.year}
        weekDayNumber={dayOfWeek}
        dayInMonth={i}
      />
    )
  }

  return (
    <div className={classes}>
      <div className="MonthName">{fullName}</div>
      <div className="DayContainer">{containedDays}</div>
    </div>
  )
}

var daysInAGivenMonthAndYear = function (month: number, year: number) {
  return new Date(year, month, 0).getDate();
};

const weekDayNames = ["月", "火", "水", "木", "金", "土", "日"];

type dayProps = {
  year: number,
  month: number,
  weekDayNumber: number,
  dayInMonth: number
};
type dayState = {
};

function Day(props: dayProps, state: dayState) {
  var name = weekDayNames[props.weekDayNumber]?.slice(0, 3);
  var fullname = weekDayNames[props.weekDayNumber];
  var classes = "day weekDayNumber" + props.weekDayNumber + " " + fullname;

  return (
    <div className={classes}>
      <div className="dayNumber">{props.dayInMonth}</div>
      <div className="dayName">{name}</div>
    </div>
  )
}