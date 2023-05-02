import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";

import styled from "styled-components";
import SideBar from "../../components/SideBar/SideBar";
import Modal from "../../components/Modal/Modal";
import PlusIcon from "../../assets/icon_added.svg";
import EditIcon from "../../assets/icon_edit.svg";
import TrashIcon from "../../assets/icon_trash-can.svg";

import data from "../../mock/table-projects.json";
import { useSelector } from "react-redux";
import moment from "moment/moment";

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

    .table-content {
      position: relative;

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
  { title: "Datum", classes: "col-1" },
  { title: "Projekt", classes: "col-3" },
  { title: "Von", classes: "col" },
  { title: "Bis", classes: "col" },
  { title: "Pause", classes: "col" },
  { title: "Zeit", classes: "col" },
  { title: "PT", classes: "col" },
  { title: "Tätigkeiten", classes: "col-4" },
];

const Timesheet = () => {
  // достаем переменные из стейта для фильтра праздников
  const { filterDate } = useSelector((state) => state.holidays);

  const [tableDays, setTableDays] = useState(null);

  // тогглим модалки для разных функций (добавление, редактирование, удаление)
  const [toggleAddProjectToday, setToggleAddProjectToday] = useState(false);
  const [toggleEditProjectToday, setToggleEditProjectToday] = useState(false);
  const [toggleRemoveProjectToday, setToggleRemoveProjectToday] =
    useState(false);
  //стейт для установки current project
  const [currentProject, setCurrentProject] = useState(null);

  function getRangeArray() {
    const startDay = moment(
      filterDate.split("-")[0].split(".").reverse().join("-")
    );
    const endDay = moment(
      filterDate.split("-")[1].split(".").reverse().join("-")
    );

    const calendar = [];

    const day = startDay.clone();

    while (!day.isAfter(endDay)) {
      calendar.push(day.clone());
      day.add(1, "day");
    }

    data.map((project) => {});

    setTableDays(calendar);
  }

  console.log(tableDays);
  console.log(data);

  useEffect(() => {
    getRangeArray();
  }, [filterDate]);

  return (
    <Styles>
      <div className="timesheet-wrapper">
        <SideBar
          filters={[{ title: "Важные" }, { title: "Очистить пустые" }]}
          columnTitle={columnTitle}
          search
          calendar
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
              {data.map((row, index) => (
                <tr key={index} className={`table-content`}>
                  {row.map((col, index) => (
                    <th key={index}>{col}</th>
                  ))}
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
              ))}
            </tbody>
          </Table>
        </Container>
        {/* добавить новый проект */}
        {toggleAddProjectToday && (
          <Modal
            important
            add_project_today
            title="Projekt hinzufügen"
            toggle={setToggleAddProjectToday}
          />
        )}
        {/* редактировать текущий проект */}
        {toggleEditProjectToday && (
          <Modal
            important
            edit_project_today={currentProject}
            title={currentProject[2]}
            toggle={setToggleEditProjectToday}
          />
        )}
        {/* удалить текущий проект */}
        {toggleRemoveProjectToday && (
          <Modal
            important
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
