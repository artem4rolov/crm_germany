import React, { useState } from "react";
import ImportImage from "../../../assets/icon_download.svg";
import ExportImage from "../../../assets/icon_upload.svg";
import { useDispatch } from "react-redux";
import Modal from "../../Modal/Modal";
import styled from "styled-components";

const Styles = styled.div`
  .sidebar-download {
    display: flex;
    align-items: center;
    gap: 4px;

    .import,
    .export {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 6px;
      cursor: pointer;

      font-weight: 400;
      font-size: 14px;
      line-height: 19px;
      color: #676767;

      &:hover {
        border-bottom: 1px solid #354a5f;
      }
    }
  }
`;

const UploadDownload = () => {
  // вызов модального окна
  const [toggleUploadFileModal, setToggleUploadFileModal] = useState(false);
  const dispatch = useDispatch();

  return (
    <Styles>
      <div className="sidebar-download">
        <div
          className="import"
          onClick={() => setToggleUploadFileModal((prev) => !prev)}
        >
          <img src={ImportImage} alt="import icon" />
          <span>Загрузить</span>
        </div>
        <div className="export">
          <img src={ExportImage} alt="export icon" />
          <span>Выгрузить</span>
        </div>
      </div>
      {toggleUploadFileModal && (
        <Modal
          upload_excel
          title={"Datei herunterladen"}
          toggle={setToggleUploadFileModal}
        />
      )}
    </Styles>
  );
};

export default UploadDownload;
