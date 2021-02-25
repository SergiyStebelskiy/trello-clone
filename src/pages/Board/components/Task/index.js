import s from "./styles.module.scss";
import { Draggable } from "react-beautiful-dnd";
import { ReactComponent as DeleteIcon } from "icons/close.svg";

const Task = ({ id, children, index, onDelete }) => (
  <Draggable draggableId={id} index={index}>
    {(provided) => (
      <li
        className={s.task}
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        <span className={s.name}>{children}</span>
        <span className={s.deleteBtn} onClick={() => onDelete(id)}>
          <DeleteIcon />
        </span>
      </li>
    )}
  </Draggable>
);

export default Task;
