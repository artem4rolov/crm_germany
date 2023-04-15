import React from "react";
import { Container } from "react-bootstrap";
import SideBar from "../../components/SideBar/SideBar";
import styled from "styled-components";

const Styles = styled.div`
  .dashboard-wrapper {
    width: 100%;
    height: 100vh;
    background: #f6f6f6;
  }
`;

const Dashboard = () => {
  return (
    <Styles>
      <div className="dashboard-wrapper">
        <SideBar calendar settings search />
        <Container>Dashboard</Container>
      </div>
    </Styles>
  );
};

export default Dashboard;
