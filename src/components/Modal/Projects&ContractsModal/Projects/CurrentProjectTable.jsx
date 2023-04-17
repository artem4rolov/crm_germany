import React from "react";
import { Table } from "react-bootstrap";
import styled from "styled-components";

const Styles = styled.div`
  width: 100%;
  /* current project table of contracts */
  .current_project_table {
    width: 100%;

    .table-responsive {
      .table {
        .table-titles {
          width: 100%;
          margin: 0 auto;
          background-color: white;
        }

        .table-content {
          &:hover {
            background: transparent;
          }

          tr {
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
  return (
    <Styles>
      <div className="current_project_table">
        {/* current_project_data table-header */}
        <Table responsive>
          <thead className="table-titles">
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
            {props.current_project_table.contracts.map((contract, index) => (
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
          </tbody>
        </Table>
      </div>
    </Styles>
  );
};

export default CurrentProjectTable;
