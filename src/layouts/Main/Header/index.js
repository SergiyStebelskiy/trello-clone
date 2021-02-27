import { useState } from "react";
import s from "./styles.module.scss";
import { useLocation, Link, useHistory } from "react-router-dom";
import Button from "components/Button";
import SearchField from "components/SearchField";
import { ReactComponent as Home } from "icons/home.svg";
import { ReactComponent as Board } from "icons/board.svg";
import { ReactComponent as Add } from "icons/add.svg";
import Logo from "icons/logo.png";
import { paths } from "routes/paths";
import { changePopup } from "actions/popup";
import { useDispatch } from "react-redux";

const Header = () => {
  const [searchVal, setSearchVal] = useState("");
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  return (
    <header
      className={s.header}
      style={{
        backgroundColor:
          location.pathname !== paths.boards &&
          location.pathname !== paths.home &&
          "rgba(0,0,0,.15)",
      }}
    >
      <div className={s.col}>
        <Button
          className={s.btn}
          icon={<Home />}
          onClick={() => history.push("/boards")}
          ariaLabel="Вернуться на главную страницу"
        />
        <Button
          className={s.btn}
          icon={<Board />}
          ariaLabel="Открыть меню досок"
        >
          Доски
        </Button>
        <SearchField
          className={s.searchWrap}
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
          onCrossOver={() => history.push(`/search?q=${searchVal}`)}
          onClose={() => {}}
        />
      </div>
      <Link className={s.logoLink} to="/">
        <img className={s.logo} src={Logo} alt="Trello" />
      </Link>
      <div className={s.col}>
        <Button
          className={s.btn}
          icon={<Add />}
          ariaLabel="Создать доску"
          onClick={() => dispatch(changePopup("create_board"))}
        />
      </div>
    </header>
  );
};
export default Header;
