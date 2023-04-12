import React from "react";
import Header from "../components/Header/Header";
import { Route, Routes } from "react-router";
import Dashboard from "../components/Dashboard/Dashboard";
import DaysOfWork from "../components/DaysOfWork/DaysOfWork";
import Error from "./Error";
import Holidays from "../components/Holidays/Holidays";
import { Container } from "react-bootstrap";
import Projects from "../components/Projects/Projects";
import Notes from "../components/Notes/Notes";
import Contracts from "../components/Contracts/Contracts";
import Calendar from "../components/Calendar/Calendar";

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
