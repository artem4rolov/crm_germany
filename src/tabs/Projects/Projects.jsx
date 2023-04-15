import React, { useState } from "react";
import { Container, Table } from "react-bootstrap";

import styled from "styled-components";
import SideBar from "../../components/SideBar/SideBar";
import Modal from "../../components/Modal/Modal";
import PlusIcon from "../../assets/icon_added.svg";
import EditIcon from "../../assets/icon_edit.svg";
import TrashIcon from "../../assets/icon_trash-can.svg";

import data from "../../mock/table-projects.json";

const Styles = styled.div`
  .projects-wrapper {
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

const Projects = () => {
  const [activeRow, setActiveRow] = useState(null);
  const [toggleModal, setToggleModal] = useState(false);

  return (
    <Styles>
      <div className="projects-wrapper">
        <SideBar
          filters={[{ title: "Важные" }, { title: "Очистить пустые" }]}
          columnTitle={columnTitle}
          search
        />
        <Container>
          <Table responsive>
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
                  {/* модалка в углу строки при клике на строку */}
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
        {toggleModal && (
          <Modal
            important
            add_project_today
            title="Projekt hinzufügen"
            toggle={setToggleModal}
          />
        )}
      </div>
    </Styles>
  );
};

export default Projects;
