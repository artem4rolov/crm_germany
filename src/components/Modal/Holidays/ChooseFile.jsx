import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { uploadExcel } from "../../../redux/slices/holidays/holidaysActions";

const Styles = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  #form-file-upload {
    height: 8rem;
    width: 20rem;
    max-width: 100%;
    text-align: center;
    position: relative;
  }

  #input-file-upload {
    display: none;
  }

  #label-file-upload {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-width: 2px;
    border-radius: 1rem;
    border-style: dashed;
    border-color: #cbd5e1;
    background-color: #f8fafc;
  }

  #label-file-upload.drag-active {
    background-color: #ffffff;
  }

  .upload-button {
    cursor: pointer;
    padding: 0.25rem;
    font-size: 1rem;
    border: none;
    font-family: "Oswald", sans-serif;
    background-color: transparent;
  }

  .upload-button:hover {
    text-decoration-line: underline;
  }

  #label-file-name {
    text-align: center;
    font-weight: 500;
  }

  #drag-file-element {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 1rem;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
  }

  /* *********************************** */
`;

const ChooseFile = (props) => {
  // стейт на drag and drop
  const [dragActive, setDragActive] = React.useState(false);
  // стейт для имени файла
  const [fileName, setFileName] = React.useState(null);
  // стейт для formData
  const [file, setFile] = React.useState(null);

  const dispatch = useDispatch();
  // ref
  const inputRef = React.useRef(null);

  function handleFile(files) {
    // console.log(files);
    // сначала создаем объект formData для отправки на сервер
    const formData = new FormData();
    // добавляем файл, который нужно передать в объект formData
    formData.append("file", files[0], files[0].name);

    // задаем имя выбранного файла, чтобы отобразить его
    setFileName(files[0].name);
    // пихаем formData в стейт, для последующей отправки (при клике в родительской модалке кнопки "отправить")
    setFile(formData);
  }

  // следим за стейтом родительской модалки (если там будет клик по кнопке "отправить" - отправляем данные на сервер)
  React.useEffect(() => {
    if (props.isSubmit && file) {
      // если кнопка "отправить" была нажата и в стейте этого компонента есть formData, то оправляем данные
      dispatch(uploadExcel(file));
      // скрываем модалку
      props.toggle();
    }
  }, [props.isSubmit]);

  // прослушиваем drag and drop
  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // когда загрузили файл через drag and drop - передаем его в родителя (Modal.jsx)
  const handleDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files);
    }
  };

  // прослушиваем клик на выбор файла
  const handleChange = function (e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files);
    }
  };

  // логика работы клика по кнопке такая же, что и работа drag and drop (везде обычный выбор файла)
  const onButtonClick = () => {
    inputRef.current.click();
  };

  console.log(fileName);

  return (
    <Styles>
      <form
        id="form-file-upload"
        onDragEnter={handleDrag}
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={inputRef}
          type="file"
          id="input-file-upload"
          multiple={false}
          onChange={handleChange}
        />
        <label
          id="label-file-upload"
          htmlFor="input-file-upload"
          className={dragActive ? "drag-active" : ""}
        >
          <div>
            <p>Drag and drop your file here or</p>
            <button className="upload-button" onClick={onButtonClick}>
              Upload a file
            </button>
          </div>
        </label>
        <label id="label-file-name">{fileName ? fileName : null}</label>
        {dragActive && (
          <div
            id="drag-file-element"
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          ></div>
        )}
      </form>
    </Styles>
  );
};

export default ChooseFile;
