import React from "react";
import { useEffect } from "react";
import { Container } from "react-bootstrap";

import CalendarImage from "../../assets/icon_calendar.svg";
import ClockImage from "../../assets/icon_time.svg";
import styled from "styled-components";

const Styles = styled.div`
  .modal-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    margin: 0 auto;
    height: 100vh;
    width: 100vw;
    background: rgba(0, 0, 0, 0.6);
    overflow: hidden;
    z-index: 1;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal-window {
    z-index: 2;
    width: 100%;
    height: 720px;
    background: #f6f6f6;

    display: flex;
    flex-direction: column;
    gap: 0;
    justify-content: space-between;

    .modal-header {
      padding: 30px;
      display: flex;
      justify-content: space-between;
      background: #fcfcfc;
      border-bottom: 1px solid #e1e1e1;
    }

    .modal-content {
      padding: 30px;
      display: flex;
      justify-content: start;
      flex-direction: column;

      .add_project_today {
        display: flex;
        flex-direction: column;
        justify-content: start;
        gap: 40px;

        .inputs {
          display: flex;
          justify-content: space-between;
          align-items: center;

          .vertrag {
            display: flex;
            flex-direction: column;
            justify-content: start;

            label {
              font-weight: 500;
              font-size: 15px;
              line-height: 21px;
              color: #32363a;
            }
            select {
              width: 620px;
              background: #ffffff;
              border: 1px solid #e1e1e1;
              border-radius: 4px;
              padding: 10px;
            }
          }

          .project-select {
            select {
              width: 300px;
              background: #ffffff;
              border: 1px solid #e1e1e1;
              border-radius: 4px;
              padding: 10px;
            }
          }
        }
        .textareas {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          width: 100%;

          .first,
          .second {
            width: 620px;
            max-height: 175px;
            display: flex;
            flex-direction: column;
            justify-content: start;

            textarea {
              background: #ffffff;
              width: 620px;
              padding: 12px;
              border: 1px solid #e1e1e1;
              border-radius: 4px;
              font-weight: 400;
              font-size: 14px;
              line-height: 19px;
              color: #4b4e51;
            }
          }
        }
        .time {
          display: flex;
          justify-content: start;
          align-items: center;
          gap: 16px;

          .datum,
          .von,
          .bis,
          .pause,
          .zeit {
            display: flex;
            flex-direction: column;
            gap: 8px;

            font-weight: 500;
            font-size: 15px;
            line-height: 21px;
            color: #32363a;

            .datum__content,
            .von__content,
            .bis__content,
            .pause__content,
            .zeit__content {
              max-width: 106px;
              background: #ffffff;
              border: 1px solid #e1e1e1;
              border-radius: 4px;
              display: flex;
              padding: 8px;
              input {
                border: none;
                -webkit-appearance: none !important;
                outline: none;
                width: 100%;
              }
            }
          }
        }
      }
    }

    .modal-footer {
      padding: 30px;
      display: flex;
      justify-content: space-between;
      background: #fcfcfc;
      border-top: 1px solid #e1e1e1;

      .footer-buttons {
        display: flex;
        align-items: center;
        gap: 16px;

        .footer-delete {
          border: 1px solid #feb7b7;
          border-radius: 4px;
          padding: 12px;
          background: #fff;
        }

        .footer-decline {
          min-width: 190px;
          border: 1px solid #9fc5eb;
          border-radius: 4px;
          padding: 12px;
          color: #0854a0;
          background: #fff;

          &:hover {
            background: #f6f6f6;
          }
        }

        .footer-confirm {
          min-width: 190px;
          background: #0854a0;
          border-radius: 4px;
          border: none;
          padding: 12px;
          color: #fff;

          &:hover {
            background: #0954c9;
          }
        }
      }
    }
  }

  .check-block {
    display: flex;
    align-items: center;
    gap: 3px;

    input {
      width: 18px;
      height: 18px;
    }

    label {
      margin-left: 3px;
      cursor: pointer;
      font-weight: 400;
      font-size: 14px;
      line-height: 19px;
      color: #4b4e51;
    }
  }
`;

