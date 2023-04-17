import React from "react";
import styled from "styled-components";

const Styles = styled.div`
  width: 100%;
  /* страница Projecte */
  /* new project */
  .new_project {
    display: flex;
    flex-direction: column;

    .new_project-header {
      display: flex;
      gap: 16px;
      padding: 48px 0;
      border-bottom: 1px solid #e1e1e1;

      .project_name,
      .kurze_beschreibung,
      .start,
      .ende {
        display: flex;
        justify-content: start;
        flex-direction: column;
        gap: 8px;

        input {
          padding: 10px;
          background: #ffffff;
          border: 1px solid #e1e1e1;
          border-radius: 4px;

          &.project_name {
            width: 300px;
          }
          &.kurze_beschreibung {
            width: 700px;
          }
          &.start {
            width: 100px;
          }
          &.ende {
            width: 100px;
          }
        }
      }
    }

    .new_project_main {
      display: flex;
      justify-content: space-between;
      padding: 40px 0;

      .vertag,
      .bezeichnung_vermittler,
      .bezeichnung_kunde,
      .budget,
      .start,
      .ende {
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
            width: 300px;
          }
          &.bezeichnung_kunde {
            width: 300px;
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
    }

    .new_project_footer {
      display: flex;
      justify-content: start;
      gap: 16px;

      .aktiv,
      .fakturierbar,
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
            <label htmlFor="">Project</label>
            <input type="text" className="project_name" />
          </div>
          <div className="kurze_beschreibung">
            <label htmlFor="">Kurze beschreibung</label>
            <input type="text" className="kurze_beschreibung" />
          </div>
          <div className="start">
            <label htmlFor="">Start</label>
            <input type="date" className="start" />
          </div>
          <div className="ende">
            <label htmlFor="">Ende</label>
            <input type="date" className="ende" />
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
            <label htmlFor="">Start</label>
            <input type="date" className="start" />
          </div>
          <div className="ende">
            <label htmlFor="">Ende</label>
            <input type="date" className="ende" />
          </div>
        </div>
        {/* new project footer */}
        <div className="new_project_footer">
          <div className="aktiv">
            <label htmlFor="">Aktiv</label>
            <input type="checkbox" className="vertag" />
          </div>
          <div className="fakturierbar">
            <label htmlFor="">Fakturierbar</label>
            <input type="checkbox" className="vertag" />
          </div>
          <div className="excel_format">
            <label htmlFor="">Excel-Format</label>
            <select type="checkbox" className="vertag" />
          </div>
        </div>
      </div>
    </Styles>
  );
};

export default NewProject;
