import React from "react";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import styled from "styled-components";
import CalendarImage from "../../../assets/icon_calendar.svg";
import NextImage1 from "../../../assets/calendar_next_1.svg";
import NextImage2 from "../../../assets/calendar_next_2.svg";
import PrevImage1 from "../../../assets/calendar_prev_1.svg";
import PrevImage2 from "../../../assets/calendar_prev_2.svg";
import { useDispatch, useSelector } from "react-redux";
import ClickAwayListener from "react-click-away-listener";
import moment from "moment";
import { setFilterDateTimesheet } from "../../../redux/slices/timesheet/timesheet";

const Styles = styled.div`
  .calendar-container {
    position: relative;

    .sidebar-calendar {
      max-width: 265px;
      height: 40px;
      border: 1px solid #bebebe;
      border-radius: 4px;
      padding: 2px 10px;

      display: flex;
      justify-content: center;
      align-items: center;
      gap: 5px;

      .start-date {
        border-right: 1px solid gray;
        padding-right: 10px;
        cursor: pointer;

        &:hover {
          background: rgba(8, 84, 160, 0.348);
          border: 8px;
          color: rgb(255, 255, 255);
        }

        &.active {
          background: rgb(53, 74, 95);
          border: 8px;
          color: rgb(255, 255, 255);
        }
      }

      .finish-date {
        margin-left: 5px;
        cursor: pointer;

        &:hover {
          background: rgba(8, 84, 160, 0.348);
          border: 8px;
          color: rgb(255, 255, 255);
        }

        &.active {
          background: rgb(53, 74, 95);
          border: 8px;
          color: rgb(255, 255, 255);
        }
      }
    }

    .component-container-second {
      z-index: 1;
      position: absolute;
      top: 50px;
      left: 340px;

      .react-calendar {
        width: 350px;
        height: 100%;
        background-color: #fff;
        border: 1px solid rgb(190, 190, 190);
        border-radius: 4px;
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
        font-family: Arial, Helvetica, sans-serif;
        line-height: 1.125em;
        padding: 10px;

        &__viewContainer {
          gap: 20px;
        }
      }
      .react-calendar__navigation button {
        color: #4b4e51;
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
        background: #6f48eb33;
        color: #626262;
        border-radius: 6px;
      }
      .react-calendar__tile--now {
        background: #6f48eb33;
        border-radius: 6px;
        font-weight: bold;
        color: #626262;
      }
      .react-calendar__tile--now:enabled:hover,
      .react-calendar__tile--now:enabled:focus {
        background: #6f48eb33;
        border-radius: 6px;
        font-weight: bold;
        color: #fff;
      }
      .react-calendar__tile--hasActive:enabled:hover,
      .react-calendar__tile--hasActive:enabled:focus {
        background: #354a5f;
        color: #fff;
      }
      .react-calendar__tile--active {
        background: #6f48eb;
        border-radius: 6px;
        font-weight: bold;
        color: white;
      }
      .react-calendar__tile--active:enabled:hover,
      .react-calendar__tile--active:enabled:focus {
        background: #354a5f;
        color: white;
      }
      .react-calendar--selectRange .react-calendar__tile--hover {
        background-color: #f8f8fa;
      }
      .react-calendar__tile--range {
        background: #fff;
        color: #4b4e51;
        border-radius: 0;
      }
      .react-calendar__tile--rangeStart {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        border-top-left-radius: 6px;
        border-bottom-left-radius: 6px;
        background: #354a5f;
        color: white;
      }
      .react-calendar__tile--rangeEnd {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        border-top-right-radius: 6px;
        border-bottom-right-radius: 6px;
        background: #354a5f;
        color: white;
      }
    }

    .component-container-first {
      z-index: 1;
      position: absolute;
      top: 50px;
      left: 0px;

      .react-calendar {
        width: 350px;
        height: 100%;
        background-color: #fff;
        border: 1px solid rgb(190, 190, 190);
        border-radius: 4px;
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
        font-family: Arial, Helvetica, sans-serif;
        line-height: 1.125em;
        padding: 10px;

        &__viewContainer {
          gap: 20px;
        }
      }
      .react-calendar__navigation button {
        color: #4b4e51;
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
        background: #6f48eb33;
        color: #626262;
        border-radius: 6px;
      }
      .react-calendar__tile--now {
        background: #6f48eb33;
        border-radius: 6px;
        font-weight: bold;
        color: #626262;
      }
      .react-calendar__tile--now:enabled:hover,
      .react-calendar__tile--now:enabled:focus {
        background: #6f48eb33;
        border-radius: 6px;
        font-weight: bold;
        color: #fff;
      }
      .react-calendar__tile--hasActive:enabled:hover,
      .react-calendar__tile--hasActive:enabled:focus {
        background: #354a5f;
        color: #fff;
      }
      .react-calendar__tile--active {
        background: #6f48eb;
        border-radius: 6px;
        font-weight: bold;
        color: white;
      }
      .react-calendar__tile--active:enabled:hover,
      .react-calendar__tile--active:enabled:focus {
        background: #354a5f;
        color: white;
      }
      .react-calendar--selectRange .react-calendar__tile--hover {
        background-color: #f8f8fa;
      }
      .react-calendar__tile--range {
        background: #fff;
        color: #4b4e51;
        border-radius: 0;
      }
      .react-calendar__tile--rangeStart {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        border-top-left-radius: 6px;
        border-bottom-left-radius: 6px;
        background: #354a5f;
        color: white;
      }
      .react-calendar__tile--rangeEnd {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        border-top-right-radius: 6px;
        border-bottom-right-radius: 6px;
        background: #354a5f;
        color: white;
      }
    }
  }
`;

