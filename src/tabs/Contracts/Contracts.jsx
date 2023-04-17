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

  .row-project {
    background: #e7ebf0;
    border-radius: 4px;
  }

  .contracts-label {
    font-weight: 500;
  }

  table {
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

        &.project {
          width: 100px;
        }

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

  //стейт для установки current project
  const [currentProject, setCurrentProject] = useState(null);

  // стейт модалок для project
  const [toggleNewProjectModal, setToggleNewProjectModal] = useState(false);
  const [toggleCurrentProjectModal, setToggleCurrentProjectModal] =
    useState(false);
  const [toggleProjectDataModal, setToggleProjectDataModal] = useState(false);
  // стейт модалок для contracts
  const [toggleNewContractModal, setToggleNewContractModal] = useState(false);
  const [toggleCurrentContractModal, setToggleCurrentContractModal] =
    useState(false);
  const [toggleRemoveContractModal, setToggleRemoveContractModal] =
    useState(false);

  const selectProjectData = (project) => {
    setCurrentProject(project);
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
                <React.Fragment key={index}>
                  {/* данные о проекте */}
                  <tr
                    key={row.project}
                    className={`table-content row-project ${
                      activeRow === row.project ? "active" : ""
                    } `}
                    onClick={() => setActiveRow(row.project)}
                    onDoubleClick={() => {
                      setToggleProjectDataModal((prev) => !prev);
                      selectProjectData(row);
                    }}
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
                    {/* модалка в углу строки при клике на проект */}
                    {row.project === activeRow ? (
                      <th className="row-modal project">
                        <div>
                          <img
                            src={PlusIcon}
                            alt="plus icon"
                            onClick={() =>
                              setToggleNewProjectModal((prev) => !prev)
                            }
                          />
                        </div>
                        <div>
                          <img
                            src={EditIcon}
                            alt="edit icon"
                            onClick={() => {
                              setToggleCurrentProjectModal((prev) => !prev);
                              selectProjectData(row);
                            }}
                          />
                        </div>
                      </th>
                    ) : null}
                  </tr>
                  <tr>
                    <th className="contracts-label">Verträge</th>
                  </tr>
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
                      {/* модалка в углу строки при клике на контракт */}
                      {contract[0] === activeRow ? (
                        <th className="row-modal">
                          <div>
                            <img
                              src={PlusIcon}
                              alt="plus icon"
                              onClick={() => {}}
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
                </React.Fragment>
              ))}
            </tbody>
          </Table>
        </Container>
      </div>
      {/* модальные окна */}
      {toggleNewProjectModal && (
        <Modal
          new_project
          title="new"
          toggle={() => setToggleNewProjectModal(false)}
        />
      )}
      {toggleCurrentProjectModal && (
        <Modal
          current_project={currentProject}
          title="current"
          toggle={() => setToggleCurrentProjectModal(false)}
        />
      )}
      {/* двойной клик по проекту */}
      {toggleProjectDataModal && (
        <Modal
          current_project_data={currentProject}
          title="current_data"
          toggle={() => setToggleProjectDataModal(false)}
        />
      )}
    </Styles>
  );
};

export default Contracts;
