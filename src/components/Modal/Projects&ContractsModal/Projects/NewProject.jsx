import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CalendarIcon from "../../../../assets/icon_calendar.svg";
import Select from "../../../Select/Select";

const Styles = styled.div`
  width: 100%;
  padding: 10px;
  /* страница Projecte */
  /* new project */
  .new_project {
    display: flex;
    flex-direction: column;

    .new_project-header {
      display: flex;
      justify-content: space-between;
      width: 100%;
      border-bottom: 1px solid #e1e1e1;
      padding-bottom: 20px;

      .project_name,
      .kurze_beschreibung {
        display: flex;
        justify-content: start;
        flex-direction: column;
        gap: 8px;

        input {
          padding: 10px;
          background: #ffffff;
          outline: none;
          border: 1px solid #e1e1e1;
          border-radius: 4px;

          &.projekt_name {
            width: 180px;
          }
          &.kurze_beschreibung {
            width: 480px;
          }
          &.start {
            width: 100px;
          }
          &.ende {
            width: 100px;
          }
        }
      }

      .start,
      .ende {
        display: flex;
        justify-content: start;
        flex-direction: column;
        gap: 8px;

        .start-block,
        .ende-block {
          display: flex;
          justify-content: start;
          align-items: center;
          position: relative;

          padding: 10px 5px;
          background: #ffffff;
          outline: none;
          border: 1px solid #e1e1e1;
          border-radius: 4px;

          img {
            position: absolute;
            width: 24px;
            height: 24px;

            &:hover {
              background: #000;
            }
          }

          input {
            text-align: right;
            position: relative;
            outline: none;
            border: none;
            background: transparent;
            padding-right: 5px;

            ::-webkit-calendar-picker-indicator {
              cursor: pointer;
              position: absolute;
              top: 0;
              left: 0;
              z-index: 10;
              background: transparent;
            }
          }
        }
      }
    }
  }
  /* ***************************************** */
`;

const NewProject = (props) => {
  const [state, setState] = useState(null);

  // следим за изменением стейта, и при малейшем изменении - передаем данные в компонент Modal, для дальнейшей отправки на сервер
  useEffect(() => {
    // props.setData(state);
  }, [state]);

  return (
    <Styles>
      <div className="new_project">
        {/* new project header */}
        <div className="new_project-header">
          <div className="project_name">
            <span htmlFor="">Project</span>
            <input
              type="text"
              className="project_name"
              onInput={({ target: { value } }) => {
                setState((state) => ({ ...state, project_name: value }));
              }}
            />
          </div>
          <div className="kurze_beschreibung">
            <span htmlFor="">Kurze beschreibung</span>
            <input
              type="text"
              className="kurze_beschreibung"
              onInput={({ target: { value } }) => {
                setState((state) => ({ ...state, kurze_beschreibung: value }));
              }}
            />
          </div>
          <div className="start">
            <span>Start</span>
            <div className="start-block">
              <img src={CalendarIcon} alt="calendar icon" />
              <input
                type="date"
                className="start"
                onInput={({ target: { value } }) => {
                  setState((state) => ({ ...state, start: value }));
                }}
              />
            </div>
          </div>
          <div className="ende">
            <span>Ende</span>
            <div className="ende-block">
              <img src={CalendarIcon} alt="calendar icon" />
              <input
                type="date"
                className="ende"
                onInput={({ target: { value } }) => {
                  setState((state) => ({ ...state, ende: value }));
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </Styles>
  );
};

export default NewProject;
