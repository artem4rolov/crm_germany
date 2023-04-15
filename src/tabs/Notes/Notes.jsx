import React from "react";
import styled from "styled-components";
import SideBar from "../../components/SideBar/SideBar";
import { Container } from "react-bootstrap";

const Styles = styled.div`
  .notes-wrapper {
    width: 100%;
    height: 100vh;
    background: #f6f6f6;
  }
`;

const Notes = () => {
  return (
    <Styles>
      <div className="notes-wrapper">
        <SideBar calendar filters={[{ title: "Важные" }]} search />
        <Container>Days of Work</Container>
      </div>
    </Styles>
  );
};

export default Notes;
