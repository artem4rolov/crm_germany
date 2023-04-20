import React from "react";
import styled from "styled-components";

const Styles = styled.div`
  width: 100%;
  /* страница Zeiterfassung */
  /* add project TODAY */
  .remove_project_today {
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    gap: 70px;

    .buttons {
      width: 100;
      display: flex;
      justify-content: space-between;

      .decline {
        min-width: 208px;
        border: 1px solid #9fc5eb;
        border-radius: 4px;
        padding: 12px;
        color: #0854a0;
        background: #fff;

        &:hover {
          background: #f6f6f6;
        }
      }

      .remove {
        min-width: 208px;
        background: #e03333;
        border: 1px solid #e03333;
        border-radius: 4px;
        padding: 12px;
        color: #fff;

        &:hover {
          background: #ce0303;
        }
      }
    }
  }
  /* *********************************** */
`;

const RemoveItem = (props) => {
  console.log(props);

  return (
    <Styles>
      <div className="remove_project_today">
        <div>
          {/* заголовок и подзаголовок */}
          <div className="title">
            <h1>Ты уверен?</h1>
          </div>
          <div className="subtitle">
            <span>После удаления данные нельзя будет восстановить.</span>
          </div>
        </div>
        <div className="buttons">
          {/* кнопка сброса формы */}
          <input
            type="reset"
            className="decline"
            value="Abbrechen"
            onChange={() => {}}
            onClick={() => props.toggle()}
          />
          {/* кнопка отправки данных */}
          <input
            className="remove"
            value="Löschen"
            onChange={() => {}}
            type="submit"
          />
        </div>
      </div>
    </Styles>
  );
};

export default RemoveItem;
