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
    font-weight: bold;
    border: none;
  }

  .table-titles-wrapper {
    position: absolute;
    height: 51px;
    width: 100%;
    background-color: #fcfcfc;
    border-top: 1px solid #e1e1e1;
  }

  .table {
    position: relative;

    border-collapse: separate;
    border-spacing: 0 10px;

    tr {
      &.table-content {
        &.row-project {
          border: transparent;
        }
      }
    }

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
        background: white;
        border: transparent;

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

      input {
        &.check-box {
          width: 18px;
          height: 18px;
          color: yellow;

          &:checked {
            background-color: green;
          }

          &:disabled {
            fill: red;
          }
        }
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
  //стейт для установки current project
  const [currentProject, setCurrentProject] = useState(null);
  //стейт для установки current contract
  const [currentContract, setCurrentContract] = useState(null);

  // стейт модалок для project
  // создание нового проекта
  const [toggleNewProjectModal, setToggleNewProjectModal] = useState(false);
  // изменение текущего проекта
  const [toggleEditProjectModal, setToggleEditProjectModal] = useState(false);
  // просмотр всех контрактов текущего проекта
  const [toggleProjectDataModal, setToggleProjectDataModal] = useState(false);

  // стейт модалок для contracts
  // создание нового контракта
  const [toggleNewContractModal, setToggleNewContractModal] = useState(false);
  // редактирование выбранного контракта
  const [toggleCurrentContractModal, setToggleCurrentContractModal] =
    useState(false);
  // просмотр выбранного контракта текущего проекта
  const [toggleContractDataModal, setToggleContractDataModal] = useState(false);
  // удаление выбранного контракта
  const [toggleRemoveContractModal, setToggleRemoveContractModal] =
    useState(false);

  // открытие таблицы контрактов проекта
  const openProjectDetails = (e, project) => {
    if (!e.target.parentNode.parentNode.classList.contains("row-modal")) {
      setCurrentProject(project);
      setToggleProjectDataModal((prev) => !prev);
      return;
    }

    return;
  };

  // открытие таблицы контрактов проекта
  const openContractDetails = (e, contract, project) => {
    if (!e.target.parentNode.parentNode.classList.contains("row-modal")) {
      setCurrentProject(project);
      setCurrentContract(contract);
      setToggleContractDataModal((prev) => !prev);
      return;
    }

    return;
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
                <React.Fragment key={index}>
                  {/* данные о проекте */}
                  <tr
                    key={row.project}
                    className="table-content row-project"
                    onClick={(e) => openProjectDetails(e, row)}
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
                        checked={row.aktiv}
                        onChange={() => {}}
                        disabled
                      />
                    </th>
                    <th className="text-center">
                      <input
                        className="check-box"
                        name="checkbox"
                        type="checkbox"
                        checked={row.fakturierbar}
                        onChange={() => {}}
                        disabled
                      />
                    </th>
                    {/* модалка в углу строки при наведении мыши на проект */}
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
                            setCurrentProject(row);
                            setToggleEditProjectModal((prev) => !prev);
                          }}
                        />
                      </div>
                    </th>
                  </tr>
                  <tr>
                    <th className="contracts-label">Verträge</th>
                  </tr>
                  {/* контракты к проекту */}
                  {/* заранее задаем стили для каждой колонки, поскольку контент везде разный */}
                  {row.contracts.map((contract, index) => (
                    <tr
                      key={contract[0] + index}
                      className={`table-content`}
                      onClick={(e) => openContractDetails(e, contract, row)}
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
                          disabled
                          checked={contract[8]}
                          onChange={() => {}}
                        />
                      </th>
                      <th className="text-center">
                        <input
                          type="checkbox"
                          disabled
                          checked={contract[9]}
                          onChange={() => {}}
                        />
                      </th>
                      {/* модалка в углу строки при наведении мыши на контракт */}
                      <th className="row-modal">
                        <div>
                          <img
                            src={PlusIcon}
                            alt="plus icon"
                            onClick={() => {
                              setCurrentProject(row);
                              setToggleNewContractModal((prev) => !prev);
                            }}
                          />
                        </div>
                        <div>
                          <img
                            src={EditIcon}
                            alt="edit icon"
                            // при клике на контракт, устанавливаем current project, затем current contract, и потом открываем модалку
                            onClick={() => {
                              setCurrentProject(row);
                              setCurrentContract(contract);
                              setToggleCurrentContractModal((prev) => !prev);
                            }}
                          />
                        </div>
                        <div>
                          <img
                            src={TrashIcon}
                            alt="trash icon"
                            onClick={() => {
                              setCurrentProject(row);
                              setCurrentContract(contract);
                              setToggleRemoveContractModal((prev) => !prev);
                            }}
                          />
                        </div>
                      </th>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </Table>
        </Container>
      </div>
      {/* модальные окна ПРОЕКТОВ */}
      {/* создание нового ПРОЕКТА */}
      {toggleNewProjectModal && (
        <Modal
          important
          new_project
          title="Proekt erstellen"
          toggle={() => setToggleNewProjectModal(false)}
        />
      )}
      {/* редактирование CURRENT ПРОЕКТА */}
      {toggleEditProjectModal && (
        <Modal
          important
          footer_delete
          current_project={currentProject}
          title={currentProject.project}
          toggle={() => setToggleEditProjectModal(false)}
        />
      )}
      {/* список всех контрактов проекта */}
      {toggleProjectDataModal && (
        <Modal
          important
          footer_desc="Фильтр по дате не применен"
          current_project_table={currentProject}
          title={currentProject.project}
          toggle={() => setToggleProjectDataModal(false)}
        />
      )}
      {/* модальные окна КОНТРАКТОВ */}
      {/* создание нового КОНТРАКТА */}
      {toggleNewContractModal && (
        <Modal
          important
          current_project_for_new_contract={currentProject}
          title="Vertrag erstellen"
          toggle={() => setToggleNewContractModal(false)}
        />
      )}
      {/* редактирование CURRENT КОНТРАКТА */}
      {toggleCurrentContractModal && (
        <Modal
          important
          footer_delete
          current_contract={currentContract}
          current_project_disabled={currentProject}
          title={currentContract[0]}
          toggle={() => setToggleCurrentContractModal(false)}
        />
      )}
      {/* удаление CURRENT КОНТРАКТА */}
      {toggleRemoveContractModal && (
        <Modal
          remove
          remove_item={currentContract[0]}
          toggle={() => setToggleRemoveContractModal(false)}
        />
      )}
      {/* просмотреть отдельный контракт в таблице */}
      {toggleContractDataModal && (
        <Modal
          important
          footer_desc="Фильтр по дате не применен"
          current_contract_table={currentContract}
          title={currentProject.project}
          toggle={() => setToggleContractDataModal(false)}
        />
      )}
    </Styles>
  );
};

export default Contracts;
