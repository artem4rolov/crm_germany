import React from "react";
import styled from "styled-components";
import SideBar from "../../components/SideBar/SideBar";
import { Container, Table } from "react-bootstrap";

const Styles = styled.div`
  .workdayspermonth-wrapper {
    width: 100%;
    height: 100vh;
    background: #f6f6f6;
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
    classes: "col-8",
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

const WorkDaysPerMonth = () => {
  return (
    <Styles>
      <div className="workdayspermonth-wrapper">
        <SideBar
          calendar
          filters={[
            { title: "Важные" },
            { title: "Оплачиваемые" },
            { title: "Завершенные" },
          ]}
          columnTitle={columnTitle}
          search
        />
        <Container>
          <Table responsive>
            <thead className="table-titles">
              {/* формируем столбцы */}
              <tr>
                {columnTitle.map((item, index) => (
                  <th className={item.classes} key={index}>
                    {item.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* {data.map((row, index) => (
                <tr key={index}>
                  {row.map((col, index) => (
                    <th key={index}>{col}</th>
                  ))}
                </tr>
              ))} */}
            </tbody>
          </Table>
        </Container>
      </div>
    </Styles>
  );
};

export default WorkDaysPerMonth;
