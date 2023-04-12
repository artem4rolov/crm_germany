import React from "react";
import { Container } from "react-bootstrap";

import CalendarImage from "../../assets/icon_calendar.svg";
import SettingsImage from "../../assets/icon_setting.svg";
import styled from "styled-components";

const Styles = styled.div`
  .sidebar {
    width: 100%;
    padding: 17px 0;
    background: #fff;

    .container {
      display: flex;
      flex-direction: row;
      flex-wrap: no-wrap;
      gap: 40px;
    }
  }

  .sidebar-calendar {
    max-width: 210px;
    border: 1px solid #bebebe;
    border-radius: 4px;
    padding: 8px 10px;
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
      gap: 6px;

      input {
        width: 18px;
        height: 18px;
      }

      label {
        margin-left: 6px;
        cursor: pointer;
        font-weight: 400;
        font-size: 14px;
        line-height: 19px;
        color: #4b4e51;
      }
    }
  }
`;

const filters = [{ title: "Важные" }, { title: "Очистить пустые" }];

const SideBar = (props) => {
  return (
    <Styles>
      <div className="sidebar">
        <Container>
          <div className="sidebar-calendar">
            <img src={CalendarImage} alt="" />
            <div className="start-date">Feb 2022</div>
            <div className="finish-date">Mai 2023</div>
          </div>
          {/* если переданы настройки - рендерим их */}

          <div className="sidebar-settings">
            <img src={SettingsImage} alt="" />
          </div>

          {/* если переданы фильтры - рендерим их */}
          {filters && (
            <div className="sidebar-filters">
              {filters &&
                filters.map((filter, index) => {
                  const { title } = filter;

                  return (
                    <div className="check-block" key={index}>
                      <input type="checkbox" id={title} />
                      <label htmlFor={title}>{title}</label>
                    </div>
                  );
                })}
            </div>
          )}
          {/* если передан поиск - рендерим его */}
          {props.search && (
            <div className="sidebar-search">
              <input type="search" />
            </div>
          )}
          {/* если переданы кнопки загрузки и выгрузки - рендерим их */}
          {props.download && (
            <div className="sidebar-download">
              <span>Вагрузить</span>
              <span>Выгрузить</span>
            </div>
          )}
        </Container>
      </div>
    </Styles>
  );
};

export default SideBar;
