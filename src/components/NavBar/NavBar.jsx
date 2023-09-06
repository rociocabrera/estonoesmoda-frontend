import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./NavBar.css";
import CartWidget from "../CartWidget/CartWidget";

function BasicExample() {
  return (
    <Navbar fixed="top" expand="lg" className={["bg-body-tertiary, navbar"]}>
      <Container>
        <Navbar className="bg-body-tertiary">
          <Container>
            <Navbar.Brand href="#home">
              <img src="/images/logo.png" width="30" height="30" className="d-inline-block align-top" alt="React Bootstrap logo" />
            </Navbar.Brand>
          </Container>
        </Navbar>
        <Navbar.Brand href="#home">Esto no es Moda</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={onItemClicked} href="#action/3.1">
                Action
              </NavDropdown.Item>
              <NavDropdown.Item onClick={onItemClicked} href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item onClick={onItemClicked} href="#action/3.3">
                Something
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={onItemClicked} href="#action/3.4">
                Separated link
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

export default BasicExample;
