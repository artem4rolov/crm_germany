import React from "react";
import styled from "styled-components";
import SideBar from "../../components/SideBar/SideBar";
import { Container } from "react-bootstrap";

const Styles = styled.div`
  .calendar-wrapper {
    width: 100%;
    height: 100vh;
    background: #f6f6f6;
  }
`;

const Calendar = () => {
  return (
    <Styles>
      <div className="calendar-wrapper">
        <SideBar
          calendar
          filters={[
            { title: "Важные" },
            { title: "Оплачиваемые" },
            { title: "Завершенные" },
          ]}
          search
        />
        <Container>Calendar</Container>
      </div>
    </Styles>
  );
};

export default Calendar;
