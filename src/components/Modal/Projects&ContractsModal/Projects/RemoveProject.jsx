import React from "react";
import styled from "styled-components";
import CalendarIcon from "../../../../assets/icon_calendar.svg";
import { useDispatch } from "react-redux";
import { removeProject } from "../../../../redux/slices/projects/projectsActions";

const Styles = styled.div`
  width: 100%;
  /* edit current project */
  .current_project {
    width: 100%;
    .current_project_header {
      display: flex;
      justify-content: space-between;
      width: 100%;

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
          &:disabled {
            background-color: #f2f3f4;
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

const RemoveProject = (props) => {
  const dispatch = useDispatch();

  // следим за стейтом родительской модалки (если там будет клик по кнопке "отправить" - отправляем данные на сервер)
  React.useEffect(() => {
    // если кнопка "отправить" была нажата и в стейте этого компонента есть formData, то оправляем данные
    if (props.isRemove) {
      dispatch(removeProject({ id: props.remove_project.id }));
      // скрываем модалку
      props.toggle();
    }
  }, [props.isRemove]);

  console.log(props);

  return (
    <Styles>
      <div className="current_project">
        {/* current project header */}
        <div className="current_project_header">
          <div className="projekt_name">
            <label htmlFor="">Projekt</label>
            <input
              disabled
              type="text"
              value={props.remove_project.name}
              className="projekt_name"
              onChange={() => {}}
            />
          </div>
          <div className="kurze_beschreibung">
            <label htmlFor="">Kurze beschreibung</label>
            <input
              disabled
              type="text"
              value={props.remove_project.description}
              onChange={() => {}}
              className="kurze_beschreibung"
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
                value={props.remove_project.start_date}
                onChange={() => {}}
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
                value={props.remove_project.end_date}
                onChange={() => {}}
                className="ende"
              />
            </div>
          </div>
        </div>
      </div>
    </Styles>
  );
};

export default RemoveProject;
