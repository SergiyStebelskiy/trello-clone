import { useEffect, useState, useRef } from "react";
import s from "./styles.module.scss";
import AutosizeInput from "components/AutosizeInput";
import Button from "components/Button";
import { renameBoard } from "actions/boards";
import { useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import useOutsideClicker from "hooks/useOutsideClicker";
import { deleteBoard } from "actions/boards";

const TopWrapper = ({ name }) => {
  const [nameVal, setNameVal] = useState(name);
  const [visibleMenu, setVisibleMenu] = useState(false);
  const dispatch = useDispatch();
  const params = useParams();
  const history = useHistory();
  let fieldNode = document.querySelector("input[name='board_name']");
  const menuRef = useRef(null);

  useOutsideClicker(menuRef, () => {
    setVisibleMenu(false);
  });

  useEffect(() => setNameVal(name), [name]);
  const handleSaveName = (e) => {
    const l = nameVal.length;
    if (l > 0 && l <= 48 && nameVal !== name && e !== "submit") {
      dispatch(renameBoard(params.id, nameVal));
    } else if (!l || l > 48) {
      setNameVal(name);
    }
    fieldNode?.blur();
  };
  const handleDeleteBoard = () => {
    dispatch(deleteBoard(params.id));
    history.push("/boards");
  };
  return (
    <div className={s.topWrapper}>
      <div className={s.col}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSaveName("submit");
          }}
        >
          <AutosizeInput
            value={nameVal}
            name="board_name"
            onChange={(e) => setNameVal(e.target.value)}
            onBlur={handleSaveName}
          />
        </form>
        <Button className={s.starBtn} icon="&#xE95F;" />
      </div>
      <div className={s.menuWrap} ref={menuRef}>
        <Button
          className={s.menuBtn}
          icon="&#xE94E;"
          onClick={() => setVisibleMenu(!visibleMenu)}
        >
          Меню
        </Button>
        {visibleMenu && (
          <ul className={s.menu}>
            <li onClick={handleDeleteBoard}>Удалить</li>
          </ul>
        )}
      </div>
    </div>
  );
};
export default TopWrapper;
