import React from "react";
import { Container, Table } from "react-bootstrap";
import styled from "styled-components";
import SideBar from "../../components/SideBar/SideBar";
import data from "../../mock/work-days-per-year.json";

const Styles = styled.div`
  table {
    border-collapse: separate;
    border-spacing: 0 10px;

    thead {
      border-color: #fcfcfc;
    }

    tr {
      .workdaysperyear-label {
        font-weight: 500;
        font-size: 20px;
        line-height: 28px;
        color: #0854a0;
        border: none;
      }
    }

    td:last-child {
      font-weight: bold;

      &.sum {
        color: #0854a0;
      }
    }
  }

  .workdaysperyear-wrapper {
    width: 100%;
    height: 100%;
    min-height: 100vh;
    background: #f6f6f6;

    .table {
      position: relative;
      /* border-collapse: separate;
      border-spacing: 0 5px; */

      .title-month {
        margin-bottom: 0;
        font-weight: 300;
        color: #676767;
        text-align: center;
      }
    }

    .table-titles-wrapper {
      position: absolute;
      height: 51px;
      width: 100%;
      background-color: #fcfcfc;
      border-top: 1px solid #e1e1e1;
    }
  }
`;

const columnTitle = [
  { title: "", classes: "col-4" },
  { title: "Jan", classes: "col text-center" },
  { title: "Feb", classes: "col text-center" },
  { title: "Mrz", classes: "col text-center" },
  { title: "Apr", classes: "col text-center" },
  { title: "Mai", classes: "col text-center" },
  { title: "Jun", classes: "col text-center" },
  { title: "Jul", classes: "col text-center" },
  { title: "Aug", classes: "col text-center" },
  { title: "Sep", classes: "col text-center" },
  { title: "Okt", classes: "col text-center" },
  { title: "Nov", classes: "col text-center" },
  { title: "Dez", classes: "col text-center" },
  { title: "Summe", classes: "col text-center sum" },
];

const WorkDaysPerYear = () => {
  return (
    <Styles>
      <div className="workdaysperyear-wrapper">
        <SideBar
          calendar
          filters={[{ title: "Важные" }]}
          search
          columnTitle={columnTitle}
        />
        <div className="table-titles-wrapper"></div>
        <Container>
          <Table responsive>
            <thead className="table-titles">
              {/* формируем столбцы */}
              <tr>
                {columnTitle.map((item, index) => (
                  <td className={item.classes} key={index}>
                    {item.title}
                  </td>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <th className="workdaysperyear-label">
                  Fakturierbare Aufwände
                </th>
              </tr>
              {data.map((row, index) => (
                <tr key={index}>
                  {row.map((col, index) => (
                    <td
                      className={`${index === 0 ? "" : "text-center"}`}
                      key={index}
                    >
                      {col}
                    </td>
                  ))}
                  <td key={index} className="sum text-center">
                    {row
                      .filter((item) => typeof item === "number")
                      .reduce((curr, sum) => curr + sum)}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </div>
    </Styles>
  );
};

export default WorkDaysPerYear;
