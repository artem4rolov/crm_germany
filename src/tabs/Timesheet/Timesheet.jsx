import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";

import styled from "styled-components";
import SideBar from "../../components/SideBar/SideBar";
import Modal from "../../components/Modal/Modal";
import PlusIcon from "../../assets/icon_added.svg";
import EditIcon from "../../assets/icon_edit.svg";
import TrashIcon from "../../assets/icon_trash-can.svg";

import { useDispatch, useSelector } from "react-redux";
import moment from "moment/moment";
import { getHolidaysByFilter } from "../../redux/slices/holidays/holidaysActions";
import { getContractsTimeSheet } from "../../redux/slices/timesheet/timesheetActions";
import Loader from "../../components/Loader/Loader";

const Styles = styled.div`
  .timesheet-wrapper {
    width: 100%;
    height: 100%;
    min-height: 100vh;
    background: #f6f6f6;
    position: relative;
  }

  .table-titles-wrapper {
    position: absolute;
    height: 51px;
    width: 100%;
    background-color: #fcfcfc;
    border-top: 1px solid #e1e1e1;
  }

  table {
    position: relative;

    border-collapse: separate;
    border-spacing: 0 6px;

    thead {
      border-color: #fcfcfc;
    }

    tbody {
      th {
        padding: 15px 5px;
        &.month_name {
          background-color: #4f6780;
          color: #ffffff;
          border: 1px solid #4f6780;
        }

        &.red {
          color: #db1f77;
        }
      }
    }

    .table-content {
      position: relative;

      &.holiday {
        background: #ffebeb;
        border-radius: 4px;

        font-size: 15px;
        line-height: 20px;
        color: #e03333;

        .holiday_desc {
          font-style: italic;
        }
      }

      &.weekend {
        color: #107e3e;
        background: #d3ffd3;
        border-bottom: 1px solid #99ee98;
        border-radius: 4px;
      }

      .row-modal {
        position: absolute;
        top: 0;
        right: 0;
        visibility: hidden;

        display: flex;
        justify-content: center;
        gap: 12px;

        background: #0854a0;
        width: 138px;
        padding: 8px;
        box-shadow: 0px 6px 30px rgba(147, 147, 147, 0.18);
        border-radius: 4px;

        img {
          padding: 4px;
          border-radius: 50%;
          &:hover {
            background: rgb(53, 74, 95);
          }
        }
      }

      &:hover {
        background-color: white;
        border: white;
        cursor: pointer;
        .row-modal {
          visibility: visible;
        }
      }

      &.active {
        background: white;
      }

      th {
        font-weight: 400;
      }
    }
  }
`;

const columnTitle = [
  { title: "KW", classes: "col" },
  { title: "Datum", classes: "col-2" },
  { title: "Projekt", classes: "col-3" },
  { title: "Von", classes: "col" },
  { title: "Bis", classes: "col" },
  { title: "Pause", classes: "col" },
  { title: "Zeit", classes: "col" },
  { title: "PT", classes: "col" },
  { title: "Tätigkeiten", classes: "col-4" },
];

