import React from "react";
import { Container } from "react-bootstrap";
import SideBar from "../../components/SideBar/SideBar";
import styled from "styled-components";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryStack } from "victory";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "bootstrap";
import { setSettingsOpen } from "../../redux/slices/dashboard/dashboard";

const Styles = styled.div`
  .dashboard-wrapper {
    width: 100%;
    height: 100%;
    min-height: 100vh;
    background: #f6f6f6;
  }
`;

const Dashboard = () => {
  const { settingsOpen } = useSelector((state) => state.dashboard);
  const dispatch = useDispatch();

  console.log(settingsOpen);

  return (
    <Styles>
      <div className="dashboard-wrapper">
        <SideBar calendar settings tab={"dashboard"} />
        <Container>hi</Container>
      </div>
      {/* модальное окно с рабочими часами (за 3 года) */}
      {settingsOpen && (
        <Modal
          work_time
          title="Parameter für die Zeitplanung"
          toggle={dispatch(setSettingsOpen(false))}
        />
      )}
    </Styles>
  );
};

export default Dashboard;
