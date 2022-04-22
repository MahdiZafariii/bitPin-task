import Menu from "../Components/Menu/Menu";
import "./layout.scss";

const Layout = ({ children }) => {
  return (
    <>
      <section className="layout">
        <Menu />
        {children}
      </section>
    </>
  );
};

export default Layout;
