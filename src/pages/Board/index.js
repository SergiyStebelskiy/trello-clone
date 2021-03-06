import { useEffect, useState } from "react";
import s from "./styles.module.scss";
import TopWrapper from "./components/TopWrapper";
import Column from "./components/Column";
import Button from "components/Button";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  createBoardColumn,
  changeBoardColumns,
  changeBoardTasks,
  deleteBoardColumn,
  deleteBoardTask,
  renameBoardTask,
} from "actions/boards";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import EditTaskPopup from "./popups/EditTaskPopup";

const BoardPage = () => {
  const [visibleAddColumnForm, setVisibleAddColumnForm] = useState(false);
  const [newColumnVal, setNewColumnVal] = useState("");
  const [board, setBoard] = useState({
    name: "",
    id: null,
    bg: {},
    tasks: [],
    columns: [],
    choosen: false,
  });
  const [editTaskPopup, setEditTaskPopup] = useState(null);
  const history = useHistory();
  const params = useParams();
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const { name, bg, bgType, tasks, columns, choosen } = board;
  useEffect(() => {
    const board = boards.filter((e) => e.id === params.id)?.[0];
    if (!board?.id) {
      history.push("/boards");
    } else {
      setBoard(board);
    }
  }, [history, params.id, boards]);

  const handleCreateColumn = () => {
    const l = newColumnVal.length;
    if (l > 0 && l <= 36) {
      const column = {
        id: uuidv4(),
        name: newColumnVal,
      };
      dispatch(createBoardColumn(params.id, column));
      setVisibleAddColumnForm(false);
      setNewColumnVal("");
    }
  };
  const handleDeleteColumn = (id) => {
    dispatch(deleteBoardColumn(params.id, id));
  };
  const handleDeleteTask = (id) => {
    dispatch(deleteBoardTask(params.id, id));
    setEditTaskPopup(null);
  };
  const handleRenameTask = (id, newName) => {
    dispatch(renameBoardTask(params.id, id, newName));
    setEditTaskPopup(null);
  };
  const handleDragEnd = ({ destination, source, type }) => {
    if (type === "COLUMN" && destination) {
      const sourceColumn = columns[source.index];
      if (destination.index === source.index) {
        return;
      } else if (source.index < destination.index) {
        const prevDestinationColumns = columns.slice(0, destination.index + 1);
        const newPrevDestinationColumns = prevDestinationColumns.filter(
          (e, index) => index !== source.index
        );
        const nextDestinationColumns = columns.slice(destination.index + 1);
        const newColumns = [
          ...newPrevDestinationColumns,
          sourceColumn,
          ...nextDestinationColumns,
        ];
        setBoard({ ...board, columns: newColumns });
        dispatch(changeBoardColumns(params.id, newColumns));
      } else if (source.index > destination.index) {
        const prevDestinationColumns = columns.slice(0, destination.index);
        const nextDestinationColumns = columns.slice(destination.index);
        const newNextDestinationColumns = nextDestinationColumns.filter(
          (e, index) => index + destination.index !== source.index
        );
        const newColumns = [
          ...prevDestinationColumns,
          sourceColumn,
          ...newNextDestinationColumns,
        ];
        setBoard({ ...board, columns: newColumns });
        dispatch(changeBoardColumns(params.id, newColumns));
      }
    } else if (type === "TASK" && destination) {
      const sourceColumnTasks = tasks.filter(
        (e) => e.column_id === source?.droppableId
      );
      const otherColumnTasks = tasks.filter(
        (e) => e.column_id !== destination?.droppableId
      );
      const destinationColumnTasks = tasks.filter(
        (e) => e.column_id === destination?.droppableId
      );
      const sourceTask = sourceColumnTasks[source.index];
      if (
        destination?.droppableId === source?.droppableId &&
        destination.index === source.index
      ) {
        return null;
      } else if (destination?.droppableId === source?.droppableId) {
        if (source.index < destination.index) {
          const prevDestinationTasks =
            destinationColumnTasks
              .slice(0, destination.index + 1)
              .filter((e) => e.id !== sourceTask.id) || [];
          const nextDestinationTasks = destinationColumnTasks.slice(
            destination.index + 1
          );
          const newColumnTasks = [
            ...prevDestinationTasks,
            sourceTask,
            ...nextDestinationTasks,
          ];
          dispatch(
            changeBoardTasks(params.id, [
              ...otherColumnTasks,
              ...newColumnTasks,
            ])
          );
        } else {
          const prevDestinationTasks =
            destinationColumnTasks.slice(0, destination.index) || [];
          const nextDestinationTasks = destinationColumnTasks
            .slice(destination.index)
            .filter((e) => e.id !== sourceTask.id);
          const newColumnTasks = [
            ...prevDestinationTasks,
            sourceTask,
            ...nextDestinationTasks,
          ];
          dispatch(
            changeBoardTasks(params.id, [
              ...otherColumnTasks,
              ...newColumnTasks,
            ])
          );
        }
      } else {
        const prevDestinationTasks =
          destinationColumnTasks.slice(0, destination.index) || [];
        const nextDestinationTasks = destinationColumnTasks.slice(
          destination.index
        );
        const newColumnTasks = [
          ...prevDestinationTasks,
          { ...sourceTask, column_id: destination?.droppableId },
          ...nextDestinationTasks,
        ];
        dispatch(
          changeBoardTasks(params.id, [
            ...otherColumnTasks.filter((e) => e.id !== sourceTask.id),
            ...newColumnTasks,
          ])
        );
      }
    }
  };
  return (
    <div
      className={s.boardWrap}
      style={{
        backgroundImage: bgType === "image" && `url(${bg.big})`,
        backgroundColor: bgType === "color" && bg,
      }}
    >
      <TopWrapper name={name} choosen={choosen} />
      <div className={s.wrap}>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="board" type="COLUMN" direction="horizontal">
            {(provided, snapshot) => (
              <ul
                className={s.columns}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {columns.map((column, index) => (
                  <Column
                    key={column.id}
                    {...column}
                    tasks={tasks.filter((e) => e.column_id === column.id)}
                    index={index}
                    onDelete={handleDeleteColumn}
                    onDeleteTask={handleDeleteTask}
                    onEditTask={(pos, task) =>
                      setEditTaskPopup({ position: pos, data: task })
                    }
                  />
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
        <div className={s.createColumnWrap}>
          {visibleAddColumnForm ? (
            <form
              className={s.createColumnForm}
              onSubmit={(e) => {
                e.preventDefault();
                handleCreateColumn();
              }}
            >
              <input
                type="text"
                placeholder="Ввести заголовок списка"
                autoFocus={true}
                value={newColumnVal}
                onChange={(e) => setNewColumnVal(e.target.value)}
              />
              <div className={s.btns}>
                <Button
                  styled="green"
                  type="submit"
                  ariaLabel="Добавить список"
                >
                  Добавить список
                </Button>
                <span
                  className={s.closeBtn}
                  onClick={() => setVisibleAddColumnForm(false)}
                >
                  &#xE91A;
                </span>
              </div>
            </form>
          ) : (
            <Button
              className={s.createBtn}
              icon="&#xE901;"
              onClick={() => setVisibleAddColumnForm(true)}
              ariaLabel="Добавить колонку"
            >
              Добавьте еще одну колонку
            </Button>
          )}
        </div>
      </div>
      {editTaskPopup && (
        <EditTaskPopup
          {...editTaskPopup}
          onClose={() => setEditTaskPopup(null)}
          onRename={handleRenameTask}
          onDelete={handleDeleteTask}
        />
      )}
    </div>
  );
};

export default BoardPage;
