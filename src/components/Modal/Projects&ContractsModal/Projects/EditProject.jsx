import React from "react";
import styled from "styled-components";
import CalendarIcon from "../../../../assets/icon_calendar.svg";
import { useDispatch } from "react-redux";
import { editProject } from "../../../../redux/slices/projects/projectsActions";
import Select from "../../../Select/Select";

const Styles = styled.div`
  width: 100%;
  /* edit current project */
  .current_project {
    width: 100%;
    .current_project_header {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      width: 100%;

      .excel_format {
        margin-top: 20px;
        display: flex;
        justify-content: start;
        flex-direction: column;
        gap: 8px;

        select {
          background: #ffffff;
          border: 1px solid #e1e1e1;
          border-radius: 4px;
          padding: 10px;

          .excel_format {
            width: 106px;
          }
        }
      }

      .projekt_name,
      .kurze_beschreibung {
        display: flex;
        justify-content: start;
        flex-direction: column;
        gap: 8px;

        input {
          padding: 10px;
          background: #ffffff;
          border: 1px solid #e1e1e1;
          border-radius: 4px;
          outline: none;

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

            &:disabled {
              background-color: #f2f3f4;
            }
          }
        }
      }
    }
  }
`;

const EditProject = (props) => {
  const dispatch = useDispatch();

  const [state, setState] = React.useState({
    // created_at: moment(props.edit_note.created_at).format("yyy-MM-DD"),
    name: props.current_project.name,
    description: props.current_project.description,
  });

  // следим за стейтом родительской модалки (если там будет клик по кнопке "отправить" - отправляем данные на сервер)
  React.useEffect(() => {
    // если кнопка "отправить" была нажата и в стейте этого компонента есть formData, то оправляем данные
    if (props.isSubmit && state) {
      dispatch(editProject({ id: props.current_project.id, obj: state }));
      // скрываем модалку
      props.toggle();
    }
  }, [props.isSubmit]);

  console.log(props);

  return (
    <Styles>
      <div className="current_project">
        {/* current project header */}
        <div className="current_project_header">
          <div className="projekt_name">
            <label htmlFor="">Projekt</label>
            <input
              type="text"
              className="projekt_name"
              onInput={({ target: { value } }) => {
                setState((state) => ({ ...state, name: value }));
              }}
              value={state.name ? state.name : props.current_project.name}
            />
          </div>
          <div className="kurze_beschreibung">
            <label htmlFor="">Kurze beschreibung</label>
            <input
              type="text"
              className="kurze_beschreibung"
              onInput={({ target: { value } }) => {
                setState((state) => ({ ...state, description: value }));
              }}
              value={
                state.description
                  ? state.description
                  : props.current_project.description
              }
            />
          </div>
          <div className="start">
            <span>Start</span>
            <div className="start-block">
              <img src={CalendarIcon} alt="calendar icon" />
              <input
                disabled
                type="date"
                className="start"
                onInput={({ target: { value } }) => {}}
                value={props.current_project.start_date}
              />
            </div>
          </div>
          <div className="ende">
            <span>Ende</span>
            <div className="ende-block">
              <img src={CalendarIcon} alt="calendar icon" />
              <input
                disabled
                type="date"
                className="ende"
                onInput={({ target: { value } }) => {}}
                value={props.current_project.end_date}
              />
            </div>
          </div>
          <div className="excel_format">
            <label htmlFor="">Excel</label>
            <Select
              handleSelect={(value) => {
                // setState((state) => ({ ...state, excel: value }));
              }}
            />
          </div>
        </div>
      </div>
    </Styles>
  );
};

export default EditProject;
