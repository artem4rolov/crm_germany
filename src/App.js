import { Route, Routes, useNavigate } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { testAuth } from "./redux/slices/auth/authActions";

// для локализации дат на немецком
import "moment/locale/de"; // without this line it didn't work

const navBarData = [
  { title: "Dashboard", href: "/" },
  { title: "Zeiterfassung", href: "/timesheet" },
  { title: "Projekte", href: "/projects" },
  { title: "Leistungsnachweise", href: "/reports/excel" },
  { title: "Jahresübersicht", href: "/reports/year-summary" },
  { title: "Feiertage", href: "/holidays" },
  { title: "Notizen", href: "/notes" },
];

function App() {
  const dispatch = useDispatch();

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
