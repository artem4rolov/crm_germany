import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { createProject } from "../../../../redux/slices/projects/projectsActions";
import { useDispatch } from "react-redux";
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
      flex-wrap: wrap;
      justify-content: space-between;
      width: 100%;
      border-bottom: 1px solid #e1e1e1;
      padding-bottom: 20px;

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

          .excel_format {
            width: 106px;
          }
        }
      }

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
            width: 200px;
          }
          &.kurze_beschreibung {
            width: 480px;
          }
        }
      }
    }
  }
  /* ***************************************** */
`;

const NewProject = (props) => {
  const dispatch = useDispatch();

  const [state, setState] = useState({
    excel_template: "",
    name: "",
    description: "",
  });

  // следим за стейтом родительской модалки (если там будет клик по кнопке "отправить" - отправляем данные на сервер)
  useEffect(() => {
    // если кнопка "отправить" была нажата и в стейте этого компонента есть formData, то оправляем данные
    if (props.isSubmit) {
      dispatch(createProject({ obj: state }));
      // скрываем модалку
      props.toggle();
      // console.log(state);
    }
  }, [props.isSubmit]);

  console.log(props.isSubmit);

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
                setState((state) => ({ ...state, name: value }));
              }}
            />
          </div>
          <div className="kurze_beschreibung">
            <span htmlFor="">Kurze beschreibung</span>
            <input
              type="text"
              className="kurze_beschreibung"
              onInput={({ target: { value } }) => {
                setState((state) => ({ ...state, description: value }));
              }}
            />
          </div>
          <div className="excel_format">
            <label htmlFor="">Excel</label>
            <Select
              excelTemplate={"Nothing"}
              handleSelect={(value) => {
                setState((state) => ({ ...state, excel_template: value }));
              }}
            />
          </div>
        </div>
      </div>
    </Styles>
  );
};

export default NewProject;
