import React, { useState } from "react";

import CalendarIcon from "../../../assets/icon_calendar.svg";
import styled from "styled-components";
import moment from "moment/moment";
import { useDispatch } from "react-redux";
import { createNote } from "../../../redux/slices/notes/notesActions";

const Styles = styled.div`
  width: 100%;
  /* страница Notes */
  /* edit Note */
  .edit_note {
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 10px;
    padding: 20px;

    .edit_note_header {
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

    .edit_note_main {
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

const AddNote = (props) => {
  const dispatch = useDispatch();

  const [state, setState] = useState({
    // created_at: moment(props.edit_note.created_at).format("yyy-MM-DD"),
    title: "",
    content: "",
  });

  // следим за стейтом родительской модалки (если там будет клик по кнопке "отправить" - отправляем данные на сервер)
  React.useEffect(() => {
    // если кнопка "отправить" была нажата и в стейте этого компонента есть formData, то оправляем данные
    if (props.isSubmit && state) {
      dispatch(createNote({ obj: state }));
      // скрываем модалку
      props.toggle();
    }
  }, [props.isSubmit]);

  return (
    <Styles>
      <div className="edit_note">
        {/* время вверху */}
        <div className="edit_note_header">
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
                  setState((state) => ({ ...state, created_at: value }));
                }}
                value={state.created_at ? state.created_at : null}
              />
            </div>
          </div>
          {/* инпут */}
          <div className="thema">
            <label htmlFor="">Thema</label>
            <input
              type="text"
              onInput={({ target: { value } }) => {
                setState((state) => ({ ...state, title: value }));
              }}
              value={state.title ? state.title : null}
            />
          </div>
        </div>
        {/* текстовое поле */}
        <div className="edit_note_main">
          <label htmlFor="">Inhalt</label>
          <textarea
            type="text"
            onInput={({ target: { value } }) => {
              setState((state) => ({ ...state, content: value }));
            }}
            value={state.content ? state.content : null}
          />
        </div>
      </div>
    </Styles>
  );
};

export default AddNote;
