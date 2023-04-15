import React from "react";
import { Container } from "react-bootstrap";
import styled from "styled-components";
import SideBar from "../../components/SideBar/SideBar";

const Styles = styled.div`
  .holidays-wrapper {
    width: 100%;
    height: 100vh;
    background: #f6f6f6;
  }
`;

const Holidays = () => {
  return (
    <Styles>
      <div className="holidays-wrapper">
        <SideBar calendar download />
        <Container>Holidays</Container>
      </div>
    </Styles>
  );
};

export default Holidays;
