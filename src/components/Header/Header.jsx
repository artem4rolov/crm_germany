import { Image } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import LogoDoor from "../../assets/icon_door-open.svg";
import styled from "styled-components";
import { Link } from "react-router-dom";
import React, { useState } from "react";

const Styles = styled.div`
  .navbar {
    background-color: #354a5f;
    display: flex;
    gap: 32px;
  }

  .navbar-expand-lg .navbar-nav .nav-link {
    padding: 20px 0;
  }

  .navbar-expand-lg .navbar-nav {
    gap: 20px;
  }

  a,
  .nav-link {
    color: #e5e5e5;
    text-decoration: none;
  }

  a:hover {
    color: #00ffff;
  }

  .navbar-nav .nav-link.active,
  .navbar-nav .show > .nav-link {
    color: #00ffff;
  }

  img,
  svg {
    width: 24px;
    height: 24px;
  }
`;

const navBarData = [
  { title: "Dashboard", href: "/" },
  { title: "Zeiterfassung", href: "/projects" },
  { title: "Projekte", href: "/contracts" },
  { title: "Leistungsnachweise", href: "/work_days_per_month" },
  { title: "Jahresübersicht", href: "/daysofwork" },
  { title: "Feiertage", href: "/holidays" },
  { title: "Anmerkungen", href: "/notes" },
];

function Header() {
  const [active, setActive] = useState(null);

  const handleActive = (index) => {
    setActive(index);
    localStorage.setItem("activeTab", index);
  };

  React.useEffect(() => {
    setActive(parseInt(localStorage.getItem("activeTab")));
  }, []);

  return (
    <Styles>
      <Navbar bg="header-bg" expand="lg">
        <Container>
          {/* мобильное меню */}
          {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
          {/* <Navbar.Collapse id="basic-navbar-nav"> */}
          {/* пункты меню */}
          <Nav className="me-auto">
            {navBarData.map((obj, index) => {
              const { title, href } = obj;

              return (
                <Link
                  onClick={() => handleActive(index)}
                  key={index}
                  to={href}
                  className={`nav-link ${active === index ? "active" : ""}`}
                >
                  {title}
                </Link>
              );
            })}
          </Nav>

          {/* кнопка авторизации */}
          <Link
            to="/login"
            className="nav-link d-flex justify-content-end align-items-center"
          >
            <Image className="mx-1" src={LogoDoor} alt="logout" />
            <span>Abmelden</span>
          </Link>
          {/* </Navbar.Collapse> */}
        </Container>
      </Navbar>
    </Styles>
  );
}

export default Header;
