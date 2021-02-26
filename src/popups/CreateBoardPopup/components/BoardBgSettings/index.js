import { useState, Fragment } from "react";
import classnames from "classnames";
import s from "./styles.module.scss";
import { ReactComponent as Close } from "icons/close-popup.svg";
import { ReactComponent as Check } from "icons/check.svg";
import { ReactComponent as Back } from "icons/back.svg";

const BoardBgSettings = ({ photos, colors, bg, onSelect, onClose }) => {
  const [mode, setMode] = useState("default");
  const getTitle = () => {
    switch (mode) {
      case "photos":
        return (
          <Fragment>
            Фотографии:{" "}
            <a href="https://www.pexels.com/" target="_blank" rel="noreferrer">
              Pexels
            </a>
          </Fragment>
        );
      case "colors":
        return "Цвета";
      default:
        return "Фон доски";
    }
  };
  return (
    <div className={s.bgSettings}>
      <Close className={s.closeBtn} onClick={onClose} />
      <header className={s.header}>
        <span className={s.title}>{getTitle()}</span>
        {mode !== "default" && (
          <Back className={s.backBtn} onClick={() => setMode("default")} />
        )}
      </header>
      <div className={s.body}>
        {mode === "default" && (
          <Fragment>
            <div className={s.box}>
              <div className={s.title}>
                <span>Фотографии</span>
                <button onClick={() => setMode("photos")}>Подробнее</button>
              </div>
              <ul className={s.items}>
                {photos.slice(0, 6).map((photo, index) => (
                  <li
                    className={classnames(s.bg, {
                      [s.selected]: bg === photo.small,
                    })}
                    key={index}
                    style={{ backgroundImage: `url(${photo.small})` }}
                    onClick={() =>
                      bg !== photo.small &&
                      onSelect({ type: "image", bg: photo.big })
                    }
                  >
                    {bg === photo.big && <Check />}
                  </li>
                ))}
              </ul>
            </div>
            <div className={s.box}>
              <div className={s.title}>
                <span>Цвета</span>
                <button onClick={() => setMode("colors")}>Подробнее</button>
              </div>
              <ul className={s.items}>
                {colors.slice(0, 6).map((color, index) => (
                  <li
                    className={classnames(s.bg, { [s.selected]: bg === color })}
                    key={index}
                    style={{ backgroundColor: color }}
                    onClick={() =>
                      bg !== color && onSelect({ type: "color", bg: color })
                    }
                  >
                    {bg === color && <Check />}
                  </li>
                ))}
              </ul>
            </div>
          </Fragment>
        )}
        {mode === "photos" && (
          <Fragment>
            <div className={s.box}>
              <ul className={s.items}>
                {photos.map((photo, index) => (
                  <li
                    className={classnames(s.bg, {
                      [s.selected]: bg === photo.small,
                    })}
                    key={index}
                    style={{ backgroundImage: `url(${photo.small})` }}
                    onClick={() =>
                      bg !== photo.small &&
                      onSelect({ type: "image", bg: photo.big })
                    }
                  >
                    {bg === photo.big && <Check />}
                  </li>
                ))}
              </ul>
            </div>
          </Fragment>
        )}
        {mode === "colors" && (
          <Fragment>
            <div className={s.box}>
              <ul className={s.items}>
                {colors.slice(0, 6).map((color, index) => (
                  <li
                    className={classnames(s.bg, { [s.selected]: bg === color })}
                    key={index}
                    style={{ backgroundColor: color }}
                    onClick={() =>
                      bg !== color && onSelect({ type: "color", bg: color })
                    }
                  >
                    {bg === color && <Check />}
                  </li>
                ))}
              </ul>
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default BoardBgSettings;