const Timesheet = () => {
  const dispatch = useDispatch();

  // достаем переменные из стейта timesheet
  const {
    filterDateTimesheet,
    contractsTimesheet,
    loadingTimeSheet,
    filterClearEmpty,
  } = useSelector((state) => state.timesheet);
  // достаем переменные из стейта holidays
  const { holidays, needRefreshData } = useSelector((state) => state.holidays);

  // массив дней, который мы будем выводить
  const [tableDays, setTableDays] = useState(null);

  // тогглим модалки для разных функций (добавление, редактирование, удаление)
  const [toggleAddProjectToday, setToggleAddProjectToday] = useState(false);
  const [toggleEditProjectToday, setToggleEditProjectToday] = useState(false);
  const [toggleRemoveProjectToday, setToggleRemoveProjectToday] =
    useState(false);
  //стейт для установки current project
  const [currentProject, setCurrentProject] = useState(null);

  function getRangeArray() {
    if (!loadingTimeSheet) {
      // обозначаем начало и конец промежутка дат, чтобы создать массив с количеством дней выбранного диапазона
      const startDay = moment(
        filterDateTimesheet.split("-")[0].split(".").reverse().join("-")
      );
      const endDay = moment(
        filterDateTimesheet.split("-")[1].split(".").reverse().join("-")
      );

      // будущий массив из диапазона дат с объектами, в которых будут проекты или праздники
      const calendar = [];

      const day = startDay.clone();

      // если в массиве текущий день "меньше" чем конец массива выбранных дат - добавляем в массив calendar этот день, чтобы создать диапазон дат
      while (!day.isAfter(endDay)) {
        calendar.push(day.clone());
        day.add(1, "day");
      }

      // мутируем массив с датами
      calendar.map((day, index) => {
        // очищаем объект даты от ненужных ключей, оставляем только дату в формуте string (YYYY-MM-DD)
        Object.keys(day).forEach((n) => (n !== "_d" ? delete day[n] : null));
        day._d = moment(day._d).format("YYYY-MM-DD");
        // здесь же перебираем массив полученных праздников и сравниваем даты этих праздников с выбранным диапазоном дат для проектов
        holidays &&
          holidays.length > 0 &&
          holidays.map((holiday, index) => {
            if (holiday.date === day._d) {
              // если даты совпадают - отображаем праздник в текущем дне и останавливаем цикл перебора праздников
              return (day.holiday = holiday);
            } else {
              // иначе ничего не делаем
              return null;
            }
          });
        contractsTimesheet &&
          contractsTimesheet.map((contract, index) => {
            if (contract.date === day._d) {
              // если даты совпадают - отображаем праздник в текущем дне и останавливаем цикл перебора праздников
              return (day.contract = contract);
            } else {
              // иначе ничего не делаем
              return null;
            }
          });

        return day;
      });

      // console.log(calendar);
      // console.log(contractsTimesheet);
      setTableDays(calendar.reverse());
    }

    return;
  }

  // при первом рендере получаем ВСЕ праздники с  сервера
  useEffect(() => {
    const actualyYear = new Date().getFullYear();
    dispatch(
      getHolidaysByFilter({
        date: `01.01.2010-31.12.${actualyYear}`,
        region: null,
      })
    );

    return () => {};
  }, []);

  useEffect(() => {
    if (
      holidays &&
      holidays.length > 0 &&
      contractsTimesheet &&
      contractsTimesheet.length > 0
    ) {
      // строим календарь с контрактами
      getRangeArray();
    }

    return () => {};
  }, [filterDateTimesheet, holidays, contractsTimesheet]);

  useEffect(() => {
    dispatch(getContractsTimeSheet(filterDateTimesheet));

    return () => {};
  }, [filterDateTimesheet]);

  // для кнопки "очистить пустые"
  useEffect(() => {
    // if (tableDays && tableDays.length > 0) {
    //   const newArr = tableDays.filter((day, index) => day.contract && day.holiday )
    // }

    return () => {};
  }, [filterClearEmpty]);

  // console.log(currentProject);

  return (
    <Styles>
      <div className="timesheet-wrapper">
        <SideBar
          filters={[{ title: "Очистить пустые" }]}
          columnTitle={columnTitle}
          doubleCalendar
          tab={"timesheet"}
        />
        <div className="table-titles-wrapper"></div>
        <Container>
          <Table responsive>
            <thead className="table-titles">
              {/* формируем столбцы */}
              <tr>
                {columnTitle.map((item, index) => (
                  <th className={item.classes} key={index}>
                    {item.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {
                <tr key="">
                  <td colSpan={12}>{loadingTimeSheet && <Loader big />}</td>
                </tr>
              }
              {tableDays &&
                !loadingTimeSheet &&
                tableDays.map((row, index) =>
                  // если нет праздников - выводим обычный стиль для дня календаря
                  // если есть праздник - красим в красный цвет день каледнаря
                  !row.holiday ? (
                    <>
                      {/* если следующая строка имеет другой месяц И если это не первый элемент массива - рендерим сначала синюю полосу с названием нового месяца, количеством выходных и праздников */}
                      {moment(row._d).month() !==
                        moment(row._d).add(1, "day").month() && index !== 0 ? (
                        <tr>
                          <th></th>
                          <th colSpan={5} className="month_name">
                            {moment(row._d).format("MMMM")}
                          </th>
                          <th className="month_name"></th>
                          <th className="month_name">Arbeitstage: </th>
                          <th className="month_name">Feiertage: </th>
                        </tr>
                      ) : null}

                      {/* выводим дни недели с праздниками, выходными и проектами */}
                      <tr
                        key={row._d}
                        className={`table-content ${
                          moment(row._d).format("dddd") === "Samstag" ||
                          moment(row._d).format("dddd") === "Sonntag"
                            ? "weekend"
                            : ""
                        }`}
                      >
                        {/* KW (тут выводим номер недели напротив каждого воскресенья) */}
                        {console.log()}
                        <th>
                          {/* номер недели на каждом воскресенье Sonntag */}
                          {moment(row._d).format("dddd") === "Sonntag"
                            ? moment(row._d).week()
                            : null}
                        </th>
                        {/* Datum "Mon, 01.01.2001" формат "de" (немецкий) */}
                        <th className="text-left">{`${moment(row._d)
                          .format("dd")
                          .substring(0, 3)}., ${moment(row._d).format(
                          "DD.MM.YY"
                        )}`}</th>
                        {/* project */}
                        <th>
                          {row.contract && row.contract.description
                            ? row.contract.description
                            : ""}
                        </th>
                        {/* Von */}
                        <th>
                          {row.contract && row.contract.start_time
                            ? row.contract.start_time
                            : ""}
                        </th>
                        {/* Bis */}
                        <th>
                          {row.contract && row.contract.end_time
                            ? row.contract.end_time
                            : ""}
                        </th>
                        {/* Pause */}
                        <th>
                          {row.contract && row.contract.break_time
                            ? row.contract.break_time
                            : ""}
                        </th>
                        {/* Zeit */}
                        <th>
                          {row.contract && row.contract.total_time
                            ? row.contract.total_time
                            : ""}
                        </th>
                        {/* PT */}
                        <th
                          className={`${
                            row.contract && row.contract.man_day_overriden
                              ? "red"
                              : ""
                          }`}
                        >
                          {row.contract && row.contract.man_day
                            ? row.contract.man_day
                            : ""}
                        </th>
                        {/* Tätigkeiten*/}
                        <th>
                          {row.contract && row.contract.description
                            ? row.contract.description
                            : ""}
                          {row.contract && row.contract.notes ? (
                            <th className="red">
                              <br />
                              {row.contract.notes}
                            </th>
                          ) : (
                            ""
                          )}
                        </th>
                        {/* модалка в углу строки при наведении на строку */}
                        <th className="row-modal">
                          <div>
                            <img
                              src={PlusIcon}
                              alt="plus icon"
                              onClick={() =>
                                setToggleAddProjectToday((prev) => !prev)
                              }
                            />
                          </div>
                          <div>
                            <img
                              src={EditIcon}
                              alt="edit icon"
                              onClick={() => {
                                setCurrentProject(row);
                                setToggleEditProjectToday((prev) => !prev);
                              }}
                            />
                          </div>
                          <div>
                            <img
                              src={TrashIcon}
                              alt="trash icon"
                              onClick={() => {
                                setCurrentProject(row);
                                setToggleRemoveProjectToday((prev) => !prev);
                              }}
                            />
                          </div>
                        </th>
                      </tr>
                    </>
                  ) : (
                    //  если нет контрактов - выводим праздники (если есть)
                    <tr
                      key={index}
                      className={`table-content ${
                        row.holiday.public_holiday ? "holiday" : ""
                      }`}
                    >
                      {/* Номер недели напротив каждого воскресенья */}
                      <th>
                        {moment(row._d).format("dddd") === "Sonntag"
                          ? moment(row._d).week()
                          : null}
                      </th>
                      <th>{`${moment(row._d)
                        .format("dddd")
                        .substring(0, 3)}., ${moment(row._d).format(
                        "DD.MM.YY"
                      )}`}</th>
                      <th className="holiday_desc">{`${row.holiday.summary} (${row.holiday.region_aggregated})`}</th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th className="holiday_desc">
                        {row.holiday.notes_aggregated}
                      </th>
                    </tr>
                  )
                )}
            </tbody>
          </Table>
        </Container>
        {/* добавить новый проект */}
        {toggleAddProjectToday && (
          <Modal
            add_project_today
            title="Projekt hinzufügen"
            toggle={setToggleAddProjectToday}
          />
        )}
        {/* редактировать текущий проект */}
        {toggleEditProjectToday && (
          <Modal
            edit_project_today={currentProject}
            title={"Edit project"}
            toggle={setToggleEditProjectToday}
          />
        )}
        {/* удалить текущий проект */}
        {toggleRemoveProjectToday && (
          <Modal
            footer_delete
            remove_project_today={currentProject}
            title={"Remove project"}
            toggle={setToggleRemoveProjectToday}
          />
        )}
      </div>
    </Styles>
  );
};

export default Timesheet;
