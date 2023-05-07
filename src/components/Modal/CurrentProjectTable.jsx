import React from "react";
import { Table } from "react-bootstrap";
import styled from "styled-components";

const Styles = styled.div`
  width: 100%;
  /* current project table of contracts */
  .current_project_table {
    width: 100%;
    position: relative;

    .table-titles-wrapper {
      position: absolute;
      top: 0;
      height: 80px;
      background: #fcfcfc;
      box-shadow: 0px 3px 4px rgba(166, 166, 166, 0.2);
      border: none;
    }

    .table-responsive {
      padding: 5px;
      .table {
        .table-titles {
          position: -webkit-sticky;
          position: sticky;
          top: 0;
          &:first-child {
            border-color: transparent;
          }
        }
        .table-content {
          &:hover {
            background: transparent;
          }

          tr {
            border-style: solid;
            border-color: #bbbbbb;

            &:hover {
              background-color: white;
            }
          }
        }
      }
    }
  }
`;

const CurrentProjectTable = (props) => {
  console.log(props);
  return (
    <Styles>
      <div className="current_project_table">
        <div className="table-titles-wrapper"></div>
        {/* current_project_data table-header */}
        <Table responsive>
          <thead className={`table-titles`}>
            {/* формируем столбцы */}
            <tr>
              <th className="col-2">Verträge</th>
              <th className="col-2">Bezeichnung Vermittler</th>
              <th className="col-2">Bezeichnung Kunde</th>
              <th className="col-2">Budget</th>
              <th className="col">Verfallen</th>
              <th className="col">Start - Ende</th>
              <th className="col">Aktiv</th>
              <th className="col">Fakturierbar</th>
            </tr>
          </thead>
          <tbody className="table-content">
            {props.current_project_table &&
              props.current_project_table.contracts.map((contract, index) => (
                <tr key={contract[0]}>
                  <th>{contract[0]}</th>
                  <th>{contract[1]}</th>
                  <th>{contract[4]}</th>
                  <th>{contract[5]}</th>
                  <th>{contract[6]}</th>
                  <th className="text-center">{contract[7]}</th>
                  <th className="text-center">
                    <input
                      type="checkbox"
                      checked={contract[8]}
                      onChange={() => {}}
                      disabled
                    />
                  </th>
                  <th className="text-center">
                    <input
                      type="checkbox"
                      checked={contract[9]}
                      onChange={() => {}}
                      disabled
                    />
                  </th>
                </tr>
              ))}
            {props.current_contract_table && (
              <tr key={props.current_contract_table[0]}>
                <th>{props.current_contract_table[0]}</th>
                <th>{props.current_contract_table[1]}</th>
                <th>{props.current_contract_table[4]}</th>
                <th>{props.current_contract_table[5]}</th>
                <th>{props.current_contract_table[6]}</th>
                <th className="text-center">
                  {props.current_contract_table[7]}
                </th>
                <th className="text-center">
                  <input
                    type="checkbox"
                    checked={props.current_contract_table[8]}
                    onChange={() => {}}
                    disabled
                  />
                </th>
                <th className="text-center">
                  <input
                    type="checkbox"
                    checked={props.current_contract_table[9]}
                    onChange={() => {}}
                    disabled
                  />
                </th>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </Styles>
  );
};

export default CurrentProjectTable;
