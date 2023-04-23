import React from "react";
import styled from "styled-components";
import CalendarIcon from "../../../../assets/icon_calendar.svg";

const Styles = styled.div`
  width: 100%;
  /* страница Projecte */
  /* new project */
  .new_project {
    display: flex;
    flex-direction: column;

    .new_project-header {
      display: flex;
      justify-content: space-between;
      gap: 16px;
      padding: 38px 0;
      width: 100%;
      border-bottom: 1px solid #e1e1e1;

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

          &.project_name {
            width: 300px;
          }
          &.kurze_beschreibung {
            width: 600px;
          }
          &.start {
            width: 150px;
          }
          &.ende {
            width: 150px;
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
      gap: 16px;
      padding: 40px 0;

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
            width: 300px;
          }
          &.bezeichnung_vermittler {
            width: 260px;
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

        select {
          background: #ffffff;
          border: 1px solid #e1e1e1;
          border-radius: 4px;
          padding: 10px;
        }
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

const NewProject = () => {
  return (
    <Styles>
      <div className="new_project">
        {/* new project header */}
        <div className="new_project-header">
          <div className="project_name">
            <span htmlFor="">Project</span>
            <input type="text" className="project_name" />
          </div>
          <div className="kurze_beschreibung">
            <span htmlFor="">Kurze beschreibung</span>
            <input type="text" className="kurze_beschreibung" />
          </div>
          <div className="start">
            <span>Start</span>
            <div className="start-block">
              <img src={CalendarIcon} alt="calendar icon" />
              <input type="date" className="start" />
            </div>
          </div>
          <div className="ende">
            <span>Ende</span>
            <div className="ende-block">
              <img src={CalendarIcon} alt="calendar icon" />
              <input type="date" className="ende" />
            </div>
          </div>
        </div>
        {/* new project main */}
        <div className="new_project_main">
          <div className="vertag">
            <label htmlFor="">Vertag</label>
            <input type="text" className="vertag" />
          </div>
          <div className="bezeichnung_vermittler">
            <label htmlFor="">Bezeichnung Vermittler</label>
            <input type="text" className="bezeichnung_vermittler" />
          </div>
          <div className="bezeichnung_kunde">
            <label htmlFor="">Bezeichnung Kunde</label>
            <input type="text" className="bezeichnung_vermittler" />
          </div>
          <div className="budget">
            <label htmlFor="">Budget</label>
            <input type="text" className="budget" />
          </div>
          <div className="start">
            <span>Start</span>
            <div className="start-block">
              <img src={CalendarIcon} alt="calendar icon" />
              <input type="date" className="start" />
            </div>
          </div>
          <div className="ende">
            <span>Ende</span>
            <div className="ende-block">
              <img src={CalendarIcon} alt="calendar icon" />
              <input type="date" className="ende" />
            </div>
          </div>
        </div>
        {/* new project footer */}
        <div className="new_project_footer">
          <div className="aktiv">
            <label htmlFor="">Aktiv</label>
            <input type="checkbox" className="aktiv-check" />
          </div>
          <div className="fakturierbar">
            <label htmlFor="">Fakturierbar</label>
            <input type="checkbox" className="fakturierbar-check" />
          </div>
          <div className="excel_format">
            <label htmlFor="">Excel-Format</label>
            <select type="checkbox" className="vertag">
              <option value=".xlsx"></option>
            </select>
          </div>
        </div>
      </div>
    </Styles>
  );
};

export default NewProject;
