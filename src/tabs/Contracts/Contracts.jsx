import React from "react";
import styled from "styled-components";
import SideBar from "../../components/SideBar/SideBar";
import { Container, Table } from "react-bootstrap";
import data from "../../mock/table-projects.json";

import PlusIcon from "../../assets/icon_added.svg";
import EditIcon from "../../assets/icon_edit.svg";
import TrashIcon from "../../assets/icon_trash-can.svg";
import { useState } from "react";
import Modal from "../../components/Modal/Modal";

const Styles = styled.div`
  .contracts-wrapper {
    width: 100%;
    height: 100%;
    background: #f6f6f6;
  }

  table {
    .table-titles {
      font-weight: 700;
    }

    .table-content {
      position: relative;

      .row-modal {
        position: absolute;
        top: 0;
        right: 0;

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
        cursor: pointer;
        background: #e5e5e5;
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
  { title: "KW", size: "col" },
  { title: "Datum", size: "col-1" },
  { title: "Projekt", size: "col-3" },
  { title: "Von", size: "col" },
  { title: "Bis", size: "col" },
  { title: "Pause", size: "col" },
  { title: "Zeit", size: "col" },
  { title: "PT", size: "col" },
  { title: "Tätigkeiten", size: "col-4" },
];

const Contracts = () => {
  const [activeRow, setActiveRow] = useState(null);
  const [toggleModal, setToggleModal] = useState(false);

  const selectContentModal = (param) => {
    setToggleModal((prev) => !prev);

    switch (param) {
      case null:
        return (
          toggleModal && (
            <Modal project title="Projekt hinzufügen" toggle={setToggleModal} />
          )
        );
      case 4:
        alert("В точку!");
        break;
      case 5:
        alert("Перебор");
        break;
      default:
        alert("Нет таких значений");
    }
  };

  return (
    <Styles>
      <div className="contracts-wrapper">
        <SideBar
          calendar
          filters={[
            { title: "Важные" },
            { title: "Оплачиваемые" },
            { title: "Завершенные" },
          ]}
          search
        />
        <Container>
          Contracts
          <Table responsive>
            <thead>
              <tr className="table-titles">
                {columnTitle.map((item, index) => (
                  <th className={item.size} key={index}>
                    {item.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr
                  key={index}
                  className={`table-content ${
                    activeRow === index ? "active" : ""
                  } `}
                  onClick={() => setActiveRow(index)}
                >
                  {row.map((col, index) => (
                    <th key={index}>{col}</th>
                  ))}
                  {index === activeRow ? (
                    <th className="row-modal">
                      <div>
                        <img
                          src={PlusIcon}
                          alt="plus icon"
                          onClick={() => setToggleModal((prev) => !prev)}
                        />
                      </div>
                      <div>
                        <img src={EditIcon} alt="edit icon" />
                      </div>
                      <div>
                        <img src={TrashIcon} alt="trash icon" />
                      </div>
                    </th>
                  ) : null}
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </div>
    </Styles>
  );
};

export default Contracts;
