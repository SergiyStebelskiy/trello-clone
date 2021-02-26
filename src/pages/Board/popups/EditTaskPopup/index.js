import { useState, useEffect, useRef } from "react";
import Button from "components/Button";
import s from "./styles.module.scss";

const EditTaskPopup = ({ onClose, position, data, onDelete, onRename }) => {
  const [fieldVal, setFieldVal] = useState(data.name);
  const fieldRef = useRef(null);
  useEffect(() => {
    fieldRef.current.setSelectionRange(0, data.name.length);
  }, []);
  return (
    <div className={s.popupWrap}>
      <span className={s.closeBtn} onClick={onClose}>
        &#xE91A;
      </span>
      <form
        className={s.editTaskWrap}
        onSubmit={(e) => {
          e.preventDefault();
          if (fieldVal === data.name) {
            onClose();
          } else if (fieldVal.length && fieldVal.length <= 36) {
            onRename(data.id, fieldVal);
          } else {
            setFieldVal(data.name);
          }
        }}
        style={{ left: `${position.left}px`, top: `${position.top}px` }}
      >
        <textarea
          value={fieldVal}
          onChange={(e) => setFieldVal(e.target.value)}
          className={s.field}
          autoFocus={true}
          ref={fieldRef}
        />
        <Button styled="green" type="submit" className={s.btn}>
          Сохранить
        </Button>
      </form>
      <ul
        className={s.btns}
        style={{
          left: `${position.left + 254 + 8}px`,
          top: `${position.top}px`,
        }}
      >
        <li>
          <Button
            icon="&#xE907;"
            styled="black"
            className={s.btn}
            onClick={() => onDelete(data.id)}
          >
            Удалить
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default EditTaskPopup;
