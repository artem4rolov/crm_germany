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
    border-spacing: 0 10px;

    thead {
      border-color: #fcfcfc;
    }

    tbody {
      tr.month_name {
        background-color: #4f6780;
        color: #ffffff;
        /* border-radius: 8px; */
        width: 100%;
        border: 1px solid #4f6780;
        border-radius: 4px;

        th {
          border: 1px solid #4f6780;
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
  const { filterDateTimesheet } = useSelector((state) => state.timesheet);
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
      day.project = null;

      return day;
    });

    console.log(holidays);

    // тут что-то делаем с полученными данными (из них нужно создать список проектов и пустых дней, где нет проектов, при этом, рядом с каждым понедельником необходимо выводить номер недели конкретного года)
    // data.map((project) => {});

    setTableDays(calendar.reverse());
  }

  console.log(tableDays);

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
    if (holidays && holidays.length > 0) {
      getRangeArray();
    }
  }, [filterDateTimesheet, holidays]);

  return (
    <Styles>
      <div className="timesheet-wrapper">
        <SideBar
          filters={[{ title: "Очистить пустые" }]}
          columnTitle={columnTitle}
          search
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
              {tableDays &&
                tableDays.map((row, index) =>
                  // если нет праздников - выводим обычный стиль для дня календаря
                  // если есть праздник - красим в красный цвет день каледнаря
                  !row.holiday ? (
                    <>
                      {/* если следующая строка имеет другой месяц И если это не первый элемент массива - рендерим сначала синюю полосу с названием нового месяца, количеством выходных и праздников */}
                      {moment(row._d).month() !==
                        moment(row._d).add(1, "day").month() && index !== 0 ? (
                        <tr className="month_name">
                          <th>{moment(row._d).add(1, "day").format("MMMM")}</th>
                          <th></th>
                          <th></th>
                          <th></th>
                          <th></th>
                          <th></th>
                          <th></th>
                          <th>Arbeitstage: </th>
                          <th>Feiertage: </th>
                        </tr>
                      ) : null}

                      {/* выводим дни недели с праздниками, выходными и проектами */}
                      <tr
                        key={index}
                        className={`table-content ${
                          moment(row._d).format("dddd") === "Dienstag" ||
                          moment(row._d).format("dddd") === "Mittwoch"
                            ? "weekend"
                            : ""
                        }`}
                      >
                        {/* KW */}
                        {console.log()}
                        <th>
                          {/* номер недели на каждом понедельнике Monday */}
                          {moment(row._d).format("dddd").substring(0, 3) ===
                          "Mon"
                            ? moment(row._d).week()
                            : null}
                        </th>
                        {/* Datum "Mon, 01.01.2001" формат "de" (немецкий) */}
                        <th className="text-left">{`${moment(row._d)
                          .format("dddd")
                          .substring(0, 3)}., ${moment(row._d).format(
                          "DD.MM.YY"
                        )}`}</th>
                        {/* Project */}
                        <th>
                          {row.project && row.project.name
                            ? row.project.name
                            : ""}
                        </th>
                        {/* Von */}
                        <th>
                          {row.project && row.project.von
                            ? row.project.von
                            : ""}
                        </th>
                        {/* Bis */}
                        <th>
                          {row.project && row.project.bis
                            ? row.project.bis
                            : ""}
                        </th>
                        {/* Pause */}
                        <th>
                          {row.project && row.project.pause
                            ? row.project.pause
                            : ""}
                        </th>
                        {/* Zeit */}
                        <th>
                          {row.project && row.project.zeit
                            ? row.project.zeit
                            : ""}
                        </th>
                        {/* PT */}
                        <th>
                          {row.project && row.project.pt ? row.project.pt : ""}
                        </th>
                        {/* Tätigkeiten */}
                        <th>
                          {row.project && row.project.note
                            ? row.project.note
                            : ""}
                        </th>
                        {/* модалка в углу строки при клике на строку */}
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
                                setCurrentProject(row[2]);
                                setToggleRemoveProjectToday((prev) => !prev);
                              }}
                            />
                          </div>
                        </th>
                      </tr>
                    </>
                  ) : (
                    <tr key={index} className={`table-content holiday`}>
                      {/* Week number on every Monday */}
                      <th>
                        {moment(row._d).format("dddd").substring(0, 3) === "Mon"
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
            title={currentProject[2]}
            toggle={setToggleEditProjectToday}
          />
        )}
        {/* удалить текущий проект */}
        {toggleRemoveProjectToday && (
          <Modal
            footer_delete
            remove_project_today={currentProject}
            title={"REMOVE " + currentProject[2]}
            toggle={setToggleRemoveProjectToday}
          />
        )}
      </div>
    </Styles>
  );
};

export default Timesheet;
