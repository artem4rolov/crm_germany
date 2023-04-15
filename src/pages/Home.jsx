import React from "react";
import Header from "../components/Header/Header";
import { Route, Routes } from "react-router";
import Dashboard from "../tabs/Dashboard/Dashboard";
import DaysOfWork from "../tabs/DaysOfWork/DaysOfWork";
import Error from "./Error";
import Holidays from "../tabs/Holidays/Holidays";
import Projects from "../tabs/Projects/Projects";
import Notes from "../tabs/Notes/Notes";
import Contracts from "../tabs/Contracts/Contracts";
import Calendar from "../tabs/Calendar/Calendar";

const Home = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route index path="/" element={<Dashboard />} />
        <Route path="/daysofwork" element={<DaysOfWork />} />
        <Route path="/holidays" element={<Holidays />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/contracts" element={<Contracts />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/*" element={<Error />} />
      </Routes>
    </>
  );
};

export default Home;
