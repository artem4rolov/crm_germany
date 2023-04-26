import React, { useState } from "react";
import { Container, Table } from "react-bootstrap";
import styled from "styled-components";
import SideBar from "../../components/SideBar/SideBar";
import TrashIcon from "../../assets/icon_trash-can.svg";
import Modal from "../../components/Modal/Modal";
import data from "../../mock/holidays.json";

const Styles = styled.div`
  .holidays-wrapper {
    width: 100%;
    height: 100%;
    min-height: 100vh;
    background: #f6f6f6;
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

      tr {
        &:hover {
          background-color: white;
          border: white;
          cursor: pointer;
        }
      }

      th {
        font-weight: 400;
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
        width: 50px;
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
    }
  }
`;

const columnTitle = [
  { title: "Nr.", classes: "col" },
  { title: "Datum", classes: "col-2" },
  { title: "Feiertags", classes: "col-3" },
  { title: "Standort", classes: "col-2" },
  { title: "Kommentar", classes: "col-6" },
];
const regions = ["Alle", "BW", "HE", "RP", "RU"];

const Holidays = () => {
  //стейт для установки current project
  const [currentHoliday, setCurrentHoliday] = useState(null);

  // вызов модального окна
  const [toggleRemoveHoliday, setToggleRemoveHoliday] = useState(false);

  return (
    <Styles>
      <div className="holidays-wrapper">
        <SideBar
          calendar
          download
          columnTitle={columnTitle}
          regions={regions}
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
                  <th className="row-modal">
                    <div>
                      <img
                        src={TrashIcon}
                        alt="trash icon"
                        onClick={() => {
                          setCurrentHoliday(row);
                          setToggleRemoveHoliday((prev) => !prev);
                        }}
                      />
                    </div>
                  </th>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
        {/* удалить текущий проект */}
        {toggleRemoveHoliday && (
          <Modal
            remove
            remove_item={currentHoliday}
            toggle={setToggleRemoveHoliday}
          />
        )}
      </div>
    </Styles>
  );
};

export default Holidays;
