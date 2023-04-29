import { Route, Routes, useNavigate } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import React from "react";
import { useDispatch } from "react-redux";
import { testAuth } from "./redux/slices/auth/authActions";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    // отправляем на бэк объект со свойствами email и password и с соответствующими ключами
    dispatch(testAuth());
  }, []);

  return (
    <Routes>
      <Route path="/*" element={<Home />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
