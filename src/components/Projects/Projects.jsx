import React from "react";
import { Container, Table } from "react-bootstrap";

import styled from "styled-components";
import SideBar from "../SideBar/SideBar";

const Styles = styled.div`
  .projects-wrapper {
    width: 100%;
    height: 100vh;
    background: #f6f6f6;
  }
`;

const columnTitle = [
  { title: "KW", size: "col-1" },
  { title: "Datum", size: "col-1" },
  { title: "Projekt", size: "col-2" },
  { title: "Von", size: "col-1" },
  { title: "Bis", size: "col-1" },
  { title: "Pause", size: "col-1" },
  { title: "Zeit", size: "col-1" },
  { title: "PT", size: "col-1" },
  { title: "Tätigkeiten", size: "col-3" },
];

const Projects = () => {
  return (
    <Styles>
      <div className="projects-wrapper">
        <SideBar />
        <Container>
          <div>
            Projects
            <Table className="" responsive>
              <thead>
                <tr>
                  {columnTitle.map((item, index) => (
                    <th className={item.size} key={index}>
                      {item.title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {Array.from({ length: 9 }).map((_, index) => (
                    <td key={index}>Table test {index}</td>
                  ))}
                </tr>
                <tr>
                  {Array.from({ length: 9 }).map((_, index) => (
                    <td key={index}>Table test {index}</td>
                  ))}
                </tr>
                <tr>
                  {Array.from({ length: 9 }).map((_, index) => (
                    <td key={index}>Table test {index}</td>
                  ))}
                </tr>
              </tbody>
            </Table>
          </div>
        </Container>
      </div>
    </Styles>
  );
};

export default Projects;
