import moment from "moment";
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
      height: 55px;
      background: #fcfcfc;
      box-shadow: 0px 3px 4px rgba(166, 166, 166, 0.2);
      border: none;
    }

    .table-responsive {
      padding: 5px;
      .table {
        input {
          &.check-box {
            width: 18px;
            height: 18px;
          }
        }

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
              <th className="col-3">Bezeichnung Vermittler</th>
              <th className="col-2">Bezeichnung Kunde</th>
              <th className="col">Budget</th>
              <th className="col">Verfallen</th>
              <th className="col-3">Start - Ende</th>
              <th className="col">Aktiv</th>
              <th className="col">Fakturierbar</th>
            </tr>
          </thead>
          <tbody className="table-content">
            {/* если кликнули на проект - выводим модалку с проектом и его контрактами */}
            {props.current_project_table &&
              props.current_project_table.contracts.map((contract, index) => (
                <tr key={contract.name}>
                  <th>{contract.identifier_provider}</th>
                  <th>{contract.identifier_customer}</th>
                  <th className="text-center">{contract.budget}</th>
                  <th className="text-center">{contract.budget_expired}</th>
                  <th>{`${moment(contract.start_date).format(
                    "DD.MM.YYYY"
                  )} - ${moment(contract.end_date).format("DD.MM.YYYY")}`}</th>
                  <th className="text-center">
                    <input
                      type="checkbox"
                      className="check-box"
                      checked={contract.active}
                      onChange={() => {}}
                      disabled
                    />
                  </th>
                  <th className="text-center">
                    <input
                      type="checkbox"
                      className="check-box"
                      checked={contract.billable}
                      onChange={() => {}}
                      disabled
                    />
                  </th>
                </tr>
              ))}
            {/* если кликнули на контракт - выводим модалку с контрактом */}
            {props.current_contract_table && (
              <tr key={props.current_contract_table.name}>
                <th>{props.current_contract_table.identifier_provider}</th>
                <th>{props.current_contract_table.identifier_customer}</th>
                <th className="text-center">
                  {props.current_contract_table.budget}
                </th>
                <th className="text-center">
                  {props.current_contract_table.budget_expired}
                </th>
                <th>{`${moment(props.current_contract_table.start_date).format(
                  "DD.MM.YYYY"
                )} - ${moment(props.current_contract_table.end_date).format(
                  "DD.MM.YYYY"
                )}`}</th>
                <th className="text-center">
                  <input
                    type="checkbox"
                    className="check-box"
                    checked={props.current_contract_table.active}
                    onChange={() => {}}
                    disabled
                  />
                </th>
                <th className="text-center">
                  <input
                    type="checkbox"
                    className="check-box"
                    checked={props.current_contract_table.billable}
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
