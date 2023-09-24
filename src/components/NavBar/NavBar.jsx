import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./NavBar.css";
import { CartWidget } from "../CartWidget";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCategories } from "../../api/categories";

function OwnNavBar() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((categoriesResult) => {
      setCategories(categoriesResult);
    });
  }, []);

  return (
    <Navbar fixed="top" expand="lg" className={["bg-body-tertiary, navbar"]}>
      <Container>
        <Navbar className="bg-body-tertiary navbar">
          <Container className="navbar-cointainer">
            <Link to="/">
              <Navbar.Brand className="navbar-brand">
                <img src="/images/logo.png" className="logo" alt="React Bootstrap logo" />
              </Navbar.Brand>
            </Link>
          </Container>
        </Navbar>
        <Link to="/">
          <Navbar.Brand> ENM Clothing Store✨</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Products" id="basic-nav-dropdown">
              {categories.map((category) => (
                <NavDropdown.Item as={Link} to={`/category/${category.slug}`} key={category.id}>
                  {category.name}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        <CartWidget />
      </Container>
    </Navbar>
  );
}

export default OwnNavBar;
