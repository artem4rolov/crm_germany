import React from "react";
import styled from "styled-components";
import SideBar from "../../../components/SideBar/SideBar";
import { Container, Table } from "react-bootstrap";
import data from "../../../mock/work-days-per-month.json";
import { useDispatch, useSelector } from "react-redux";
import { getContractsExcel } from "../../../redux/slices/reports/excel/excelActions";
import moment from "moment";
import Loader from "../../../components/Loader/Loader";

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
  const dispatch = useDispatch();
  const { contractsExcel, loadingContracts, filterDateExcel } = useSelector(
    (state) => state.excel
  );

  React.useEffect(() => {
    const year = new Date(filterDateExcel.split("-")[0]).getFullYear();

    dispatch(getContractsExcel(year));
  }, [filterDateExcel]);

  console.log(contractsExcel);

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
              {contractsExcel &&
                contractsExcel.length === 0 &&
                !loadingContracts && (
                  <tr className="table-content">
                    <td colSpan={12}>Keine contract vorhanden</td>
                  </tr>
                )}
              {contractsExcel && !loadingContracts ? (
                contractsExcel.map((contract, index) => (
                  <tr key={index}>
                    <td>{`${index + 1}.`}</td>
                    <td>{contract.name}</td>
                    <td>{moment(contract.start_date).format("DD.MM.YYYY")}</td>
                    <td>{moment(contract.end_date).format("DD.MM.YYYY")}</td>
                    <td className="text-center">{`${contract.budget} / ${contract.budget_consumed}`}</td>
                    <td>
                      <Table>
                        <td className="hours" key={index}>
                          {contract.m01}
                        </td>
                        <td className="hours" key={index}>
                          {contract.m02}
                        </td>
                        <td className="hours" key={index}>
                          {contract.m03}
                        </td>
                        <td className="hours" key={index}>
                          {contract.m04}
                        </td>
                        <td className="hours" key={index}>
                          {contract.m05}
                        </td>
                        <td className="hours" key={index}>
                          {contract.m06}
                        </td>
                        <td className="hours" key={index}>
                          {contract.m07}
                        </td>
                        <td className="hours" key={index}>
                          {contract.m08}
                        </td>
                        <td className="hours" key={index}>
                          {contract.m09}
                        </td>
                        <td className="hours" key={index}>
                          {contract.m10}
                        </td>
                        <td className="hours" key={index}>
                          {contract.m11}
                        </td>
                        <td className="hours" key={index}>
                          {contract.m12}
                        </td>
                      </Table>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={12}>
                    <Loader big />
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Container>
      </div>
    </Styles>
  );
};

export default Excel;
