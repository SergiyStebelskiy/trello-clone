import s from "./styles.module.scss";
import PropTypes from "prop-types";
import BoardCard from "../BoardCard";

const Boards = ({ title, data, onAdd, icon }) => (
  <div className={s.boardsWrap}>
    <h2 className={s.titleWrap}>
      <span className={s.icon}>{icon}</span>
      <span className={s.title}>{title}</span>
    </h2>
    <ul className={s.boards}>
      {data.map((board, index) => (
        <BoardCard {...board} key={index} />
      ))}
      <li className={s.addBoard} onClick={onAdd}>
        Создать доску
      </li>
    </ul>
  </div>
);
Boards.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
  data: PropTypes.array,
  onAdd: PropTypes.func,
};
Boards.defaultProps = {
  title: "",
  icon: "",
  data: [],
  onAdd: () => {},
};

export default Boards;
