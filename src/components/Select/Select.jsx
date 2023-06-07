import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getExcelTemplates } from "../../redux/slices/projects/projectsActions";
import Loader from "../Loader/Loader";

const Styles = styled.div`
  .select {
    width: fit-content;

    min-width: 200px;
    margin: 0 auto;
    position: relative;

    &.titles {
      width: 218px;
    }

    &__header {
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      min-height: 40px;

      background: #ffffff;
      outline: none;
      border: 1px solid #e1e1e1;
      border-radius: 4px;

      &.disabled {
        background-color: #f2f3f4;
      }
    }

    &__current {
      font-size: 14px;
      line-height: 24px;
      padding: 8px;
    }

    &__icon {
      align-items: center;
      display: flex;
      flex-shrink: 0;
      justify-content: center;
      height: 12px;
      text-align: center;
      margin-left: auto;
      width: 12px;
      margin-right: 10px;
      margin-bottom: 5px;
      cursor: pointer;
      transition: all 0.1s ease-in-out;

      /* background-color: black; */
      border-bottom: 1px solid black;
      border-right: 1px solid black;
      transform: rotate(45deg);

      &.active {
        transform: rotate(-135deg);
        margin-bottom: 0;
        margin-top: 5px;
      }
    }

    &__body {
      transition: all 0.3s ease-in-out;
      border: 1px solid black;
      left: 0;
      border-top: 0;
      position: absolute;
      right: 0;
      top: 100%;
      background: #ffffff;
      outline: none;
      border: 1px solid #e1e1e1;
      border-radius: 4px;
      z-index: 5;
    }

    &__item {
      line-height: 24px;
      display: flex;
      align-items: center;
      padding: 8px;
      cursor: pointer;
      font-size: 14px;

      &:hover {
        background: #f2f3f4;
      }

      input[type="radio"] {
        width: 16px;
        height: 16px;
        margin-right: 10px;
      }
    }
  }
`;

const Select = (props) => {
  const dispatch = useDispatch();

  // достаем переменные из стейта Redux для фильтра проектов
  const { loadingProjects, excelTemplate } = useSelector(
    (state) => state.projects
  );

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  React.useEffect(() => {
    // если не переданы никакие значения для Select
    if (!props.titles) {
      // получаем все шаблоны с сервера
      dispatch(getExcelTemplates());

      // проверяем, что в пропсах - если пустое значение - устанавливаем стейт в 0, если не пустое, ищем индекс в массиве шаблонов и устанавливаем стейт (чтобы отображать выбранное значение в Select)
      if (props.excelTemplate && excelTemplate) {
        const index = excelTemplate.findIndex(
          (template) => template.key === props.excelTemplate
        );

        if (index > 0) {
          setActive(index);
          return;
        } else {
          setActive(0);
        }
        // setActive(index);
        return;
      }
    } else if (props.titles) {
      setActive(0);
    }

    return () => {};
  }, []);

  const onSelect = (index) => {
    setActive(index);
    if (!props.titles) {
      props.handleSelect(excelTemplate[index].key);
    }
    if (props.titles) {
      props.handleSelect(props.titles[index]);
    }
    return;
  };

  return (
    <Styles>
      {(excelTemplate && !loadingProjects) || props.titles ? (
        <div className={`select ${props.titles ? "titles" : ""}`}>
          {/* header, выбранный option */}
          {/* если не переданы какие-либо данные в props */}
          {!props.titles && (
            <div
              className={`select__header ${props.disabled ? "disabled" : ""}`}
              onClick={() => setOpen((prev) => !prev)}
            >
              <span className="select__current">
                {excelTemplate[active].label === ""
                  ? "Nothing"
                  : excelTemplate[active].label}
              </span>
              <div
                className={`select__icon ${open ? "active" : ""}`}
                // onClick={() => setOpen((prev) => !prev)}
              />
            </div>
          )}
          {/* если переданы какие-либо названия в props */}
          {props.titles && (
            <div
              className={`select__header ${props.disabled ? "disabled" : ""}`}
              onClick={() => setOpen((prev) => !prev)}
            >
              <span className="select__current">{props.titles[active]}</span>
              <div
                className={`select__icon ${open ? "active" : ""}`}
                // onClick={() => setOpen((prev) => !prev)}
              />
            </div>
          )}

          {/* body, варианты options */}
          {open && !props.disabled ? (
            <div className="select__body">
              {excelTemplate && !props.titles
                ? excelTemplate.map((template, index) => (
                    <div
                      key={index}
                      className="select__item"
                      onClick={() => {
                        onSelect(index);
                        setOpen(false);
                      }}
                    >
                      <input
                        type="radio"
                        checked={active === index}
                        onChange={() => {}}
                      />
                      <span>
                        {template.label === "" ? "Nothing" : template.label}
                      </span>
                    </div>
                    // если переданы названия в пропсах - рендерим их
                  ))
                : props.titles.map((title, index) => (
                    <div
                      key={index}
                      className="select__item"
                      onClick={() => {
                        onSelect(index);
                        setOpen(false);
                      }}
                    >
                      <input
                        type="radio"
                        checked={active === index}
                        onChange={() => {}}
                      />
                      <span>{title}</span>
                    </div>
                  ))}
            </div>
          ) : null}
        </div>
      ) : (
        <Loader small />
      )}
    </Styles>
  );
};

export default Select;
