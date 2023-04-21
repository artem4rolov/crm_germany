import React from "react";

import CalendarImage from "../../../assets/icon_calendar.svg";
import ClockImage from "../../../assets/icon_time.svg";
import styled from "styled-components";

const Styles = styled.div`
  width: 100%;
  /* страница Zeiterfassung */
  /* add project TODAY */
  .add_note {
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 40px;
    padding: 40px;

    .add_note_header {
      display: flex;
      justify-content: start;
      align-items: center;
      gap: 16px;

      .datum {
        display: flex;
        flex-direction: column;
        gap: 8px;

        font-weight: 500;
        font-size: 15px;
        line-height: 21px;
        color: #32363a;

        .datum__content {
          max-width: 206px;
          background: #ffffff;
          border: 1px solid #e1e1e1;
          border-radius: 4px;
          display: flex;
          padding: 8px;
          input {
            border: none;
            outline: none;
            width: 100%;
          }
        }
      }

      .thema {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: start;
        gap: 8px;

        font-weight: 500;
        font-size: 15px;
        line-height: 21px;
        color: #32363a;

        input {
          background: #ffffff;
          border: 1px solid #e1e1e1;
          border-radius: 4px;
          padding: 8px;
          outline: none;
          width: 100%;
        }
      }
    }

    .add_note_main {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: start;
      gap: 8px;

      textarea {
        width: 100%;
        height: 175px;
        padding: 8px;

        border: 1px solid #e1e1e1;
        border-radius: 4px;
        outline: none;

        font-weight: 500;
        font-size: 15px;
        line-height: 21px;
        color: #32363a;
      }
    }
  }
  /* *********************************** */
`;

const EditNote = (props) => {
  return (
    <Styles>
      <div className="add_note">
        {/* время вверху */}
        <div className="add_note_header">
          {/* календарь */}
          <div className="datum">
            <label>Datum</label>
            <div className="datum__content">
              <label htmlFor="date">
                <img src={CalendarImage} alt="calendar icon" />
              </label>
              <input type="date" id="date" />
            </div>
          </div>
          {/* инпут */}
          <div className="thema">
            <label htmlFor="">Thema</label>
            <input type="text" />
          </div>
        </div>
        {/* текстовое поле */}
        <div className="add_note_main">
          <label htmlFor="">Inhalt</label>
          <textarea type="text" />
        </div>
      </div>
    </Styles>
  );
};

export default EditNote;
