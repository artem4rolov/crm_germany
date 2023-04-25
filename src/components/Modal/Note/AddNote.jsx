import React from "react";

import CalendarIcon from "../../../assets/icon_calendar.svg";
import styled from "styled-components";

const Styles = styled.div`
  width: 100%;
  /* страница Notes */
  /* add Note */
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

const AddNote = () => {
  return (
    <Styles>
      <div className="add_note">
        {/* время вверху */}
        <div className="add_note_header">
          {/* календарь */}
          <div className="datum">
            <label>Datum</label>
            <div className="datum__content">
              <img src={CalendarIcon} alt="calendar icon" />
              <input
                type="date"
                className="start"
                name="start"
                onInput={({ target: { value } }) => {
                  // setState((state) => ({
                  //   ...state,
                  //   start: value,
                  // }));
                }}
              />
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

export default AddNote;
