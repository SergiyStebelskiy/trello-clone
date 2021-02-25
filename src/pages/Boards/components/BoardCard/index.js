import s from "./styles.module.scss";
import { Link } from "react-router-dom";

const BoardCard = ({ bg, name, id, bgType }) => (
  <Link
    className={s.boardCard}
    to={`/boards/${id}`}
    style={{
      backgroundImage: bgType === "image" && `url(${bg.small})`,
      backgroundColor: bgType === "color" && bg,
    }}
  >
    <span className={s.name}>{name}</span>
  </Link>
);

export default BoardCard;
