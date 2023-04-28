import React, { useState } from "react";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import styled from "styled-components";
import CalendarImage from "../../../assets/icon_calendar.svg";
import { setFilterDate } from "../../../redux/slices/holidays/holidays";
import { useDispatch } from "react-redux";

const Styles = styled.div`
  .calendar-container {
    position: relative;

    .sidebar-calendar {
      max-width: 240px;
      height: 40px;
      border: 1px solid #bebebe;
      border-radius: 4px;
      padding: 2px 10px;
      cursor: pointer;

      display: flex;
      justify-content: center;
      align-items: center;
      gap: 5px;

      &:hover {
        border: 1px solid #354a5f;
      }

      &:actvie {
        border: 1px solid #351a50;
      }

      .start-date {
        border-right: 1px solid gray;
        padding-right: 10px;
      }

      .finish-date {
        margin-left: 5px;
      }
    }

    .component-container {
      z-index: 1;
      position: absolute;
      top: 50px;
      left: 0;

      .react-calendar {
        width: 600px;
        /* max-width: 800px; */
        background-color: #fff;
        color: #222;
        border-radius: 8px;
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
        font-family: Arial, Helvetica, sans-serif;
        line-height: 1.125em;
      }
      .react-calendar__navigation button {
        color: #6f48eb;
        min-width: 44px;
        background: none;
        font-size: 16px;
        margin-top: 8px;
      }
      .react-calendar__navigation button:enabled:hover,
      .react-calendar__navigation button:enabled:focus {
        background-color: #f8f8fa;
      }
      .react-calendar__navigation button[disabled] {
        background-color: #f0f0f0;
      }
      abbr[title] {
        text-decoration: none;
      }
      /* .react-calendar__month-view__days__day--weekend {
 color: #d10000;
} */
      .react-calendar__tile:enabled:hover,
      .react-calendar__tile:enabled:focus {
        background: #f8f8fa;
        color: #6f48eb;
        border-radius: 6px;
      }
      .react-calendar__tile--now {
        background: #6f48eb33;
        border-radius: 6px;
        font-weight: bold;
        color: #6f48eb;
      }
      .react-calendar__tile--now:enabled:hover,
      .react-calendar__tile--now:enabled:focus {
        background: #6f48eb33;
        border-radius: 6px;
        font-weight: bold;
        color: #6f48eb;
      }
      .react-calendar__tile--hasActive:enabled:hover,
      .react-calendar__tile--hasActive:enabled:focus {
        background: #f8f8fa;
      }
      .react-calendar__tile--active {
        background: #6f48eb;
        border-radius: 6px;
        font-weight: bold;
        color: white;
      }
      .react-calendar__tile--active:enabled:hover,
      .react-calendar__tile--active:enabled:focus {
        background: #6f48eb;
        color: white;
      }
      .react-calendar--selectRange .react-calendar__tile--hover {
        background-color: #f8f8fa;
      }
      .react-calendar__tile--range {
        background: #f8f8fa;
        color: #6f48eb;
        border-radius: 0;
      }
      .react-calendar__tile--rangeStart {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        border-top-left-radius: 6px;
        border-bottom-left-radius: 6px;
        background: #6f48eb;
        color: white;
      }
      .react-calendar__tile--rangeEnd {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        border-top-right-radius: 6px;
        border-bottom-right-radius: 6px;
        background: #6f48eb;
        color: white;
      }
    }
  }
`;

const CalendarComponent = () => {
  // стейт для хранения выбранного диапазона дат
  const [date, setDate] = useState();
  // тогглим показ окна с календарем
  const [showCalendar, setShowCalendar] = useState(false);

  const dispatch = useDispatch();

  // при изменении даты - меняем значения в Redux Store
  React.useEffect(() => {
    if (date) {
      dispatch(
        setFilterDate(
          `${date[0].toLocaleDateString()}-${date[1].toLocaleDateString()}`
        )
      );
    }
    return () => {};
  }, [date, dispatch]);

  return (
    <Styles>
      <div className="calendar-container">
        <div
          className="sidebar-calendar"
          onClick={() => setShowCalendar((prev) => !prev)}
        >
          <img src={CalendarImage} alt="" />
          <div className="start-date">
            {date ? date[0].toLocaleDateString() : "start"}
          </div>
          <div className="finish-date">
            {date ? date[1].toLocaleDateString() : "end"}
          </div>
        </div>
        {showCalendar && (
          <div className="component-container">
            <Calendar
              onChange={setDate}
              selectRange={true}
              defaultValue={date}
              showDoubleView
              maxDetail={"month"}
              minDetail={"year"}
              // showNeighboringMonth={true}
            />
          </div>
        )}
      </div>
    </Styles>
  );
};

export default CalendarComponent;
