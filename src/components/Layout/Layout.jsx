import { Footer } from "../Footer";
import { NavBar } from "../NavBar";

const Layout = ({ children }) => {
  return (
    <>
      <NavBar />
      <div>{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