const DoubleCalendarComponent = (props) => {
  // стейт для хранения выбранного диапазона дат для начала промежутка
  const [dateStart, setDateStart] = React.useState();
  // стейт для хранения выбранного диапазона дат для конца промежутка
  const [dateFinish, setDateFinish] = React.useState();
  // тогглим показ окна с календарем #1
  const [showFirstCalendar, setShowFirstCalendar] = React.useState(false);
  // тогглим показ окна с календарем #2
  const [showSecondCalendar, setShowSecondCalendar] = React.useState(false);
  // достаем переменные из стейта для фильтра нужной нам страницы (у каждой страницы свой фильтр даты)

  const { filterDateTimesheet } = useSelector((state) => state.timesheet);

  const dispatch = useDispatch();

  // при изменении даты - меняем значения в Redux Store
  React.useEffect(() => {
    if (dateStart && dateFinish) {
      switch (props.tab) {
        case "timesheet":
          dispatch(
            setFilterDateTimesheet(
              `${dateStart.toLocaleDateString()}-${dateFinish.toLocaleDateString()}`
            )
          );
          break;
        default:
          return;
      }
    }
    return () => {};
  }, [dateStart, dateFinish, dispatch]);

  return (
    <Styles>
      <div className="calendar-container">
        <div className={`sidebar-calendar`}>
          <img src={CalendarImage} alt="" />

          <div
            className={`start-date ${showFirstCalendar ? "active" : ""}`}
            onClick={() => setShowFirstCalendar((prev) => !prev)}
          >
            {dateStart
              ? dateStart.toLocaleDateString()
              : filterDateTimesheet.split("-")[0]}
          </div>
          <div
            className={`finish-date ${showSecondCalendar ? "active" : ""}`}
            onClick={() => setShowSecondCalendar((prev) => !prev)}
          >
            {dateFinish
              ? dateFinish.toLocaleDateString()
              : filterDateTimesheet.split("-")[1]}
          </div>
        </div>
        {showFirstCalendar && (
          // <ClickAwayListener onClickAway={() => setShowFirstCalendar(false)}>
          <div className="component-container-first">
            <Calendar
              onChange={setDateStart}
              returnValue={"start"}
              // selectRange={true}
              showWeekNumbers={true}
              value={[
                `${moment(dateStart).format("YYYY-MM-DD")}`,
                `${moment(dateFinish).format("YYYY-MM-DD")}`,
              ]}
              maxDetail={"month"}
              minDetail={"decade"}
              locale="en"
              nextLabel={<img src={NextImage1} alt="" />}
              next2Label={
                <img src={NextImage2} alt="" style={{ width: "25px" }} />
              }
              prevLabel={<img src={PrevImage1} alt="" />}
              prev2Label={
                <img src={PrevImage2} alt="" style={{ width: "25px" }} />
              }
            />
          </div>
          // </ClickAwayListener>
        )}
        {showSecondCalendar && (
          // <ClickAwayListener onClickAway={() => setShowSecondCalendar(false)}>
          <div className="component-container-second">
            <Calendar
              onChange={setDateFinish}
              returnValue={"end"}
              // selectRange={true}
              showWeekNumbers={true}
              value={[
                `${moment(dateStart).format("YYYY-MM-DD")}`,
                `${moment(dateFinish).format("YYYY-MM-DD")}`,
              ]}
              maxDetail={"month"}
              minDetail={"decade"}
              locale="en"
              nextLabel={<img src={NextImage1} alt="" />}
              next2Label={
                <img src={NextImage2} alt="" style={{ width: "25px" }} />
              }
              prevLabel={<img src={PrevImage1} alt="" />}
              prev2Label={
                <img src={PrevImage2} alt="" style={{ width: "25px" }} />
              }
            />
          </div>
          // </ClickAwayListener>
        )}
      </div>
    </Styles>
  );
};

export default DoubleCalendarComponent;
