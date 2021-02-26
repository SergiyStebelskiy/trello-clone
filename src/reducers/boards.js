let initialState = [];

const boards = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "CREATE_BOARD": {
      return [...state, payload];
    }
    case "RENAME_BOARD": {
      return state.map((e) =>
        e.id === payload.boardId ? { ...e, name: payload.name } : e
      );
    }
    case "DELETE_BOARD": {
      return state.filter((e) => e.id !== payload);
    }
    case "CREATE_COLUMN": {
      return state.map((e) =>
        e.id === payload.boardId
          ? { ...e, columns: [...e.columns, payload.column] }
          : e
      );
    }
    case "RENAME_COLUMN": {
      return state.map((e) =>
        e.id === payload.boardId
          ? {
              ...e,
              columns: e.columns.map((e) =>
                e.id === payload.columnId ? { ...e, name: payload.name } : e
              ),
            }
          : e
      );
    }
    case "DELETE_COLUMN": {
      return state.map((e) =>
        e.id === payload.boardId
          ? {
              ...e,
              columns: e.columns.filter((e) => e.id !== payload.columnId),
            }
          : e
      );
    }
    case "CREATE_TASK": {
      return state.map((e) =>
        e.id === payload.boardId
          ? { ...e, tasks: [...e.tasks, payload.task] }
          : e
      );
    }
    case "DELETE_TASK": {
      return state.map((e) =>
        e.id === payload.boardId
          ? { ...e, tasks: e.tasks.filter((e) => e.id !== payload.taskId) }
          : e
      );
    }
    case "RENAME_TASK": {
      return state.map((e) =>
        e.id === payload.boardId
          ? {
              ...e,
              tasks: e.tasks.map((e) =>
                e.id === payload.taskId ? { ...e, name: payload.newName } : e
              ),
            }
          : e
      );
    }
    case "CHANGE_COLUMNS": {
      return state.map((e) =>
        e.id === payload.boardId ? { ...e, columns: payload.columns } : e
      );
    }
    case "CHANGE_TASKS": {
      return state.map((e) =>
        e.id === payload.boardId ? { ...e, tasks: payload.tasks } : e
      );
    }
    default: {
      return state;
    }
  }
};

export default boards;
