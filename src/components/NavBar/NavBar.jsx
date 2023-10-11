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
    <Navbar fixed="top" className="navBar">
      <Container>
        <Link to="/">
          <Navbar.Brand className="navbar-brand">
            <img src="/images/logo.png" className="navBarLogo" alt="React Bootstrap logo" />
          </Navbar.Brand>
        </Link>
        <Link to="/">
          <span className="d-none d-lg-inline nameStore">Clothing Store✨</span>
        </Link>
        <Navbar.Toggle className="navBarToggler" aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Products" id="basic-nav-dropdown">
              {categories.map((category) => (
                <NavDropdown.Item className="dropdownItem" as={Link} to={`/category/${category.slug}`} key={category.id}>
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
