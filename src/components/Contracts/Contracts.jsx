import React from "react";
import styled from "styled-components";
import SideBar from "../SideBar/SideBar";
import { Container } from "react-bootstrap";

const Styles = styled.div`
  .contracts-wrapper {
    width: 100%;
    height: 100vh;
    background: #f6f6f6;
  }
`;

const Contracts = () => {
  return (
    <Styles>
      <div className="contracts-wrapper">
        <SideBar
          calendar
          filters={[
            { title: "Важные" },
            { title: "Оплачиваемые" },
            { title: "Завершенные" },
          ]}
          search
        />
        <Container>Contracts</Container>
      </div>
    </Styles>
  );
};

export default Contracts;
