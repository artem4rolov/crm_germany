import React, { useEffect, useState } from "react";
import CalendarIcon from "../../../../assets/icon_calendar.svg";
import styled from "styled-components";
import moment from "moment";
import { useDispatch } from "react-redux";
import { updateContract } from "../../../../redux/slices/projects/projectsActions";

const Styles = styled.div`
  width: 100%;

  /* страница Projecte */
  /* new contract */
  /* edit contract */
  .current_contract {
    display: flex;
    flex-direction: column;
    justify-content: start;
    gap: 40px;
    width: 100%;

    .current_contract_header {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      .bezeichnung_vermittler,
      .bezeichnung_kunde,
      .budget {
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
              background: #f2f3f4;
            }
          }
        }
      }
    }

    .current_contract_main {
      display: flex;
      justify-content: start;
      gap: 16px;
      border-bottom: 1px solid #e1e1e1;
      padding-bottom: 20px;

      .aktiv,
      .fakturierbar {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;
        justify-content: start;

        input[type="checkbox"] {
          width: 20px;
          height: 20px;
          background: #ffffff;
          border: 1.3px solid #8c8c8c;
          border-radius: 3px;
        }
      }
    }

    .current_contract_footer {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      .projekt_name,
      .kurze_beschreibung,
      .start,
      .ende {
        display: flex;
        justify-content: start;
        flex-direction: column;
        gap: 8px;

        input {
          padding: 10px;
          background: #ffffff;
          border: 1px solid #e1e1e1;
          border-radius: 4px;

          &:disabled {
            background: #f2f3f4;
          }
        }
      }
    }
  }
`;

const EditContract = (props) => {
  const dispatch = useDispatch();

  const [state, setState] = useState({
    project_id: props.current_project_disabled.id,
    identifier_provider: props.current_contract.identifier_provider,
    identifier_customer: props.current_contract.identifier_customer,
    start_date: props.current_contract.start_date,
    end_date: props.current_contract.end_date,
    budget: props.current_contract.budget,
    billable: props.current_contract.billable,
    active: props.current_contract.active,
  });

  // следим за стейтом родительской модалки (если там будет клик по кнопке "отправить" - отправляем данные на сервер)
  useEffect(() => {
    // // если кнопка "отправить" была нажата и в стейте этого компонента есть formData, то оправляем данные
    if (props.isSubmit && state) {
      dispatch(updateContract({ id: props.current_contract.id, obj: state }));
      // скрываем модалку
      props.toggle();
    }
  }, [props.isSubmit]);

  console.log(props.current_contract);

  return (
    <Styles>
      <div className="current_contract">
        {/* current_contract header */}
        <div className="current_contract_header">
          <div className="bezeichnung_vermittler">
            <label htmlFor="">Bezeichnung Vermittler</label>
            <input
              type="text"
              className="bezeichnung_vermittler"
              value={state.identifier_provider}
              onInput={({ target: { value } }) => {
                setState((state) => ({
                  ...state,
                  identifier_provider: value,
                }));
              }}
            />
          </div>
          <div className="bezeichnung_kunde">
            <label htmlFor="">Bezeichnung Kunde</label>
            <input
              type="text"
              className="bezeichnung_vermittler"
              value={state.identifier_customer}
              onInput={({ target: { value } }) => {
                setState((state) => ({
                  ...state,
                  identifier_customer: value,
                }));
              }}
            />
          </div>
          <div className="budget">
            <label htmlFor="">Budget</label>
            <input
              type="text"
              className="budget"
              value={state.budget}
              onInput={({ target: { value } }) => {
                setState((state) => ({
                  ...state,
                  budget: parseInt(value),
                }));
              }}
            />
          </div>
          <div className="start">
            <span>Start</span>
            <div className="start-block">
              <img src={CalendarIcon} alt="calendar icon" />
              <input
                type="date"
                className="start"
                value={state.start_date}
                onInput={({ target: { value } }) => {
                  setState((state) => ({
                    ...state,
                    start_date: value,
                  }));
                }}
              />
            </div>
          </div>
          <div className="ende">
            <span>Ende</span>
            <div className="ende-block">
              <img src={CalendarIcon} alt="calendar icon" />
              <input
                type="date"
                className="ende"
                value={state.end_date}
                onInput={({ target: { value } }) => {
                  setState((state) => ({
                    ...state,
                    end_date: value,
                  }));
                }}
              />
            </div>
          </div>
        </div>
        {/* current_contract main */}
        <div className="current_contract_main">
          <div className="aktiv">
            <label htmlFor="">Aktiv</label>
            <input
              type="checkbox"
              className="aktiv-check"
              checked={state.active ? true : false}
              onChange={({ target: { checked } }) => {
                setState((state) => ({
                  ...state,
                  active: checked,
                }));
              }}
            />
          </div>
          <div className="fakturierbar">
            <label htmlFor="">Fakturierbar</label>
            <input
              type="checkbox"
              className="fakturierbar-check"
              checked={state.billable ? true : false}
              onChange={({ target: { checked } }) => {
                setState((state) => ({
                  ...state,
                  billable: checked,
                }));
              }}
            />
          </div>
        </div>
        {/* current_contract footer */}
        <div className="current_contract_footer">
          <div className="projekt_name">
            <label htmlFor="">Projekt</label>
            <input
              disabled
              type="text"
              value={props.current_project_disabled.name}
              onChange={() => {}}
              className="projekt_name"
            />
          </div>
          <div className="kurze_beschreibung">
            <label htmlFor="">Kurze beschreibung</label>
            <input
              disabled
              type="text"
              className="kurze_beschreibung"
              value={props.current_project_disabled.description}
              onChange={() => {}}
            />
          </div>
          <div className="start">
            <label htmlFor="">Start</label>
            <input
              disabled
              value={moment(props.current_project_disabled.start_date).format(
                "DD.MM.YYYY"
              )}
              onChange={() => {}}
              type="text"
              className="start"
            />
          </div>
          <div className="ende">
            <label htmlFor="">Ende</label>
            <input
              disabled
              value={moment(props.current_project_disabled.end_date).format(
                "DD.MM.YYYY"
              )}
              onChange={() => {}}
              type="text"
              className="ende"
            />
          </div>
        </div>
      </div>
    </Styles>
  );
};

export default EditContract;
