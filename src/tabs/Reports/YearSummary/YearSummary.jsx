import React from "react";
import { Container, Table } from "react-bootstrap";
import styled from "styled-components";
import SideBar from "../../../components/SideBar/SideBar";
import { useDispatch, useSelector } from "react-redux";
import { getReportsSummary } from "../../../redux/slices/reports/year_summary/yearSummaryActions";
import Loader from "../../../components/Loader/Loader";
import YearSummary from "./YearSummary";

const Styles = styled.div`
  table {
    border-collapse: separate;
    border-spacing: 0 10px;

    thead {
      border-color: #fcfcfc;
    }

    tbody {
      tr {
        &.yearsummary-label {
          font-weight: 500;
          font-size: 20px;
          line-height: 28px;
          color: #0854a0;
          border-color: transparent;
        }

        &.table-content {
          &:hover {
            background-color: white;
            border: white;
            cursor: pointer;
          }
        }
      }
    }

    td:last-child {
      font-weight: bold;

      &.sum {
        color: #0854a0;
      }
    }
  }

  .yearsummary-wrapper {
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

const YearSummaryComponent = () => {
  // достаем переменные из стейта для рендера заметок
  const {
    loadingYearSummary,
    yearSummaryData,
    needRefreshData,
    error,
    filterDateYearSummary,
  } = useSelector((state) => state.yearSummary);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(
      getReportsSummary(filterDateYearSummary.split("-")[0].split(".")[2])
    );
  }, [filterDateYearSummary]);

  // React.useEffect(() => {
  //   if (yearSummaryData) {
  //     yearSummaryData.billableProjects.map((project, index) => {
  //       // Object.keys(project).map((keyName, i) => console.log(project[keyName]));
  //       console.log(project);
  //     });
  //   }
  // }, [yearSummaryData]);

  return (
    <Styles>
      <div className="yearsummary-wrapper">
        <SideBar calendar columnTitle={columnTitle} tab={"year_summary"} />
        <div className="table-titles-wrapper"></div>
        <Container>
          {!loadingYearSummary ? (
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
                {/* верхняя секция Zusammenfassung */}
                <tr className="yearsummary-label">
                  <th>Zusammenfassung</th>
                </tr>
                {/* Arbeitstage im Monat */}
                {yearSummaryData && (
                  <tr className="table-content">
                    {Object.keys(yearSummaryData.businessDays).map(
                      (keyName, i) => (
                        <td
                          className={`${i === 0 ? "" : "text-center"} ${
                            i === 13 ? "sum" : ""
                          }`}
                          key={i}
                        >
                          {i === 0
                            ? "Arbeitstage im Monat"
                            : yearSummaryData.businessDays[keyName]}
                        </td>
                      )
                    )}
                  </tr>
                )}
                {/* Fakturierbare Aufwände */}
                {yearSummaryData && (
                  <tr className="table-content">
                    {Object.keys(yearSummaryData.billableDays).map(
                      (keyName, i) => (
                        <td
                          className={`${i === 0 ? "" : "text-center"} ${
                            i === 13 ? "sum" : ""
                          }`}
                          key={i}
                        >
                          {i === 0
                            ? "Fakturierbare Aufwände"
                            : yearSummaryData.billableDays[keyName]}
                        </td>
                      )
                    )}
                  </tr>
                )}
                {/* Nicht fakturierbare Aufwände */}
                {yearSummaryData && (
                  <tr className="table-content">
                    {Object.keys(yearSummaryData.notBillableDays).map(
                      (keyName, i) => (
                        <td
                          className={`${i === 0 ? "" : "text-center"} ${
                            i === 13 ? "sum" : ""
                          }`}
                          key={i}
                        >
                          {i === 0
                            ? "Nicht fakturierbare Aufwände"
                            : yearSummaryData.notBillableDays[keyName]}
                        </td>
                      )
                    )}
                  </tr>
                )}
                {/* Nicht gebuchte Tage */}
                {yearSummaryData && (
                  <tr className="table-content">
                    {Object.keys(yearSummaryData.notBookedDays).map(
                      (keyName, i) => (
                        <td
                          className={`${i === 0 ? "" : "text-center"} ${
                            i === 13 ? "sum" : ""
                          }`}
                          key={i}
                        >
                          {i === 0
                            ? "Nicht gebuchte Tage"
                            : yearSummaryData.notBookedDays[keyName]}
                        </td>
                      )
                    )}
                  </tr>
                )}
                {/* секция с проектами Fakturierbare Aufwände */}
                <tr className="yearsummary-label">
                  <th>Fakturierbare Aufwände</th>
                </tr>

                {/* Nicht gebuchte Tage */}
                {yearSummaryData &&
                  yearSummaryData.billableProjects.map((project, index) => (
                    <tr className="table-content" key={index}>
                      {Object.keys(project).map((keyName, i) => (
                        <td
                          className={`${i === 0 ? "" : "text-center"} ${
                            i === 13 ? "sum" : ""
                          }`}
                          key={i}
                        >
                          {project[keyName]}
                        </td>
                      ))}
                    </tr>
                  ))}

                {/* нижняя секция Fakturierbare Aufwände */}
                <tr className="yearsummary-label">
                  <th>Nicht fakturierbare Aufwände</th>
                </tr>

                {/* List of not billable projects */}
                {yearSummaryData &&
                  yearSummaryData.notBillableProjects.map((project, index) => (
                    <tr className="table-content" key={index}>
                      {Object.keys(project).map((keyName, i) => (
                        <td
                          className={`${i === 0 ? "" : "text-center"} ${
                            i === 13 ? "sum" : ""
                          }`}
                          key={i}
                        >
                          {project[keyName]}
                        </td>
                      ))}
                    </tr>
                  ))}
              </tbody>
            </Table>
          ) : (
            <Loader big />
          )}
        </Container>
      </div>
    </Styles>
  );
};

export default YearSummaryComponent;
