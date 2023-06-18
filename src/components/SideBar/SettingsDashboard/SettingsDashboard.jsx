import React from "react";

import SettingsImage from "../../../assets/icon_setting.svg";
import { useDispatch, useSelector } from "react-redux";
import { setSettingsOpen } from "../../../redux/slices/dashboard/dashboard";
import styled from "styled-components";

const Styles = styled.div`
  .sidebar-settings {
    width: 40px;
    height: 40px;
    border: 1px solid #bebebe;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    padding: 8px;
    cursor: pointer;

    &:hover {
      border: 1px solid #354a5f;
    }

    &:actvie {
      border: 1px solid #351a50;
    }

    &.checked {
      background: rgb(8, 84, 160);

      img {
        background-color: white;
      }
    }
  }
`;

const SettingsDashboard = () => {
  const dispatch = useDispatch();

  //   const { settingsOpen } = useSelector((state) => state.dashboard);

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
    dispatch(setSettingsOpen(open));
  };

  return (
    <Styles>
      <div className={`sidebar-settings ${open ? "checked" : ""}`}>
        <img
          onClick={() => handleClick()}
          src={SettingsImage}
          alt="settings icon"
        />
      </div>
    </Styles>
  );
};

export default SettingsDashboard;
