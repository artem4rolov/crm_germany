import React from "react";
import styled from "styled-components";
import SideBar from "../../components/SideBar/SideBar";
import { Container, Table } from "react-bootstrap";
import data from "../../mock/table-contracts.json";

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
  { title: "Project", classes: "col-3" },
  { title: "Start", classes: "col" },
  { title: "Ende", classes: "col" },
  { title: "Anz.Vertäge", classes: "col text-center" },
  { title: "Gesamptbudget", classes: "col text-center" },
  { title: "Verbraucht", classes: "col text-center" },
  { title: "Verfügbar", classes: "col text-center" },
  { title: "Verfallen", classes: "col text-center" },
  { title: "Aktiv", classes: "col text-center" },
  { title: "Fakturierbar", classes: "col text-center" },
];

const Contracts = () => {
  const [activeRow, setActiveRow] = useState(null);
  const [toggleModal, setToggleModal] = useState(false);

  const selectContentModal = (param) => {
    setToggleModal((prev) => !prev);

    switch (param) {
      case "":
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
          columnTitle={columnTitle}
          search
        />
        <Container>
          <Table responsive>
            <thead>
              {/* формируем столбцы */}
              <tr className="table-titles">
                {columnTitle.map((item, index) => (
                  <th className={item.classes} key={index}>
                    {item.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <>
                  {/* данные о проекте */}
                  <tr
                    key={row.project}
                    className={`table-content ${
                      activeRow === row.project ? "active" : ""
                    } `}
                    onClick={() => setActiveRow(row.project)}
                  >
                    <th>{row.project}</th>
                    <th>{row.start}</th>
                    <th>{row.end}</th>
                    <th className="text-center">{row.anz}</th>
                    <th className="text-center">{row.budget}</th>
                    <th className="text-center">{row.verbraucht}</th>
                    <th className="text-center">{row.verfugbar}</th>
                    <th className="text-center">{row.verfallen}</th>
                    <th className="text-center">
                      <input
                        type="checkbox"
                        name=""
                        id=""
                        checked={row.aktiv}
                        onChange={() => {}}
                      />
                    </th>
                    <th className="text-center">
                      <input
                        type="checkbox"
                        name=""
                        id=""
                        checked={row.fakturierbar}
                        onChange={() => {}}
                      />
                    </th>
                  </tr>
                  <h3>Verträge</h3>
                  {/* контракты к проекту */}
                  {row.contracts.map((contract, index) => (
                    <tr
                      key={contract[0] + index}
                      className={`table-content ${
                        activeRow === contract[0] ? "active" : ""
                      } `}
                      onClick={() => setActiveRow(contract[0])}
                    >
                      <th>{contract[0]}</th>
                      <th>{contract[1]}</th>
                      <th>{contract[2]}</th>
                      <th className="text-center">{contract[3]}</th>
                      <th className="text-center">{contract[4]}</th>
                      <th className="text-center">{contract[5]}</th>
                      <th className="text-center">{contract[6]}</th>
                      <th className="text-center">{contract[7]}</th>
                      <th className="text-center">
                        <input
                          type="checkbox"
                          name=""
                          id=""
                          checked={contract[8]}
                          onChange={() => {}}
                        />
                      </th>
                      <th className="text-center">
                        <input
                          type="checkbox"
                          name=""
                          id=""
                          checked={contract[9]}
                          onChange={() => {}}
                        />
                      </th>
                    </tr>
                  ))}
                </>
              ))}
            </tbody>
          </Table>
        </Container>
      </div>
    </Styles>
  );
};

export default Contracts;
