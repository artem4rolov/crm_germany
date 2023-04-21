import React, { useState } from "react";
import styled from "styled-components";
import SideBar from "../../components/SideBar/SideBar";
import { Container, Table } from "react-bootstrap";
import Modal from "../../components/Modal/Modal";
import PlusIconBlue from "../../assets/icon_added_blue.svg";
import EditIcon from "../../assets/icon_edit.svg";
import TrashIcon from "../../assets/icon_trash-can.svg";

import data from "../../mock/notes.json";

const Styles = styled.div`
  .notes-wrapper {
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

    .table-titles {
      position: relative;

      .add-item {
        position: absolute;
        top: 0;
        right: 0;
        cursor: pointer;
        opacity: 0.7;

        display: flex;
        justify-content: center;
        align-items: center;

        &:hover {
          opacity: 1;
        }

        img {
          width: 22px;
          height: 22px;
        }

        span {
          color: #0854a0;
          font-weight: 500;
        }
      }
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
        width: 100px;
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
  { title: "Datum", classes: "col-2" },
  { title: "Thema", classes: "col-3" },
  { title: "Inhalt", classes: "col-8" },
];

const Notes = () => {
  // тогглим модалки для разных функций (добавление, редактирование, удаление)
  const [toggleAddNote, setToggleAddNote] = useState(false);
  const [toggleEditNote, setToggleEditNote] = useState(false);
  const [toggleRemoveNote, setToggleRemoveNote] = useState(false);
  //стейт для установки current project
  const [currentNote, setCurrentNote] = useState(null);

  return (
    <Styles>
      <div className="notes-wrapper">
        <SideBar
          calendar
          columnTitle={columnTitle}
          filters={[{ title: "Важные" }]}
          addNote={() => setToggleAddNote((prev) => !prev)}
          search
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
                <th
                  className="add-item"
                  onClick={() => {
                    setToggleAddNote((prev) => !prev);
                  }}
                >
                  <img src={PlusIconBlue} alt="" />
                  <span>Anmerkung hinzufügen</span>
                </th>
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
                        src={EditIcon}
                        alt="edit icon"
                        onClick={() => {
                          setCurrentNote(row);
                          setToggleEditNote((prev) => !prev);
                        }}
                      />
                    </div>
                    <div>
                      <img
                        src={TrashIcon}
                        alt="trash icon"
                        onClick={() => {
                          setCurrentNote(row);
                          setToggleRemoveNote((prev) => !prev);
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
        {toggleAddNote && (
          <Modal
            important
            add_note
            title="Neue Notiz erstellen"
            toggle={setToggleAddNote}
          />
        )}
        {/* редактировать текущий проект */}
        {toggleEditNote && (
          <Modal
            important
            footer_delete
            edit_note={currentNote}
            title={currentNote[1]}
            toggle={setToggleEditNote}
          />
        )}
        {/* удалить текущий проект */}
        {toggleRemoveNote && (
          <Modal
            remove
            remove_item={currentNote}
            toggle={setToggleRemoveNote}
          />
        )}
      </div>
    </Styles>
  );
};

export default Notes;
