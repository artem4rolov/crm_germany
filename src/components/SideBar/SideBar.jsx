import React from "react";
import { Container, Table } from "react-bootstrap";

import CalendarImage from "../../assets/icon_calendar.svg";
import SettingsImage from "../../assets/icon_setting.svg";
import SearchImage from "../../assets/icon_search.svg";
import ImportImage from "../../assets/icon_download.svg";
import ExportImage from "../../assets/icon_upload.svg";
import styled from "styled-components";
import { useState } from "react";
import { useEffect } from "react";

const Styles = styled.div`
  tbody,
  td,
  tfoot,
  th,
  thead,
  tr {
    border: none;
  }

  .table {
    margin-bottom: 0;
  }

  .sidebar {
    width: 100%;
    background: #fff;

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

  .sidebar-calendar {
    max-width: 210px;
    height: 40px;
    border: 1px solid #bebebe;
    border-radius: 4px;
    padding: 2px 10px;
    cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;

    &:hover {
      border: 1px solid #354a5f;
    }

    &:actvie {
      border: 1px solid #351a50;
    }

    .start-date {
      border-right: 1px solid gray;
      padding-right: 10px;
    }

    .finish-date {
      margin-left: 5px;
    }
  }

  .sidebar-settings {
    width: 40px;
    height: 40px;
    border: 1px solid #bebebe;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    padding: 8px;
    cursor: pointer;

    &:hover {
      border: 1px solid #354a5f;
    }

    &:actvie {
      border: 1px solid #351a50;
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

  .sidebar-download {
    display: flex;
    align-items: center;
    gap: 4px;

    .import,
    .export {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 6px;
      cursor: pointer;

      font-weight: 400;
      font-size: 14px;
      line-height: 19px;
      color: #676767;

      &:hover {
        border-bottom: 1px solid #354a5f;
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
      windowHeight > 60 ? setStickyClass("sticky-nav") : setStickyClass("");
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
              <div className="sidebar-calendar">
                <img src={CalendarImage} alt="" />
                <div className="start-date">Feb 2022</div>
                <div className="finish-date">Mai 2023</div>
              </div>

              {/* если переданы настройки - рендерим их */}
              {props.settings && (
                <div className="sidebar-settings">
                  <img src={SettingsImage} alt="" />
                </div>
              )}

              {/* если переданы фильтры - рендерим их */}
              {props.filters && (
                <div className="sidebar-filters">
                  {props.filters.map((filter, index) => {
                    const { title } = filter;

                    return (
                      <div className="check-block" key={index}>
                        <input
                          type="checkbox"
                          className="check-box"
                          id={title}
                        />
                        <label htmlFor={title}>{title}</label>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            {/* если переданы кнопки загрузки и выгрузки - рендерим их */}
            {props.download && (
              <div className="sidebar-download">
                <div className="import">
                  <img src={ImportImage} alt="import icon" />
                  <span>Загрузить</span>
                </div>
                <div className="export">
                  <img src={ExportImage} alt="export icon" />
                  <span>Выгрузить</span>
                </div>
              </div>
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
                  <tr className="table-titles">
                    {props &&
                      props.columnTitle.map((item, index) => (
                        <th className={item.classes} key={index}>
                          {item.title}
                          {item.subtitles &&
                            item.subtitles.map((subtitle, index) => (
                              <th>{subtitle}</th>
                            ))}
                        </th>
                      ))}
                  </tr>
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
