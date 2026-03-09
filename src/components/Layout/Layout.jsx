import { Footer } from "../Footer";
import { NavBar } from "../NavBar";
import { WhatsAppButton } from "../WhatsAppButton";
import "./Layout.css";

const Layout = ({ children }) => {
  return (
    <>
      <NavBar />
      <main className="main-content">{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  );
};

export default Layout;
