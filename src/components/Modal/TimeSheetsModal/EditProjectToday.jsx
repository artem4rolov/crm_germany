import React from "react";

import CalendarIcon from "../../../assets/icon_calendar.svg";
import ClockImage from "../../../assets/icon_time.svg";
import styled from "styled-components";
import Select from "../../Select/Select";
import { useDispatch, useSelector } from "react-redux";
import { getContractsByDate } from "../../../redux/slices/timesheet/timesheetActions";
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
          }
        }

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
    }
  }
  /* *********************************** */
`;

const EditProjectToday = (props) => {
  const dispatch = useDispatch();
  const { contractsTimeSheetDropDown } = useSelector(
    (state) => state.timesheet
  );

  const [contractsArr, setContractsArr] = React.useState(null);

  console.log(props.edit_project_today);

  const [state, setState] = React.useState({
    // excel_template: props.current_project.excel_template,
    // name: props.current_project.name,
    // description: props.current_project.description,
  });

  React.useEffect(() => {
    dispatch(
      getContractsByDate(
        moment(props.edit_project_today._d).format("DD.MM.YYYY")
      )
    );
  }, []);

  React.useEffect(() => {
    if (contractsTimeSheetDropDown) {
      const newArr = [];
      contractsTimeSheetDropDown.forEach((contract) => {
        const { name, budget_available, budget } = contract;
        newArr.push(`${name} (${budget_available / budget})`);
      });

      console.log(newArr);

      setContractsArr(newArr);
    }
  }, [contractsTimeSheetDropDown]);

  return (
    <Styles>
      <div className="edit_project_today">
        {/* инпуты */}
        <div className="inputs">
          <div className="vertrag">
            <label className="mb-2">Vertrag</label>
            <Select
              handleSelect={(value) => {
                // setState((state) => ({ ...state, excel_template: value }));
              }}
              titles={contractsArr ? contractsArr : ["No data"]}
            />
          </div>
          <div className="project-select">
            <label className="mb-2">.</label>
            <Select
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
              currentTitle={props.edit_project_today.contract.man_day_override}
            />
          </div>
        </div>
        {/* поля текста textarea */}
        <div className="textareas">
          <div className="first">
            <label className="mb-2">Tätigkeiten</label>
            <textarea name="" id="" cols="30" rows="10">
              {props.edit_project_today.contract.description}
            </textarea>
          </div>
          <div className="second">
            <label className="mb-2">Kommentar</label>
            <textarea name="" id="" cols="30" rows="10">
              {props.edit_project_today.contract.notes}
            </textarea>
          </div>
        </div>
        {/* время внизу */}
        <div className="time">
          <div className="datum">
            <label>Datum</label>
            <div className="datum__content">
              <img src={CalendarIcon} alt="calendar icon" />
              <input
                type="date"
                className="start"
                value={props.edit_project_today._d}
                onInput={({ target: { value } }) => {
                  // setState((state) => ({ ...state, start: value }));
                }}
              />
            </div>
          </div>
          <div className="von">
            <label>Von</label>
            <div className="von__content">
              <img src={ClockImage} alt="von icon" />
              <input
                type="text"
                id="date"
                value={props.edit_project_today.contract.start_time}
                onChange={() => {}}
              />
            </div>
          </div>
          <div className="bis">
            <label>Bis</label>
            <div className="bis__content">
              <img src={ClockImage} alt="bis icon" />
              <input
                type="text"
                id="date"
                value={props.edit_project_today.contract.end_time}
                onChange={() => {}}
              />
            </div>
          </div>
          <div className="pause">
            <label>Pause</label>
            <div className="pause__content">
              <img src={ClockImage} alt="pause icon" />
              <input
                type="text"
                id="date"
                value={props.edit_project_today.contract.break_time}
                onChange={() => {}}
              />
            </div>
          </div>
          <div className="zeit">
            <label>Zeit</label>
            <div className="zeit__content">
              <img src={ClockImage} alt="zeit icon" />
              <input
                type="text"
                id="date"
                value={props.edit_project_today.contract.total_time}
                onChange={() => {}}
              />
            </div>
          </div>
        </div>
      </div>
    </Styles>
  );
};

export default EditProjectToday;
