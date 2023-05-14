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
import { useDispatch, useSelector } from "react-redux";
import { getProjectsByFilterDate } from "../../redux/slices/projects/projectsActions";
import Loader from "../../components/Loader/Loader";

const Styles = styled.div`
  .projects-wrapper {
    width: 100%;
    height: 100%;
    min-height: 100vh;
    background: #f6f6f6;
  }

  .row-project {
    background: #e7ebf0;
    border-radius: 4px;
  }

  .projects-label {
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

const Projects = () => {
  // достаем переменные из стейта Redux для фильтра проектов
  const { loadingProjects, projects, needRefreshData, filterDateProjects } =
    useSelector((state) => state.projects);
  const dispatch = useDispatch();

  //стейт для установки current project
  const [currentProject, setCurrentProject] = useState(null);
  //стейт для установки current contract
  const [currentContract, setCurrentContract] = useState(null);

  // стейт модалок для project
  // создание нового проекта
  const [toggleNewProjectModal, setToggleNewProjectModal] = useState(false);
  // изменение текущего проекта
  const [toggleEditProjectModal, setToggleEditProjectModal] = useState(false);
  // изменение текущего проекта
  const [toggleRemoveProjectModal, setToggleRemoveProjectModal] =
    useState(false);
  // просмотр всех контрактов текущего проекта
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

  // открытие таблицы с конкретным контрактом проекта
  const openContractDetails = (e, contract, project) => {
    if (!e.target.parentNode.parentNode.classList.contains("row-modal")) {
      setCurrentProject(project);
      setCurrentContract(contract);
      setToggleContractDataModal((prev) => !prev);
      return;
    }

    return;
  };

  React.useEffect(() => {
    if (filterDateProjects) {
      dispatch(getProjectsByFilterDate(filterDateProjects));
    }

    return () => {};
  }, [filterDateProjects]);

  console.log(projects);

  return (
    <Styles>
      <div className="projects-wrapper">
        <SideBar
          calendar
          filters={[{ title: "Оплачиваемые" }, { title: "Завершенные" }]}
          columnTitle={columnTitle}
          tab={"projects"}
          addProject={() => setToggleNewProjectModal((prev) => !prev)}
        />
        <div className="table-titles-wrapper"></div>
        <Container>
          {!loadingProjects ? (
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
                {projects &&
                  projects.map((row, index) => (
                    <React.Fragment key={index}>
                      {/* данные о проекте */}
                      <tr
                        key={row.description}
                        className="table-content row-project"
                        onClick={(e) => openProjectDetails(e, row)}
                      >
                        <th>{row.name}</th>
                        <th>{row.start_date}</th>
                        <th>{row.end_date}</th>
                        <th className="text-center">{row.contracts.length}</th>
                        <th className="text-center">{row.budget_total}</th>
                        <th className="text-center">{row.budget_consumed}</th>
                        <th className="text-center">{row.budget_available}</th>
                        <th className="text-center">{row.budget_expired}</th>
                        <th className="text-center">
                          <input
                            type="checkbox"
                            checked={row.active}
                            onChange={() => {}}
                            disabled
                          />
                        </th>
                        <th className="text-center">
                          <input
                            className="check-box"
                            name="checkbox"
                            type="checkbox"
                            checked={row.billable}
                            onChange={() => {}}
                            disabled
                          />
                        </th>
                        {/* модалка в углу строки при наведении мыши на проект */}
                        <th className="row-modal project">
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
                          <div>
                            <img
                              src={TrashIcon}
                              alt="remove icon"
                              onClick={() => {
                                setCurrentProject(row);
                                setToggleRemoveProjectModal((prev) => !prev);
                              }}
                            />
                          </div>
                        </th>
                      </tr>
                      <tr>
                        <th className="projects-label">Verträge</th>
                      </tr>
                      {/* контракты к проекту */}
                      {/* заранее задаем стили для каждой колонки, поскольку контент везде разный */}
                      {row.contracts &&
                        row.contracts.map((contract, index) => (
                          <tr
                            key={contract.identifier_provider}
                            className={`table-content`}
                            onClick={(e) =>
                              openContractDetails(e, contract, row)
                            }
                          >
                            <th>{contract.name}</th>
                            <th>{contract.start_date}</th>
                            <th>{contract.end_date}</th>
                            <th className="text-center">{"???"}</th>
                            <th className="text-center">
                              {contract.budget_total}
                            </th>
                            <th className="text-center">
                              {contract.budget_consumed}
                            </th>
                            <th className="text-center">
                              {contract.budget_available}
                            </th>
                            <th className="text-center">
                              {contract.budget_expired}
                            </th>
                            <th className="text-center">
                              <input
                                type="checkbox"
                                disabled
                                checked={contract.active}
                                onChange={() => {}}
                              />
                            </th>
                            <th className="text-center">
                              <input
                                type="checkbox"
                                disabled
                                checked={contract.billable}
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
                                    setToggleCurrentContractModal(
                                      (prev) => !prev
                                    );
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
                                    setToggleRemoveContractModal(
                                      (prev) => !prev
                                    );
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
          ) : (
            <Loader big />
          )}
        </Container>
      </div>
      {/* модальные окна ПРОЕКТОВ */}
      {/* создание нового ПРОЕКТА */}
      {toggleNewProjectModal && (
        <Modal
          new_project
          title="Proekt erstellen"
          toggle={() => setToggleNewProjectModal(false)}
        />
      )}
      {/* редактирование CURRENT ПРОЕКТА */}
      {toggleEditProjectModal && (
        <Modal
          footer_delete
          current_project={currentProject}
          title={currentProject.project}
          toggle={() => setToggleEditProjectModal(false)}
        />
      )}
      {/* удаление CURRENT ПРОЕКТА */}
      {toggleRemoveProjectModal && (
        <Modal
          footer_delete
          remove_project
          current_project={currentProject}
          title={currentProject.project}
          toggle={() => setToggleRemoveProjectModal(false)}
        />
      )}
      {/* список всех контрактов проекта */}
      {toggleProjectDataModal && (
        <Modal
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
          current_project_for_new_contract={currentProject}
          title="Vertrag erstellen"
          toggle={() => setToggleNewContractModal(false)}
        />
      )}
      {/* редактирование CURRENT КОНТРАКТА */}
      {toggleCurrentContractModal && (
        <Modal
          current_contract={currentContract}
          current_project_disabled={currentProject}
          title={currentContract[0]}
          toggle={() => setToggleCurrentContractModal(false)}
        />
      )}
      {/* удаление CURRENT КОНТРАКТА */}
      {toggleRemoveContractModal && (
        <Modal
          footer_delete
          title={"REMOVE " + currentContract[0]}
          remove_current_contract={currentContract}
          toggle={() => setToggleRemoveContractModal(false)}
        />
      )}
      {/* просмотреть отдельный контракт в таблице */}
      {toggleContractDataModal && (
        <Modal
          footer_desc="Фильтр по дате не применен"
          current_contract_table={currentContract}
          title={currentProject.project}
          toggle={() => setToggleContractDataModal(false)}
        />
      )}
    </Styles>
  );
};

export default Projects;
