import { NavLink } from "react-router-dom";
import s from "./styles.module.scss";
import PropTypes from "prop-types";

const NavLinkComponent = ({ title, icon, path }) => (
  <li className={s.linkWrap}>
    <NavLink
      to={path}
      className={s.link}
      activeClassName={s.active}
      exact={true}
    >
      <span className={s.icon}>{icon}</span>
      <span className={s.title}>{title}</span>
    </NavLink>
  </li>
);
NavLinkComponent.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
  path: PropTypes.string,
};
NavLinkComponent.defaultProps = {
  title: "",
  icon: "",
  path: "/",
};

export default NavLinkComponent;
