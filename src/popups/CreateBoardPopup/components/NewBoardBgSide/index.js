import s from "./styles.module.scss";
import classnames from "classnames";
import { colors } from "../../helpers/colors";
import { ReactComponent as More } from "icons/more.svg";
import { ReactComponent as Check } from "icons/check.svg";

const NewBoardBgSide = ({ bg, onSelect, onMore, photos }) => {
  return (
    <div className={s.bgSide}>
      {photos.slice(0, 4).map((image, index) => (
        <span
          style={{ backgroundImage: `url(${image.small})` }}
          className={classnames(s.item, { [s.selected]: image.small === bg })}
          onClick={() =>
            image !== bg && onSelect({ type: "image", bg: image.big })
          }
          key={index}
        >
          {image.small === bg && <Check />}
        </span>
      ))}
      {colors.slice(0, 4).map((color, index) => (
        <span
          style={{ backgroundColor: color }}
          className={classnames(s.item, { [s.selected]: color === bg })}
          onClick={() => color !== bg && onSelect({ type: "color", bg: color })}
          key={index}
        >
          {color === bg && <Check />}
        </span>
      ))}
      <span className={s.moreBtn} onClick={onMore}>
        <More />
      </span>
    </div>
  );
};

export default NewBoardBgSide;
