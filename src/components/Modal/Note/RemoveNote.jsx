import React from "react";

import CalendarIcon from "../../../assets/icon_calendar.svg";
import styled from "styled-components";

const Styles = styled.div`
  width: 100%;
  /* страница Notes */
  /* edit Note */
  .remove_note {
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 40px;
    padding: 40px;

    .remove_note_header {
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

            &:disabled {
              background-color: #f2f3f4;
            }

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

          &:disabled {
            background-color: #f2f3f4;
          }
        }
      }
    }

    .remove_note_main {
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

        &:disabled {
          background-color: #f2f3f4;
        }
      }
    }
  }
  /* *********************************** */
`;

const RemoveNote = (props) => {
  return (
    <Styles>
      <div className="remove_note">
        {/* время вверху */}
        <div className="remove_note_header">
          {/* календарь */}
          <div className="datum">
            <label>Datum</label>
            <div className="datum__content">
              <img src={CalendarIcon} alt="calendar icon" />
              <input
                disabled
                type="date"
                className="start"
                name="start"
                onInput={({ target: { value } }) => {
                  // setState((state) => ({
                  //   ...state,
                  //   start: value,
                  // }));
                }}
                value={new Date(props.created_at).toLocaleString("ru", {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                })}
              />
            </div>
          </div>
          {/* инпут */}
          <div className="thema">
            <label htmlFor="">Thema</label>
            <input type="text" disabled value={props.title} />
          </div>
        </div>
        {/* текстовое поле */}
        <div className="remove_note_main">
          <label htmlFor="">Inhalt</label>
          <textarea type="text" disabled value={props.content} />
        </div>
      </div>
    </Styles>
  );
};

export default RemoveNote;
