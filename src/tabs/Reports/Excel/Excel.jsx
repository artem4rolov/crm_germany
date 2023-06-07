import React from "react";
import styled from "styled-components";
import SideBar from "../../../components/SideBar/SideBar";
import { Container, Table } from "react-bootstrap";
import data from "../../../mock/work-days-per-month.json";

const Styles = styled.div`
  table {
    thead {
      border-color: #fcfcfc;
      font-weight: bold;
    }

    td {
      vertical-align: top;
    }

    tbody {
      tr {
        td {
          height: 53px;
          vertical-align: middle;

          .hours {
            text-align: center;
            cursor: pointer;

            &:hover {
              background: #0854a0;
              border-radius: 50%;
              color: #f6f6f6;
            }
          }
        }
      }
    }
  }

  .excel-wrapper {
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
      height: 68px;
      width: 100%;
      background-color: #fcfcfc;
      border-top: 1px solid #e1e1e1;
    }
  }
`;

const columnTitle = [
  { title: "Nr.", classes: "col" },
  { title: "Vertäge", classes: "col-3" },
  { title: "Start", classes: "col" },
  { title: "Ende", classes: "col" },
  { title: "Gesamptbudget / Verfügbar", classes: "col text-center" },
  {
    title: "Verbraucht",
    classes: "col-6",
    subtitles: [
      "Jan",
      "Feb",
      "Mrz",
      "Apr",
      "Mai",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Okt",
      "Nov",
      "Dez",
    ],
  },
];

const Excel = () => {
  return (
    <Styles>
      <div className="excel-wrapper">
        <SideBar
          calendar
          columnTitle={columnTitle}
          tableInTable
          search
          tab={"excel"}
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
                    {item.subtitles && (
                      <Table className="title-month">
                        {item.subtitles
                          ? item.subtitles.map((month, idex) => (
                              <td key={month}>{month}</td>
                            ))
                          : null}
                      </Table>
                    )}
                  </td>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  {/* {row.map((col, index) => (
                    <td key={index}>
                      {col}
                      {Array.isArray(col) &&
                        col.map((hours, index) => (
                          <Table>
                            <td key={index}>{hours}</td>
                          </Table>
                        ))}
                    </td>
                  ))} */}
                  <td>{row[0]}</td>
                  <td>{row[1]}</td>
                  <td>{row[2]}</td>
                  <td>{row[3]}</td>
                  <td className="text-center">{row[4]}</td>
                  <td>
                    <Table>
                      {row[5].map((hours, index) => (
                        <td className="hours" key={index}>
                          {hours}
                        </td>
                      ))}
                    </Table>
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

export default Excel;
