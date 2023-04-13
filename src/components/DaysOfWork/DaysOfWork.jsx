import React from "react";
import { Container } from "react-bootstrap";
import styled from "styled-components";
import SideBar from "../SideBar/SideBar";

const Styles = styled.div`
  .daysofwork-wrapper {
    width: 100%;
    height: 100vh;
    background: #f6f6f6;
  }
`;

const DaysOfWork = () => {
  return (
    <Styles>
      <div className="daysofwork-wrapper">
        <SideBar calendar filters={[{ title: "Важные" }]} search />
        <Container>Days of Work</Container>
      </div>
    </Styles>
  );
};

export default DaysOfWork;
