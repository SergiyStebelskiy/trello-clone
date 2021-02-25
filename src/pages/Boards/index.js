import ContentWrapper from "components/ContentWrapper";
import s from "./styles.module.scss";
import Boards from "./components/Boards";
import { useDispatch, useSelector } from "react-redux";
import { changePopup } from "actions/popup";

const BoardsPage = () => {
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  return (
    <ContentWrapper>
      <div className={s.col}>
        <Boards
          icon="&#xE942;"
          title="Персональные доски"
          data={boards.map(({ columns, tasks, ...spread }) => ({ ...spread }))}
          onAdd={() => dispatch(changePopup("create_board"))}
        />
      </div>
    </ContentWrapper>
  );
};
export default BoardsPage;
