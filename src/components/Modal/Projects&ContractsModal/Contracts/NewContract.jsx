import React from "react";
import styled from "styled-components";

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
      justify-content: space-between;

      .vertag,
      .bezeichnung_vermittler,
      .bezeichnung_kunde,
      .budget,
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

          &.vertag {
            width: 300px;
          }
          &.bezeichnung_vermittler {
            width: 300px;
          }
          &.bezeichnung_kunde {
            width: 300px;
          }
          &.budget {
            width: 60px;
          }
          &.start {
            width: 100px;
          }
          &.ende {
            width: 100px;
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

      .aktiv,
      .fakturierbar,
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
            width: 700px;
          }
          &.start {
            width: 100px;
          }
          &.ende {
            width: 100px;
          }

          &:disabled {
            background: #f2f3f4;
          }
        }
      }
    }
  }
`;

const NewContract = (props) => {
  return (
    <Styles>
      <div className="current_contract">
        {/* current_contract header */}
        <div className="current_contract_header">
          <div className="vertag">
            <label htmlFor="">Vertag</label>
            <input type="text" className="vertag" />
          </div>
          <div className="bezeichnung_vermittler">
            <label htmlFor="">Bezeichnung Vermittler</label>
            <input type="text" className="bezeichnung_vermittler" />
          </div>
          <div className="bezeichnung_kunde">
            <label htmlFor="">Bezeichnung Kunde</label>
            <input type="text" className="bezeichnung_vermittler" />
          </div>
          <div className="budget">
            <label htmlFor="">Budget</label>
            <input type="text" className="budget" />
          </div>
          <div className="start">
            <label htmlFor="">Start</label>
            <input type="date" className="start" />
          </div>
          <div className="ende">
            <label htmlFor="">Ende</label>
            <input type="date" className="ende" />
          </div>
        </div>
        {/* current_contract main */}
        <div className="current_contract_main">
          <div className="aktiv">
            <label htmlFor="">Aktiv</label>
            <input type="checkbox" className="vertag" />
          </div>
          <div className="fakturierbar">
            <label htmlFor="">Fakturierbar</label>
            <input type="checkbox" className="vertag" />
          </div>
          <div className="excel_format">
            <label htmlFor="">Excel-Format</label>
            <select type="checkbox" className="vertag" />
          </div>
        </div>
        {/* current_contract footer */}
        <div className="current_contract_footer">
          <div className="projekt_name">
            <label htmlFor="">Projekt</label>
            <input
              disabled
              type="text"
              value={props.current_project_for_new_contract.project}
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
              value={props.current_project_for_new_contract.start}
              type="text"
              className="start"
            />
          </div>
          <div className="ende">
            <label htmlFor="">Ende</label>
            <input
              disabled
              value={props.current_project_for_new_contract.end}
              type="text"
              className="ende"
            />
          </div>
        </div>
      </div>
    </Styles>
  );
};

export default NewContract;
