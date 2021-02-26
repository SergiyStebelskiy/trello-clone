import { useState, useEffect, useRef } from "react";
import s from "./styles.module.scss";
import { Draggable } from "react-beautiful-dnd";
import composeRefs from "@seznam/compose-react-refs";

const Task = ({ id, children, index, onEdit }) => {
  const [taskPos, setTaskPos] = useState(null);
  const taskRef = useRef(null);
  useEffect(() => {
    taskRef && setTaskPos(taskRef.current.getBoundingClientRect());
  }, []);
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <li
          className={s.task}
          ref={composeRefs(provided.innerRef, taskRef)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <span className={s.name}>{children}</span>
          <span
            className={s.editBtn}
            onClick={() => onEdit(taskPos, { id, name: children })}
          >
            &#xE925;
          </span>
        </li>
      )}
    </Draggable>
  );
};

export default Task;
