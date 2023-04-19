import React from "react";
import styled from "styled-components";

const Styles = styled.div`
  width: 100%;
  /* edit current project */
  .current_project {
    width: 100%;
    .current_project_header {
      display: flex;
      justify-content: space-between;

      .projekt_name,
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

          &.projekt_name {
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
  }
`;

const EditProject = (props) => {
  console.log(props);

  return (
    <Styles>
      <div className="current_project">
        {/* current project header */}
        <div className="current_project_header">
          <div className="projekt_name">
            <label htmlFor="">Projekt</label>
            <input type="text" className="projekt_name" />
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
      </div>
    </Styles>
  );
};

export default EditProject;
