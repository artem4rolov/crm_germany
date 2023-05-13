import React from "react";
import CalendarIcon from "../../../../assets/icon_calendar.svg";
import styled from "styled-components";

const Styles = styled.div`
  width: 100%;

  /* страница Projecte */
  /* new contract */
  /* edit contract */
  /* remove contract */
  .current_contract {
    display: flex;
    flex-direction: column;
    justify-content: start;
    gap: 20px;
    width: 100%;

    .current_contract_header {
      display: flex;
      justify-content: space-between;

      .vertag,
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

          &.vertag {
            width: 200px;
          }
          &.bezeichnung_vermittler {
            width: 200px;
          }
          &.bezeichnung_kunde {
            width: 200px;
          }
          &.budget {
            width: 60px;
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

    .current_contract_main {
      display: flex;
      justify-content: start;
      gap: 16px;
      border-bottom: 1px solid #e1e1e1;
      padding-bottom: 40px;

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

          &:disabled {
            background-color: #f2f3f4;
          }
        }
      }

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

        &:disabled {
          background-color: #f2f3f4;
        }
      }
    }

    .current_contract_footer {
      display: flex;
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

          &.projekt_name {
            width: 300px;
          }
          &.kurze_beschreibung {
            width: 400px;
          }
          &.start {
            width: 130px;
          }
          &.ende {
            width: 130px;
          }

          &:disabled {
            background-color: #f2f3f4;
          }
        }
      }
    }
  }
`;

const RemoveContract = (props) => {
  console.log(props);
  return (
    <Styles>
      <div className="current_contract">
        {/* current_contract header */}
        <div className="current_contract_header">
          <div className="vertag">
            <label htmlFor="">Vertag</label>
            <input type="text" disabled className="vertag" />
          </div>
          <div className="bezeichnung_vermittler">
            <label htmlFor="">Bezeichnung Vermittler</label>
            <input type="text" disabled className="bezeichnung_vermittler" />
          </div>
          <div className="bezeichnung_kunde">
            <label htmlFor="">Bezeichnung Kunde</label>
            <input type="text" disabled className="bezeichnung_vermittler" />
          </div>
          <div className="budget">
            <label htmlFor="">Budget</label>
            <input type="text" disabled className="budget" />
          </div>
          <div className="start">
            <span>Start</span>
            <div className="start-block">
              <img src={CalendarIcon} alt="calendar icon" />
              <input type="date" disabled className="start" />
            </div>
          </div>
          <div className="ende">
            <span>Ende</span>
            <div className="ende-block">
              <img src={CalendarIcon} alt="calendar icon" />
              <input type="date" disabled className="ende" />
            </div>
          </div>
        </div>
        {/* current_contract main */}
        <div className="current_contract_main">
          <div className="aktiv">
            <label htmlFor="">Aktiv</label>
            <input type="checkbox" disabled className="aktiv-check" />
          </div>
          <div className="fakturierbar">
            <label htmlFor="">Fakturierbar</label>
            <input type="checkbox" disabled className="fakturierbar-check" />
          </div>
          <div className="excel_format">
            <label htmlFor="">Excel-Format</label>
            <select type="checkbox" disabled className="vertag" />
          </div>
        </div>
        {/* current_contract footer */}
        <div className="current_contract_footer">
          <div className="projekt_name">
            <label htmlFor="">Projekt</label>
            <input
              disabled
              type="text"
              value={props.remove_current_contract.project}
              className="projekt_name"
            />
          </div>
          <div className="kurze_beschreibung">
            <label htmlFor="">Kurze beschreibung</label>
            <input disabled type="text" className="kurze_beschreibung" />
          </div>
          <div className="start">
            <label htmlFor="">Start</label>
            <input
              disabled
              value={props.remove_current_contract.start}
              type="text"
              className="start"
            />
          </div>
          <div className="ende">
            <label htmlFor="">Ende</label>
            <input
              disabled
              value={props.remove_current_contract.end}
              type="text"
              className="ende"
            />
          </div>
        </div>
      </div>
    </Styles>
  );
};

export default RemoveContract;
