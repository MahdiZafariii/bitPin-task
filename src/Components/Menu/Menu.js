import { NavLink } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { FaRegBookmark } from "react-icons/fa";
import "./Menu.scss";

const Menu = () => {
  return (
    <nav>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "activeLink" : "")}
        >
          <AiOutlineHome />
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/bookmark"
          className={({ isActive }) => (isActive ? "activeLink" : "")}
        >
          <FaRegBookmark />
        </NavLink>
      </li>
    </nav>
  );
};

export default Menu;
