import React from "react";

import CalendarImage from "../../../assets/icon_calendar.svg";
import ClockImage from "../../../assets/icon_time.svg";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  getContractsByDate,
  removeContractTimesheet,
} from "../../../redux/slices/timesheet/timesheetActions";
import Select from "../../Select/Select";
import moment from "moment";

const Styles = styled.div`
  width: 100%;
  padding: 10px;
  /* страница Zeiterfassung */
  /* add project TODAY */
  .edit_project_today {
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 10px;

    .inputs {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .vertrag {
        display: flex;
        flex-direction: column;
        justify-content: start;

        label {
          font-weight: 500;
          font-size: 15px;
          line-height: 21px;
          color: #32363a;
        }
        select {
          width: 100%;
          background: #ffffff;
          border: 1px solid #e1e1e1;
          border-radius: 4px;
          padding: 10px;

          &:disabled {
            background-color: #f2f3f4;
          }
        }
      }

      .project-select {
        display: flex;
        flex-direction: column;
        justify-content: start;
        label {
          font-weight: 500;
          font-size: 15px;
          line-height: 21px;
          color: #32363a;
        }
        select {
          width: 300px;
          background: #ffffff;
          border: 1px solid #e1e1e1;
          border-radius: 4px;
          padding: 10px;

          &:disabled {
            background-color: #f2f3f4;
          }
        }
      }
    }
    .textareas {
      display: flex;
      justify-content: space-between;
      gap: 16px;
      width: 100%;

      .first,
      .second {
        width: 100%;
        max-height: 140px;
        display: flex;
        flex-direction: column;
        justify-content: start;

        textarea {
          background: #ffffff;
          padding: 12px;
          border: 1px solid #e1e1e1;
          border-radius: 4px;
          font-weight: 400;
          font-size: 14px;
          line-height: 19px;
          color: #4b4e51;

          &:disabled {
            background-color: #f2f3f4;
          }
        }
      }
    }
    .time {
      width: 100%;
      display: flex;
      justify-content: start;
      align-items: center;
      gap: 16px;

      .datum,
      .von,
      .bis,
      .pause,
      .zeit {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 8px;

        font-weight: 500;
        font-size: 15px;
        line-height: 21px;
        color: #32363a;

        .datum__content,
        .von__content,
        .bis__content,
        .pause__content,
        .zeit__content {
          max-width: fit-content;
          background: #ffffff;
          border: 1px solid #e1e1e1;
          border-radius: 4px;
          display: flex;
          padding: 8px;
          input {
            border: none;
            outline: none;
            width: 100%;

            &:disabled {
              background-color: #f2f3f4;
            }
          }
        }
      }
    }
  }
  /* *********************************** */
`;

const RemoveProjectToday = (props) => {
  const dispatch = useDispatch();
  const { contractsTimeSheetDropDown } = useSelector(
    (state) => state.timesheet
  );

  // тут будут контракты для левого верхнего dorpDown
  // чтобы понять, какие даты у контракта - можно преейти на страницу Projects.jsx  и посмотреть диапазон действия того или иного контракта
  const [contractsArr, setContractsArr] = React.useState(null);

  // следим за стейтом родительской модалки (если там будет клик по кнопке "отправить" - отправляем данные на сервер)
  React.useEffect(() => {
    // если кнопка "отправить" была нажата и в стейте этого компонента есть formData, то оправляем данные
    if (props.isRemove) {
      dispatch(
        removeContractTimesheet({
          id: props.remove_project_today.id,
        })
      );
      // скрываем модалку
      props.toggle();
    }
  }, [props.isRemove]);

  // получаем контракты для dropDown (слва)
  React.useEffect(() => {
    dispatch(
      getContractsByDate(
        moment(props.remove_project_today.date).format("DD.MM.YYYY")
      )
    );
  }, []);

  // формируем массив контрактов dropDown после их получения (бюджет / использованный бюджет)
  React.useEffect(() => {
    if (contractsTimeSheetDropDown) {
      const newArr = [];
      contractsTimeSheetDropDown.forEach((contract) => {
        const { name, budget_available, budget, id } = contract;
        newArr.push({
          label: `${name} (${budget_available / budget})`,
          key: id,
        });
      });

      // console.log(newArr);

      setContractsArr(newArr);
    }
  }, [contractsTimeSheetDropDown]);

  console.log(props);

  return (
    <Styles>
      <div className="edit_project_today">
        {/* инпуты */}
        <div className="inputs">
          <div className="vertrag">
            <label className="mb-2">Vertrag</label>
            <Select
              disabled
              handleSelect={(value) => {
                // setState((state) => ({ ...state, contract_id: value }));
              }}
              titles={contractsArr ? contractsArr : ["No data"]}
              currentTitle={props.remove_project_today.contract_id}
            />
          </div>
          <div className="project-select">
            <label className="mb-2">.</label>
            <Select
              disabled
              handleSelect={(value) => {
                // setState((state) => ({ ...state, excel_template: value }));
              }}
              titles={[
                { label: "Abrechnung 1:1", key: null },
                { label: "Abrechnung mit 0.00 PT", key: 0 },
                { label: "Abrechnung mit 0.25 PT", key: 0.25 },
                { label: "Abrechnung mit 0.50 PT", key: 0.5 },
                { label: "Abrechnung mit 0.75 PT", key: 0.75 },
                { label: "Abrechnung mit 1.00 PT", key: 1 },
              ]}
              currentTitle={props.remove_project_today.man_day_override}
            />
          </div>
        </div>
        {/* поля текста textarea */}
        <div className="textareas">
          <div className="first">
            <label className="mb-2">Tätigkeiten</label>
            <textarea
              disabled
              name=""
              id=""
              cols="30"
              rows="10"
              value={props.remove_project_today.description}
            />
          </div>
          <div className="second">
            <label className="mb-2">Kommentar</label>
            <textarea
              disabled
              name=""
              id=""
              cols="30"
              rows="10"
              value={props.remove_project_today.notes}
            />
          </div>
        </div>
        {/* время внизу */}
        <div className="time">
          <div className="datum">
            <label>Datum</label>
            <div className="datum__content">
              <label htmlFor="date">
                <img src={CalendarImage} alt="calendar icon" />
              </label>
              <input
                disabled
                type="date"
                id="date"
                value={props.remove_project_today.date}
              />
            </div>
          </div>
          <div className="von">
            <label>Von</label>
            <div className="von__content">
              <img src={ClockImage} alt="von icon" />
              <input
                disabled
                type="text"
                id="date"
                value={props.remove_project_today.total_time}
                onChange={() => {}}
              />
            </div>
          </div>
          <div className="bis">
            <label>Bis</label>
            <div className="bis__content">
              <img src={ClockImage} alt="bis icon" />
              <input
                disabled
                type="text"
                id="date"
                value={props.remove_project_today.total_time}
                onChange={() => {}}
              />
            </div>
          </div>
          <div className="pause">
            <label>Pause</label>
            <div className="pause__content">
              <img src={ClockImage} alt="pause icon" />
              <input
                disabled
                type="text"
                id="date"
                value={props.remove_project_today.total_time}
                onChange={() => {}}
              />
            </div>
          </div>
          <div className="zeit">
            <label>Zeit</label>
            <div className="zeit__content">
              <img src={ClockImage} alt="zeit icon" />
              <input
                disabled
                type="text"
                id="date"
                value={props.remove_project_today.total_time}
                onChange={() => {}}
              />
            </div>
          </div>
        </div>
      </div>
    </Styles>
  );
};

export default RemoveProjectToday;
