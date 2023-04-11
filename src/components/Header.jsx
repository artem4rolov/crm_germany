import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const navBarData = [
  { title: "Dashboard", href: "#1" },
  { title: "Zeiterfassung", href: "#2" },
  { title: "Projekte", href: "#3" },
  { title: "Leistungsnachweise", href: "#4" },
  { title: "Jahresübersicht", href: "#5" },
  { title: "Feiertage", href: "#6" },
  { title: "Anmerkungen", href: "#7" },
];

function Header() {
  return (
    <Navbar bg="header-bg" color="red" expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {navBarData.map((obj, index) => {
              const { title, href } = obj;

              return (
                <Nav.Link
                  key={index}
                  className={`${active ? "a" : "s"}`}
                  href={href}
                >
                  {title}
                </Nav.Link>
              );
            })}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
