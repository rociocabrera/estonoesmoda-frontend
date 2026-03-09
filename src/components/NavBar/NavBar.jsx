import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./NavBar.css";
import { CartWidget } from "../CartWidget";
import { Link, useNavigate } from "react-router-dom";
import { Search, PersonCircle, Heart } from "react-bootstrap-icons";
import { useState, useContext, useEffect } from "react";
import { WishlistContext } from "../../context/WishlistContext";
import { getCategories } from "../../api/categories";

function OwnNavBar() {
    const [searchTerm, setSearchTerm] = useState("");
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    const { getWishlistCount } = useContext(WishlistContext);
    const wishlistCount = getWishlistCount();

    useEffect(() => {
        getCategories().then((categoriesResult) => {
            setCategories(categoriesResult);
        });
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
            setSearchTerm("");
        }
    };

    return (
        <Navbar fixed="top" className="navBar">
            <Container className="navContainer">
                <Link to="/" className="logoLink">
                    <Navbar.Brand className="navbar-brand">
                        <img src="/images/logo.png" className="navBarLogo" alt="Esto no es Moda - logo" />
                    </Navbar.Brand>
                </Link>

                <form className="searchForm" onSubmit={handleSearch}>
                    <input type="text" placeholder="Buscar productos..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="searchInput" />
                    <button type="submit" className="searchBtn">
                        <Search />
                    </button>
                </form>

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className={["me-auto", "navBarContent"]}>
                        <NavDropdown title="Productos">
                            {categories.map((category) => (
                                <NavDropdown.Item
                                    key={category.id}
                                    className="dropdownItem"
                                    as={Link}
                                    to={`/category/${category.slug}`}
                                >
                                    {category.name}
                                </NavDropdown.Item>
                            ))}
                        </NavDropdown>
                        <Link to="/about" className="navLink">
                            Nosotros
                        </Link>
                        <Link to="/size-guide" className="navLink">
                            Tallas
                        </Link>
                        <NavDropdown title="Ayuda" className="helpDropdown">
                            <NavDropdown.Item className="dropdownItem" as={Link} to="/contact">
                                Contacto
                            </NavDropdown.Item>
                            <NavDropdown.Item className="dropdownItem" as={Link} to="/shipping">
                                Envíos
                            </NavDropdown.Item>
                            <NavDropdown.Item className="dropdownItem" as={Link} to="/returns">
                                Devoluciones
                            </NavDropdown.Item>
                            <NavDropdown.Item className="dropdownItem" as={Link} to="/faq">
                                Preguntas Frecuentes
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
                <div className="navBarActions">
                    <Link to="/wishlist" className="wishlistIcon" aria-label="Mis favoritos">
                        <Heart />
                        {wishlistCount > 0 && <span className="wishlistBadge">{wishlistCount}</span>}
                    </Link>
                    <Link to="/login" className="loginIcon" aria-label="Iniciar sesión">
                        <PersonCircle />
                    </Link>
                    <CartWidget />
                </div>
            </Container>
        </Navbar>
    );
}

export default OwnNavBar;