const Modal = (props) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  });

  return (
    <Styles>
      <div className="modal-wrapper">
        <Container>
          <div className="modal-window">
            {/* header модального окна */}
            <div className="modal-header">
              <span className="header-title">{props.title}</span>
              {/* если есть такой пропс - рендерим чекбокс "важный проект" */}
              {props.important && (
                <div className="check-block">
                  <input type="checkbox" id="важный" />
                  <label htmlFor="важный">Важный</label>
                </div>
              )}
            </div>
            {/* content модального окна */}
            <div className="modal-content">
              {/* страница Contract */}
              {props.new_project && <div className="">new project</div>}
              {props.current_project && (
                <div className="">{props.current_project.project}</div>
              )}
              {props.current_project_data && (
                <div className="">{props.current_project_data.project}</div>
              )}

              {/* страница Project */}
              {props.add_project_today && (
                <div className="add_project_today">
                  {/* инпуты */}
                  <div className="inputs">
                    <div className="vertrag">
                      <label>Vertrag</label>
                      <select name="" id=""></select>
                    </div>
                    <div className="project-select">
                      <select name="" id=""></select>
                    </div>
                  </div>
                  {/* поля текста textarea */}
                  <div className="textareas">
                    <div className="first">
                      <label>Tätigkeiten</label>
                      <textarea name="" id="" cols="30" rows="10"></textarea>
                    </div>
                    <div className="second">
                      <label>Kommentar</label>
                      <textarea name="" id="" cols="30" rows="10"></textarea>
                    </div>
                  </div>
                  {/* время внизу */}
                  <div className="time">
                    <div className="datum">
                      <label>Datum</label>
                      <div className="datum__content">
                        <label htmlFor="date">
                          <img src={CalendarImage} alt="calendar icon" />
                        </label>
                        <input type="date" id="date" />
                      </div>
                    </div>
                    <div className="von">
                      <label>Von</label>
                      <div className="von__content">
                        <img src={ClockImage} alt="von icon" />
                        <input type="text" id="date" />
                      </div>
                    </div>
                    <div className="bis">
                      <label>Bis</label>
                      <div className="bis__content">
                        <img src={ClockImage} alt="bis icon" />
                        <input type="text" id="date" />
                      </div>
                    </div>
                    <div className="pause">
                      <label>Pause</label>
                      <div className="pause__content">
                        <img src={ClockImage} alt="pause icon" />
                        <input type="text" id="date" />
                      </div>
                    </div>
                    <div className="zeit">
                      <label>Zeit</label>
                      <div className="zeit__content">
                        <img src={ClockImage} alt="zeit icon" />
                        <input type="text" id="date" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/* footer модального окна */}
            <div className="modal-footer">
              <div className="footer-desc">
                {props.footer_desc ? props.footer_desc : ""}
              </div>
              <div className="footer-buttons">
                {props.footer_delete ? (
                  <button className="footer-delete">
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.2502 9.85417C8.2502 9.47447 8.558 9.16667 8.9377 9.16667C9.31739 9.16667 9.6252 9.47447 9.6252 9.85417V14.8958C9.6252 15.2755 9.31739 15.5833 8.9377 15.5833C8.558 15.5833 8.2502 15.2755 8.2502 14.8958V9.85417ZM12.3752 9.85417C12.3752 9.47447 12.683 9.16667 13.0627 9.16667C13.4424 9.16667 13.7502 9.47447 13.7502 9.85417V14.8958C13.7502 15.2755 13.4424 15.5833 13.0627 15.5833C12.683 15.5833 12.3752 15.2755 12.3752 14.8958V9.85417Z"
                        fill="#E03333"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8.15853 9.85417C8.15853 9.42384 8.50737 9.075 8.9377 9.075C9.36802 9.075 9.71686 9.42384 9.71686 9.85417V14.8958C9.71686 15.3262 9.36802 15.675 8.9377 15.675C8.50737 15.675 8.15853 15.3262 8.15853 14.8958V9.85417ZM8.9377 9.25833C8.60863 9.25833 8.34186 9.5251 8.34186 9.85417V14.8958C8.34186 15.2249 8.60863 15.4917 8.9377 15.4917C9.26676 15.4917 9.53353 15.2249 9.53353 14.8958V9.85417C9.53353 9.5251 9.26676 9.25833 8.9377 9.25833ZM12.2835 9.85417C12.2835 9.42384 12.6324 9.075 13.0627 9.075C13.493 9.075 13.8419 9.42384 13.8419 9.85417V14.8958C13.8419 15.3262 13.493 15.675 13.0627 15.675C12.6324 15.675 12.2835 15.3262 12.2835 14.8958V9.85417ZM13.0627 9.25833C12.7336 9.25833 12.4669 9.5251 12.4669 9.85417V14.8958C12.4669 15.2249 12.7336 15.4917 13.0627 15.4917C13.3918 15.4917 13.6585 15.2249 13.6585 14.8958V9.85417C13.6585 9.5251 13.3918 9.25833 13.0627 9.25833Z"
                        fill="#E03333"
                      />
                      <path
                        d="M4.25615 5.10714C3.93069 5.10714 3.66686 5.37098 3.66686 5.69643C3.66686 6.02188 3.93069 6.28571 4.25615 6.28571H4.88908V18.0714C4.88908 18.384 5.01785 18.6838 5.24706 18.9048C5.47628 19.1258 5.78715 19.25 6.11131 19.25H15.8891C16.2132 19.25 16.5241 19.1258 16.7533 18.9048C16.9825 18.6838 17.1113 18.384 17.1113 18.0714V6.28571H17.7442C18.0697 6.28571 18.3335 6.02188 18.3335 5.69643C18.3335 5.37098 18.0697 5.10714 17.7442 5.10714H4.25615ZM6.11131 18.0714V6.28571H15.8891V18.0714H6.11131ZM8.55575 3.33929C8.55575 3.01383 8.81958 2.75 9.14504 2.75H12.8554C13.1808 2.75 13.4446 3.01383 13.4446 3.33929C13.4446 3.66474 13.1808 3.92857 12.8554 3.92857H9.14504C8.81958 3.92857 8.55575 3.66474 8.55575 3.33929Z"
                        fill="#E03333"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M4.25615 5.19881C3.98132 5.19881 3.75853 5.4216 3.75853 5.69643C3.75853 5.97126 3.98132 6.19405 4.25615 6.19405H4.98075V18.0714C4.98075 18.3586 5.09902 18.6347 5.31069 18.8388C5.52248 19.043 5.81041 19.1583 6.11131 19.1583H15.8891C16.19 19.1583 16.4779 19.043 16.6897 18.8388C16.9014 18.6347 17.0196 18.3586 17.0196 18.0714V6.19405H17.7442C18.0191 6.19405 18.2419 5.97126 18.2419 5.69643C18.2419 5.4216 18.0191 5.19881 17.7442 5.19881H4.25615ZM3.5752 5.69643C3.5752 5.32035 3.88007 5.01548 4.25615 5.01548H17.7442C18.1203 5.01548 18.4252 5.32035 18.4252 5.69643C18.4252 6.07251 18.1203 6.37738 17.7442 6.37738H17.203V18.0714C17.203 18.4094 17.0637 18.7329 16.817 18.9708C16.5703 19.2086 16.2365 19.3417 15.8891 19.3417H6.11131C5.7639 19.3417 5.43007 19.2086 5.18344 18.9708C4.93669 18.7329 4.79742 18.4094 4.79742 18.0714V6.37738H4.25615C3.88007 6.37738 3.5752 6.07251 3.5752 5.69643ZM6.01964 6.19405H15.9808V18.1631H6.01964V6.19405ZM6.20297 6.37738V17.9798H15.7974V6.37738H6.20297Z"
                        fill="#E03333"
                      />
                    </svg>
                  </button>
                ) : null}
                <button
                  className="footer-decline"
                  onClick={() => props.toggle()}
                >
                  Abbrechen
                </button>
                <button className="footer-confirm">Erstellen</button>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </Styles>
  );
};

export default Modal;