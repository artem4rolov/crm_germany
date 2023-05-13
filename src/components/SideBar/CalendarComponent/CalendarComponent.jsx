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
import { setFilterDateHolidays } from "../../../redux/slices/holidays/holidays";
import { setFilterDateNotes } from "../../../redux/slices/notes/notes";
import ClickAwayListener from "react-click-away-listener";
import { setFilterDateYearSummary } from "../../../redux/slices/reports/year_summary/yearSummary";
import { setFilterDateExcel } from "../../../redux/slices/reports/excel/excel";
import moment from "moment";
import { setFilterDateProjects } from "../../../redux/slices/projects/projects";
import { setFilterDateDashboard } from "../../../redux/slices/dashboard/dashboard";

const Styles = styled.div`
  .calendar-container {
    position: relative;

    .sidebar-calendar {
      max-width: 260px;
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

      &.active {
        background: rgb(8, 84, 160);
        color: rgb(255, 255, 255);
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
        background: #354a5f;
        color: white;
      }
      .react-calendar--selectRange .react-calendar__tile--hover {
        background-color: #f8f8fa;
      }
      .react-calendar__tile--range {
        background: #b8b8b8;
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

const CalendarComponent = (props) => {
  // стейт для хранения выбранного диапазона дат
  const [date, setDate] = React.useState();
  // тогглим показ окна с календарем
  const [showCalendar, setShowCalendar] = React.useState(false);
  // достаем переменные из стейта для фильтра нужной нам страницы (у каждой страницы свой фильтр даты)
  const { filterDateHolidays } = useSelector((state) => state.holidays);
  const { filterDateNotes } = useSelector((state) => state.notes);
  const { filterDateYearSummary } = useSelector((state) => state.yearSummary);
  const { filterDateExcel } = useSelector((state) => state.excel);
  const { filterDateProjects } = useSelector((state) => state.projects);
  const { filterDateDashboard } = useSelector((state) => state.dashboard);

  const dispatch = useDispatch();

  // при изменении даты - меняем значения в Redux Store
  React.useEffect(() => {
    if (date) {
      switch (props.tab) {
        case "holidays":
          dispatch(
            setFilterDateHolidays(
              `${date[0].toLocaleDateString()}-${date[1].toLocaleDateString()}`
            )
          );
          break;
        case "notes":
          dispatch(
            setFilterDateNotes(
              `${date[0].toLocaleDateString()}-${date[1].toLocaleDateString()}`
            )
          );
          break;
        case "year_summary":
          dispatch(
            setFilterDateYearSummary(
              `${date[0].toLocaleDateString()}-${date[1].toLocaleDateString()}`
            )
          );
          break;
        case "excel":
          dispatch(
            setFilterDateExcel(
              `${date[0].toLocaleDateString()}-${date[1].toLocaleDateString()}`
            )
          );
          break;
        case "projects":
          dispatch(
            setFilterDateProjects(
              `${date[0].toLocaleDateString()}-${date[1].toLocaleDateString()}`
            )
          );
          break;
        case "dashboard":
          dispatch(
            setFilterDateDashboard(
              `${date[0].toLocaleDateString()}-${date[1].toLocaleDateString()}`
            )
          );
          break;
        default:
          return;
      }
    }
    return () => {};
  }, [date, dispatch]);

  return (
    <Styles>
      <div className="calendar-container">
        <div
          className={`sidebar-calendar ${showCalendar ? "active" : ""}`}
          onClick={() => setShowCalendar((prev) => !prev)}
        >
          <img src={CalendarImage} alt="" />
          {/* для страницы Holidays */}
          {props.tab === "holidays" ? (
            <>
              <div className="start-date" key={"holidays"}>
                {date
                  ? date[0].toLocaleDateString()
                  : filterDateHolidays.split("-")[0]}
              </div>
              <div className="finish-date">
                {date
                  ? date[1].toLocaleDateString()
                  : filterDateHolidays.split("-")[1]}
              </div>
            </>
          ) : null}
          {/* для страницы Notes */}
          {props.tab === "notes" ? (
            <>
              <div className="start-date" key={"notes"}>
                {date
                  ? date[0].toLocaleDateString()
                  : filterDateNotes.split("-")[0]}
              </div>
              <div className="finish-date">
                {date
                  ? date[1].toLocaleDateString()
                  : filterDateNotes.split("-")[1]}
              </div>
            </>
          ) : null}
          {/* для страницы YearSummary */}
          {props.tab === "year_summary" ? (
            <>
              <div className="start-date" key={"year_summary"}>
                {date
                  ? date[0].toLocaleDateString()
                  : filterDateYearSummary.split("-")[0]}
              </div>
              <div className="finish-date">
                {date
                  ? date[1].toLocaleDateString()
                  : filterDateYearSummary.split("-")[1]}
              </div>
            </>
          ) : null}
          {/* для страницы Excel */}
          {props.tab === "excel" ? (
            <>
              <div className="start-date" key={"excel"}>
                {date
                  ? date[0].toLocaleDateString()
                  : filterDateExcel.split("-")[0]}
              </div>
              <div className="finish-date">
                {date
                  ? date[1].toLocaleDateString()
                  : filterDateExcel.split("-")[1]}
              </div>
            </>
          ) : null}
          {/* для страницы Excel */}
          {props.tab === "projects" ? (
            <>
              <div className="start-date" key={"excel"}>
                {date
                  ? date[0].toLocaleDateString()
                  : filterDateProjects.split("-")[0]}
              </div>
              <div className="finish-date">
                {date
                  ? date[1].toLocaleDateString()
                  : filterDateProjects.split("-")[1]}
              </div>
            </>
          ) : null}
          {/* для страницы Dashboard */}
          {props.tab === "dashboard" ? (
            <>
              <div className="start-date" key={"excel"}>
                {date
                  ? date[0].toLocaleDateString()
                  : filterDateDashboard.split("-")[0]}
              </div>
              <div className="finish-date">
                {date
                  ? date[1].toLocaleDateString()
                  : filterDateDashboard.split("-")[1]}
              </div>
            </>
          ) : null}
        </div>
        {showCalendar && (
          <ClickAwayListener onClickAway={() => setShowCalendar(false)}>
            <div className="component-container">
              {props.tab === "notes" ? (
                <Calendar
                  onChange={setDate}
                  selectRange={true}
                  value={[
                    moment(filterDateNotes.split("-")[0]).format("YYYY-MM-DD"),
                    Array.of(
                      filterDateNotes
                        .split("-")[1]
                        .split(".")
                        .reverse()
                        .join("-")
                    ).toString(),
                  ]}
                  returnValue={"range"}
                  maxDetail={"decade"}
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
              ) : null}
              {props.tab === "dashboard" ? (
                <Calendar
                  onChange={setDate}
                  selectRange={true}
                  value={[
                    moment(filterDateDashboard.split("-")[0]).format(
                      "YYYY-MM-DD"
                    ),
                    Array.of(
                      filterDateDashboard
                        .split("-")[1]
                        .split(".")
                        .reverse()
                        .join("-")
                    ).toString(),
                  ]}
                  returnValue={"range"}
                  maxDetail={"decade"}
                  minDetail={"month"}
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
              ) : null}
              {props.tab === "year_summary" ||
              props.tab === "excel" ||
              props.tab === "holidays" ||
              props.tab === "projects" ? (
                <Calendar
                  onChange={setDate}
                  returnValue={"range"}
                  selectRange={false}
                  value={date}
                  maxDetail={"decade"}
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
              ) : null}
            </div>
          </ClickAwayListener>
        )}
      </div>
    </Styles>
  );
};

export default CalendarComponent;
