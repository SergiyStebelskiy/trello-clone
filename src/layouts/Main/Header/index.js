import { useState, useEffect } from "react";
import s from "./styles.module.scss";
import classnames from "classnames";
import { useLocation, Link, useHistory } from "react-router-dom";
import Button from "components/Button";
import SearchField from "components/SearchField";
import { ReactComponent as Home } from "icons/home.svg";
import { ReactComponent as Board } from "icons/board.svg";
import { ReactComponent as Add } from "icons/add.svg";
import Logo from "icons/logo.png";
import { paths } from "routes/paths";
import { changePopup } from "actions/popup";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const [searchVal, setSearchVal] = useState("");
  const [searchedBoards, setSearchedBoards] = useState([]);
  const [visibleSearchedBoards, setVisibleSearchedBoards] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  useEffect(() => {
    if (searchVal.length) {
      setSearchedBoards(boards.filter((e) => e.name.includes(searchVal)));
    } else {
      setVisibleSearchedBoards(false);
    }
  }, [searchVal, boards, visibleSearchedBoards]);
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
          onClick={() => history.push("/")}
          ariaLabel="Вернуться на главную страницу"
        />
        <Button
          className={s.btn}
          icon={<Board />}
          ariaLabel="Открыть меню досок"
          onClick={() => history.push("/boards")}
        >
          Доски
        </Button>
        <div className={s.searchWrap}>
          <SearchField
            className={s.search}
            value={searchVal}
            onChange={(e) => {
              setSearchVal(e.target.value);
              e.target.value.length > 0 && setVisibleSearchedBoards(true);
            }}
            onClose={() => {
              console.log("test");
              setVisibleSearchedBoards(false);
              setSearchedBoards([]);
            }}
            onFocus={() =>
              searchVal.length > 0 && setVisibleSearchedBoards(true)
            }
          />
          {visibleSearchedBoards && (
            <div className={s.boardsWrap}>
              {searchedBoards.length > 0 ? (
                <ul className={s.boards}>
                  {searchedBoards.map((e, index) => (
                    <li
                      className={classnames(s.board, {
                        [s.full]: searchedBoards.length === 1,
                      })}
                      onClick={() => history.push(`/boards/${e.id}`)}
                      key={index}
                      style={{
                        backgroundImage:
                          e.bgType === "image" && `url(${e.bg.normal})`,
                        backgroundColor: e.bgType === "color" && e.bg,
                      }}
                    >
                      <div className={s.name}>{e.name}</div>
                    </li>
                  ))}
                </ul>
              ) : (
                <span className={s.empty}>
                  Не найдены доски по запросу "{searchVal}"
                </span>
              )}
            </div>
          )}
        </div>
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
