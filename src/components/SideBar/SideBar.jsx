import React from "react";
import { Container, Table } from "react-bootstrap";

import SearchImage from "../../assets/icon_search.svg";
import styled from "styled-components";
import { useState } from "react";
import { useEffect } from "react";
import PlusIconBlue from "../../assets/icon_added_blue.svg";

import Regions from "./Regions/Regions";
import CalendarComponent from "./CalendarComponent/CalendarComponent";
import UploadDownload from "./UploadDownload/UploadDownload";
import DoubleCalendarComponent from "./DoubleCalendarComponent/DoubleCalendarComponent";
import CheckBoxFilters from "./CheckBoxFilters/CheckBoxFilters";
import SettingsDashboard from "./SettingsDashboard/SettingsDashboard";

const Styles = styled.div`
  tbody,
  td,
  tfoot,
  th,
  thead,
  tr {
    border: none;
  }

  .add-item {
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

  .table {
    margin-bottom: 0;

    .table-titles {
      td {
        padding-left: 10px;
      }

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
  }

  .sidebar {
    width: 100%;
    background: #fcfcfc;

    .hidden {
      display: none;

      &.sticky-nav {
        display: block;

        &.side-bar-titles {
          border-top: 1px solid #e1e1e1;
        }
      }
    }

    .sidebar-table-title {
      border-top: 1px solid #e1e1e1;
    }

    .container {
      .sidebar-top {
        padding: 15px 0;
        display: flex;
        justify-content: space-between;

        .sidebar-left {
          display: flex;
          gap: 30px;
        }
      }
    }

    &.sticky-nav {
      top: 0;
      position: fixed;
      z-index: 1;
    }
  }

  .sidebar-filters {
    display: flex;
    align-items: center;
    gap: 24px;

    .check-block {
      display: flex;
      align-items: center;
      gap: 3px;

      input {
        width: 18px;
        height: 18px;
        border-radius: 3px;
      }

      label {
        margin-left: 3px;
        cursor: pointer;
        font-weight: 400;
        font-size: 14px;
        line-height: 19px;
        color: #4b4e51;
      }
    }
  }

  .sidebar-search {
    border: 1px solid #bebebe;
    border-radius: 4px;
    height: 40px;
    padding: 10px;
    width: 450px;
    display: flex;
    justify-content: start;
    align-items: center;

    input {
      border: none;
      width: 400px;
      outline: none;

      &:focus {
        border: none;
      }

      &:active {
        border: none;
      }
    }
  }
`;

const SideBar = (props) => {
  // стейт для закрепления сайд-бара наверху
  const [stickyClass, setStickyClass] = useState("relative");

  // функция для закрпеления сайдбара наверху
  const stickNavbar = () => {
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      windowHeight > 100 ? setStickyClass("sticky-nav") : setStickyClass("");
    }
  };

  // следим за скроллом
  useEffect(() => {
    window.addEventListener("scroll", stickNavbar);

    return () => {
      window.removeEventListener("scroll", stickNavbar);
    };
  }, []);

  return (
    <Styles>
      <div className={`sidebar ${stickyClass}`}>
        <Container>
          <div className="sidebar-top">
            <div className="sidebar-left">
              {/* для страницы с праздниками и проектами выводим двойной календарь (независимый), для остальных обычный календарь */}
              {!props.doubleCalendar ? (
                <CalendarComponent tab={props.tab} />
              ) : (
                <DoubleCalendarComponent tab={props.tab} />
              )}

              {/* если переданы настройки - рендерим их */}
              {props.settings && <SettingsDashboard />}

              {/* если переданы фильтры (чекбоксы) - рендерим их */}
              {props.filters && <CheckBoxFilters {...props} />}

              {/* если переданы фильтры (регионы) - рендерим их */}
              {props.regions && <Regions />}
            </div>

            {/* если переданы кнопки загрузки и выгрузки - рендерим их */}
            {props.download && <UploadDownload />}

            {/* если передан пропс для добавления item'а, рендерим его */}
            {props.addProject && (
              <th
                className="add-item"
                onClick={() => {
                  props.addProject();
                }}
              >
                <img src={PlusIconBlue} alt="" />
                <span>add project</span>
              </th>
            )}

            {/* если передан поиск - рендерим его */}
            {props.search && (
              <div className="sidebar-search">
                <img src={SearchImage} alt="search icon" />
                <input
                  type="text"
                  className="search-input"
                  placeholder="Введи название проекта, контракта или праздника"
                />
              </div>
            )}
          </div>
        </Container>
        {/* заголовки для каждой отдельной таблицы */}
        {props.columnTitle && (
          <div className={`hidden ${stickyClass} side-bar-titles`}>
            <Container>
              <Table responsive>
                <thead>
                  {/* если в столбцах есть таблица в таблице, рендерим сложную структуру, если нет - простую */}
                  {props.tableInTable ? (
                    <tr className="table-titles">
                      {props.columnTitle.map((item, index) => (
                        <td className={item.classes} key={index}>
                          {item.title}
                          {item.subtitles && (
                            <Table className="title-month">
                              {item.subtitles
                                ? item.subtitles.map((month, idex) => (
                                    <td key={month}>{month}</td>
                                  ))
                                : null}
                            </Table>
                          )}
                        </td>
                      ))}
                    </tr>
                  ) : (
                    <tr className="table-titles">
                      {props &&
                        props.columnTitle.map((item, index) => (
                          <th className={item.classes} key={index}>
                            {item.title}
                          </th>
                        ))}
                      {props.addNote && (
                        <th
                          className="add-item"
                          onClick={() => {
                            props.addNote();
                          }}
                        >
                          <img src={PlusIconBlue} alt="" />
                          <span>Anmerkung hinzufügen</span>
                        </th>
                      )}
                    </tr>
                  )}
                </thead>
              </Table>
            </Container>
          </div>
        )}
      </div>
    </Styles>
  );
};

export default SideBar;
