import Button from "components/Button";
import { useState, useRef, useEffect } from "react";
import s from "./styles.module.scss";
import Task from "../Task";
import { renameBoardColumn, createBoardTask } from "actions/boards";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Draggable, Droppable } from "react-beautiful-dnd";

const Column = ({ id, name, index, tasks, onDelete, onEditTask }) => {
  const [columnName, setColumnName] = useState(name);
  const [newTaskName, setNewTaskName] = useState("");
  const [visibleCreateTaskForm, setVisibleCreateTaskForm] = useState(false);
  const fieldRef = useRef(null);
  const hiddenTaskRef = useRef(null);
  const dispatch = useDispatch();
  const params = useParams();
  useEffect(() => {
    setColumnName(name);
  }, [name]);
  useEffect(() => {
    fieldRef.current =
      id && document.querySelector(`li[column-id='${id}'] header input`);
  }, [id]);
  const handleSaveColumnName = (e) => {
    const l = columnName.length;
    if (!l || l > 36) {
      setColumnName(name);
    } else if (l > 0 && l <= 36 && e !== "submit" && columnName !== name) {
      dispatch(renameBoardColumn(params.id, id, columnName));
    }
    fieldRef.current?.blur();
  };
  const handleCreateTask = () => {
    const l = newTaskName.length;
    if (l > 0 && l <= 48) {
      const task = {
        id: uuidv4(),
        name: newTaskName,
        // position: tasks.length + 1,
        column_id: id,
      };
      dispatch(createBoardTask(params.id, task));
      setNewTaskName("");
      setTimeout(
        () =>
          hiddenTaskRef.current.scrollIntoView({
            block: "end",
          }),
        300
      );
    }
  };
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <li
          className={s.column}
          column-id={id}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <header className={s.header}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveColumnName("submit");
              }}
            >
              <input
                type="text"
                name="column_name"
                value={columnName}
                onChange={(e) => setColumnName(e.target.value)}
                onBlur={handleSaveColumnName}
              />
            </form>
            <div className={s.moreBtnWrap}>
              <span className={s.moreBtn}>&#xE94E;</span>
              <ul className={s.menu}>
                <li onClick={() => onDelete(id)}>Delete</li>
              </ul>
            </div>
          </header>
          <Droppable droppableId={id} type="TASK">
            {(provided) => (
              <ul
                className={s.tasks}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {tasks.map((task, index) => (
                  <Task
                    id={task.id}
                    key={task.id}
                    index={index}
                    onEdit={onEditTask}
                  >
                    {task.name}
                  </Task>
                ))}
                {provided.placeholder}
                <li ref={hiddenTaskRef} className={s.hiddenTask}></li>
              </ul>
            )}
          </Droppable>
          <footer className={s.footer}>
            {visibleCreateTaskForm ? (
              <form
                className={s.createTaskForm}
                onSubmit={(e) => {
                  e.preventDefault();
                  handleCreateTask();
                }}
              >
                <textarea
                  value={newTaskName}
                  onChange={(e) => setNewTaskName(e.target.value)}
                  placeholder="Ввести заголовок для этой карточки"
                  autoFocus={true}
                />
                <div className={s.btns}>
                  <Button styled="green" type="submit">
                    Добавить карточку
                  </Button>
                  <span
                    className={s.closeBtn}
                    onClick={() => setVisibleCreateTaskForm(false)}
                  >
                    &#xE91A;
                  </span>
                </div>
              </form>
            ) : (
              <button
                className={s.createTaskBtn}
                onClick={() => setVisibleCreateTaskForm(true)}
              >
                <span>&#xE901;</span> Добавить еще одну карточку
              </button>
            )}
          </footer>
        </li>
      )}
    </Draggable>
  );
};
export default Column;
