import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./NavBar.css";
import CartWidget from "../CartWidget/CartWidget";

function OwnNavBar() {
  return (
    <Navbar fixed="top" expand="lg" className={["bg-body-tertiary, navbar"]}>
      <Container>
        <Navbar className="bg-body-tertiary navbar">
          <Container className="navbar-cointainer">
            <Navbar.Brand className="navbar-brand">
              <img src="/images/logo.png" className="logo" alt="React Bootstrap logo" />
            </Navbar.Brand>
          </Container>
        </Navbar>
        <Navbar.Brand href="#home">ENM Clothing Store✨</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Products" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={onItemClicked} href="#action/3.1">
                Dress
              </NavDropdown.Item>
              <NavDropdown.Item onClick={onItemClicked} href="#action/3.2">
                Pants
              </NavDropdown.Item>
              <NavDropdown.Item onClick={onItemClicked} href="#action/3.3">
                Shirts
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        <CartWidget />
      </Container>
    </Navbar>
  );
}

const onItemClicked = () => {
  alert("Item clicked");
};

export default OwnNavBar;
