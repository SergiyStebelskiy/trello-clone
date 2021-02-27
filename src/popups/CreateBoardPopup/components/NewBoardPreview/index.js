import { useState } from "react";
import s from "./styles.module.scss";
import Button from "components/Button";
import { ReactComponent as Close } from "icons/close-popup.svg";
import { useDispatch } from "react-redux";
import { changePopup } from "actions/popup";

const NewBoardPreview = ({ boardBg, onCreate }) => {
  const [boardName, setBoardName] = useState("");
  const dispatch = useDispatch();

  return (
    <div className={s.boardPreview}>
      <div
        className={s.newBoard}
        style={{
          backgroundImage: boardBg.type === "image" && `url(${boardBg.bg.big})`,
          backgroundColor: boardBg.type === "color" && boardBg.bg,
        }}
      >
        <input
          type="text"
          placeholder="Добавить заголовок доски"
          value={boardName}
          onChange={(e) => setBoardName(e.target.value)}
        />
        <Close
          className={s.closePopupBtn}
          onClick={() => dispatch(changePopup(null))}
        />
      </div>
      <Button
        className={s.createBoardBtn}
        disabled={!boardName.length || boardName.length > 48}
        styled="green"
        onClick={() =>
          boardName.length > 0 && boardName.length <= 48 && onCreate(boardName)
        }
      >
        Создать доску
      </Button>
    </div>
  );
};

export default NewBoardPreview;
