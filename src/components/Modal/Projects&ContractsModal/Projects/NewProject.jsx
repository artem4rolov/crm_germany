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

    .new_project_main {
      display: flex;
      justify-content: space-between;
      padding: 20px 0;

      .vertag,
      .bezeichnung_vermittler,
      .bezeichnung_kunde,
      .budget {
        display: flex;
        justify-content: start;
        flex-direction: column;
        gap: 8px;

        input {
          padding: 10px;
          background: #ffffff;
          border: 1px solid #e1e1e1;
          border-radius: 4px;

          &.vertag {
            width: 240px;
          }
          &.bezeichnung_vermittler {
            width: 200px;
          }
          &.bezeichnung_kunde {
            width: 250px;
          }
          &.budget {
            width: 60px;
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

    .new_project_footer {
      display: flex;
      justify-content: start;
      gap: 16px;

      .excel_format {
        display: flex;
        justify-content: start;
        flex-direction: column;
        gap: 8px;
      }

      .aktiv,
      .fakturierbar {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;
        justify-content: start;

        input[type="checkbox"] {
          width: 20px;
          height: 20px;
          background: #ffffff;
          border: 1.3px solid #8c8c8c;
          border-radius: 3px;
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
        {/* new project main */}
        <div className="new_project_main">
          <div className="vertag">
            <label htmlFor="">Vertag</label>
            <input
              type="text"
              className="vertag"
              onInput={({ target: { value } }) => {
                setState((state) => ({ ...state, vertag: value }));
              }}
            />
          </div>
          <div className="bezeichnung_vermittler">
            <label htmlFor="">Bezeichnung Vermittler</label>
            <input
              type="text"
              className="bezeichnung_vermittler"
              onInput={({ target: { value } }) => {
                setState((state) => ({
                  ...state,
                  bezeichnung_vermittler: value,
                }));
              }}
            />
          </div>
          <div className="bezeichnung_kunde">
            <label htmlFor="">Bezeichnung Kunde</label>
            <input
              type="text"
              className="bezeichnung_vermittler"
              onInput={({ target: { value } }) => {
                setState((state) => ({
                  ...state,
                  bezeichnung_kunde: value,
                }));
              }}
            />
          </div>
          <div className="budget">
            <label htmlFor="">Budget</label>
            <input
              type="text"
              className="budget"
              onInput={({ target: { value } }) => {
                setState((state) => ({
                  ...state,
                  budget: value,
                }));
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
                  setState((state) => ({
                    ...state,
                    startVertag: value,
                  }));
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
                  setState((state) => ({
                    ...state,
                    endeVertag: value,
                  }));
                }}
              />
            </div>
          </div>
        </div>
        {/* new project footer */}
        <div className="new_project_footer">
          <div className="aktiv">
            <label htmlFor="">Aktiv</label>
            <input
              type="checkbox"
              className="aktiv-check"
              onInput={({ target: { checked } }) => {
                setState((state) => ({
                  ...state,
                  aktiv: checked,
                }));
              }}
            />
          </div>
          <div className="fakturierbar">
            <label htmlFor="">Fakturierbar</label>
            <input
              type="checkbox"
              className="fakturierbar-check"
              onInput={({ target: { checked } }) => {
                setState((state) => ({
                  ...state,
                  fakturierbar: checked,
                }));
              }}
            />
          </div>
          <div className="excel_format ">
            <label htmlFor="">Excel</label>
            <Select
              handleSelect={(value) => {
                setState((state) => ({ ...state, excel: value }));
              }}
            />
          </div>
        </div>
      </div>
    </Styles>
  );
};

export default NewProject;
