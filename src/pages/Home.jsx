import React from "react";
import Header from "../components/Header/Header";
import { useNavigate, Route, Routes } from "react-router";
import Dashboard from "../tabs/Dashboard/Dashboard";
import YearSummary from "../tabs/Reports/Excel/Excel";
import Error from "./Error";
import Holidays from "../tabs/Holidays/Holidays";
import Timesheet from "../tabs/Timesheet/Timesheet";
import Notes from "../tabs/Notes/Notes";
import Projects from "../tabs/Projects/Projects";
import Excel from "../tabs/Reports/YearSummary/YearSummary";
import { useSelector } from "react-redux";

const Home = () => {
  const { loading, scrfTokenStatus, error } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();

  React.useEffect(() => {
    if (scrfTokenStatus !== 204) {
      navigate("/login");
    }
  }, [scrfTokenStatus]);

  return (
    <>
      <Header />
      <Routes>
        <Route index path="/" element={<Dashboard />} />
        <Route path="/timesheet" element={<Timesheet />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/reports/excel" element={<Excel />} />
        <Route path="/reports/year-summary" element={<YearSummary />} />
        <Route path="/holidays" element={<Holidays />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/*" element={<Error />} />
      </Routes>
    </>
  );
};

export default Home;
