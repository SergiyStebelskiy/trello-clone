export const createBoard = (board) => {
  return {
    type: "CREATE_BOARD",
    payload: board,
  };
};

export const renameBoard = (boardId, name) => {
  return {
    type: "RENAME_BOARD",
    payload: {
      boardId,
      name,
    },
  };
};

export const deleteBoard = (boardId) => {
  return {
    type: "DELETE_BOARD",
    payload: boardId,
  };
};

export const changeChoosenBoard = (boardId) => {
  return {
    type: "CHANGE_CHOOSEN_BOARD",
    payload: boardId,
  };
};

export const createBoardColumn = (boardId, column) => {
  return {
    type: "CREATE_COLUMN",
    payload: {
      boardId,
      column,
    },
  };
};

export const renameBoardColumn = (boardId, columnId, name) => {
  return {
    type: "RENAME_COLUMN",
    payload: {
      boardId,
      columnId,
      name,
    },
  };
};

export const deleteBoardColumn = (boardId, columnId) => {
  return {
    type: "DELETE_COLUMN",
    payload: {
      boardId,
      columnId,
    },
  };
};

export const createBoardTask = (boardId, task) => {
  return {
    type: "CREATE_TASK",
    payload: {
      boardId,
      task,
    },
  };
};

export const deleteBoardTask = (boardId, taskId) => {
  return {
    type: "DELETE_TASK",
    payload: {
      boardId,
      taskId,
    },
  };
};

export const renameBoardTask = (boardId, taskId, newName) => {
  return {
    type: "RENAME_TASK",
    payload: {
      boardId,
      taskId,
      newName,
    },
  };
};

export const changeBoardColumns = (boardId, columns) => {
  return {
    type: "CHANGE_COLUMNS",
    payload: {
      boardId,
      columns,
    },
  };
};

export const changeBoardTasks = (boardId, tasks) => {
  return {
    type: "CHANGE_TASKS",
    payload: {
      boardId,
      tasks,
    },
  };
};
