import React, { useState } from "react";

import LoginImage1 from "../assets/login-image-1.svg";
import LoginImage2 from "../assets/login-image-2.svg";
import LoginModal from "../assets/login-modal-image.svg";
import styled from "styled-components";
import { Link, unstable_HistoryRouter, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../redux/slices/auth/authActions";
import Loader from "../components/Loader/Loader";

const Styles = styled.div`
  .home__button {
    position: absolute;
    color: black;
    background: white;
    cursor: pointer;

    top: 0;
    z-index: 20;
  }

  .login-wrapper {
    width: 100%;
    height: 100vh;
    background: #0854a0;
    overflow: hidden;

    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .login-image-1 {
    position: absolute;
    left: 0;
    z-index: 1;
  }

  .login-image-2 {
    position: absolute;
    right: 0;

    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  }

  .login-modal {
    width: 532px;
    height: 405px;
    background: #e7ebf0;
    border-radius: 4px 4px 4px 4px;
    padding: 56px;

    z-index: 2;
    position: relative;
  }

  .login-modal-image {
    position: absolute;
    right: 0;
    top: 0;
  }

  .modal-content {
    gap: 18px;

    input {
      width: 100%;
      background: #ffffff;
      border: 1px solid #e1e1e1;
      border-radius: 4px;
      padding: 13px;

      font-weight: 400;
      font-size: 14px;
      line-height: 19px;

      &:disabled {
        background-color: #a5a5a5;
      }

      &.error {
        border: 1px solid #b00e0e;
      }
    }

    label {
      font-weight: 500;
      font-size: 15px;
      color: #32363a;
      margin-bottom: 10px;
    }

    button {
      background: #0854a0;
      border-radius: 4px;
      padding: 13px;
      color: #ffffff;
      border: none;

      &:hover {
        background: #1944a9;
      }

      &:disabled {
        padding: 0;
        background-color: #a5a5a5;
      }
    }

    .error-message {
      width: 100%;
      text-align: center;
      font-size: 14px;
      color: #b80000;
    }
  }

  .remember-me {
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 6px;

    input {
      width: 18px;
      height: 18px;
      background: #ffffff;
      border: 1.3px solid #bebebe;
      border-radius: 3px;
    }

    label {
      width: 160px;
      font-weight: 400;
      font-size: 13px;
      line-height: 16px;
      color: #4b4e51;
      margin-bottom: 2px;
      cursor: pointer;
    }
  }
`;

const Login = () => {
  const activeTab = localStorage.getItem("activeTab");

  // достаем переменные из redux
  const { loading, userStatus, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUserName] = useState("development@test.com");
  const [password, setPassword] = useState("T4JLGBvvS2ZuUP7V");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    // отправляем на бэк объект со свойствами email и password и с соответствующими ключами
    dispatch(userLogin({ email: username, password: password }));
  };

  // если статус авторизации 200 и нет загрузки и ошибок - редиректим на главную страницу или ранее открытую страницу
  React.useEffect(() => {
    if (userStatus === 200 && !error) {
      if (activeTab) {
        navigate(`${activeTab}`);
        return;
      }
      navigate(`/`);
    }
  }, [userStatus, loading, error, navigate]);

  const handleError = () => {
    if (userStatus === 422) {
      return "Неверный логин или пароль";
    }
    return;
  };

  return (
    <Styles>
      <form>
        <div className="login-wrapper">
          {/* фоновое изображение страницы */}
          <img src={LoginImage1} className="login-image-1" alt="" />
          <img src={LoginImage2} className="login-image-2" alt="" />
          <div className="login-modal">
            {/* фоновое изображение модалки */}
            <img src={LoginModal} className="login-modal-image" alt="" />
            {/* поле ввода логина */}
            <div className="modal-content">
              <div className="login">
                <label>E-Mail</label>
                <input
                  className={`${userStatus === 422 ? "error" : ""}`}
                  type="email"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                  disabled={loading}
                />
              </div>
              {/* поле ввода пароля */}
              <div className="password">
                <label>Password</label>
                <input
                  className={`${userStatus === 422 ? "error" : ""}`}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
              </div>
              {/* галочка запомнить меня */}
              <div className="remember-me">
                <input
                  className={`remember-me-check ${
                    userStatus === 422 ? "error" : ""
                  }`}
                  type="checkbox"
                  id="check"
                />
                <label htmlFor="check" className="remember-me-label">
                  Erinnern Sie sich an mich
                </label>
              </div>
              {/* кнопка подтверждения */}
              <button type="submit" onClick={handleSubmit} disabled={loading}>
                {!loading ? "Anmelden" : <Loader small />}
              </button>
            </div>
          </div>
        </div>
      </form>
    </Styles>
  );
};

export default Login;
