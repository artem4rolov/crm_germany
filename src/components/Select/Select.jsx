import React, { useState } from "react";
import styled from "styled-components";

const Styles = styled.div`
  .select {
    width: 100px;
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

      background: #ffffff;
      outline: none;
      border: 1px solid #e1e1e1;
      border-radius: 4px;
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

const files = [".xlsx", ".xlsm", ".xls", ".xltm", ".xltx", ".xlsb"];

const Select = (props) => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  const onSelect = (index) => {
    setActive(index);
    // props.handleSelect(props.titles[index] || files[index]);
  };

  return (
    <Styles>
      <div className={`select ${props.titles ? "titles" : ""}`}>
        <div
          className={`select__header`}
          onClick={() => setOpen((prev) => !prev)}
        >
          <span className="select__current">
            {props.titles ? props.titles[active] : files[active]}
          </span>
          <div
            className={`select__icon ${open ? "active" : ""}`}
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>

        {open ? (
          <div className="select__body">
            {props.titles
              ? props.titles.map((name, index) => (
                  <div
                    key={index}
                    className="select__item"
                    onClick={() => onSelect(index)}
                  >
                    <input
                      type="radio"
                      checked={active === index}
                      onChange={() => {}}
                    />
                    <span>{name}</span>
                  </div>
                ))
              : files.map((name, index) => (
                  <div
                    key={index}
                    className="select__item"
                    onClick={() => onSelect(index)}
                  >
                    <input
                      type="radio"
                      checked={active === index}
                      onChange={() => {}}
                    />
                    <span>{name}</span>
                  </div>
                ))}
          </div>
        ) : null}
      </div>
    </Styles>
  );
};

export default Select;
