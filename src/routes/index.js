import { paths } from "./paths";
import Home from "pages/Home";
import Boards from "pages/Boards";
import Board from "pages/Board";

const routes = [
  {
    Component: <Home />,
    path: paths.home,
    exact: true,
  },
  {
    Component: <Boards />,
    path: paths.boards,
    exact: true,
  },
  {
    Component: <Board />,
    path: paths.board,
  },
];

export default routes;
