import React from "react";
import Header from "../components/Header/Header";
import { useNavigate, Route, Routes } from "react-router";
import Dashboard from "../tabs/Dashboard/Dashboard";
import Excel from "../tabs/Reports/Excel/Excel";
import Error from "./Error";
import Holidays from "../tabs/Holidays/Holidays";
import Timesheet from "../tabs/Timesheet/Timesheet";
import Notes from "../tabs/Notes/Notes";
import Projects from "../tabs/Projects/Projects";
import { useSelector } from "react-redux";
import YearSummaryComponent from "../tabs/Reports/YearSummary/YearSummary";

const Home = () => {
  const { loading, isAuth, userStatus, error } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();

  React.useEffect(() => {
    if (userStatus !== 200 || error) {
      navigate("/login");
    }
  }, [userStatus]);

  return (
    <>
      <Header />
      <Routes>
        <Route index path="/" element={<Dashboard />} />
        <Route path="/timesheet" element={<Timesheet />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/reports/excel" element={<Excel />} />
        <Route
          path="/reports/year-summary"
          element={<YearSummaryComponent />}
        />
        <Route path="/holidays" element={<Holidays />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/*" element={<Error />} />
      </Routes>
    </>
  );
};

export default Home;
