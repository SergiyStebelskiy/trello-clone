import s from "./styles.module.scss";
import NavLink from "./components/NavLink";
import { navData } from "./data";

const Nav = () => {
  return (
    <nav className={s.navWrap}>
      <ul className={s.nav}>
        {navData.map((link, index) => (
          <NavLink {...link} key={index} />
        ))}
      </ul>
    </nav>
  );
};
export default Nav;
