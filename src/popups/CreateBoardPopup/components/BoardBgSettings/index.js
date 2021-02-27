import { useState, Fragment, useEffect } from "react";
import classnames from "classnames";
import s from "./styles.module.scss";
import { ReactComponent as Close } from "icons/close-popup.svg";
import { ReactComponent as Check } from "icons/check.svg";
import { ReactComponent as Back } from "icons/back.svg";
import { ReactComponent as Search } from "icons/search.svg";
import axios from "axios";

const BoardBgSettings = ({ photos, colors, bg, onSelect, onClose }) => {
  const [mode, setMode] = useState("default");
  const [searchedPhotos, setSearchedPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
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
  useEffect(() => {
    if (searchValue.length) {
      setLoading(true);
      axios
        .get(
          `https://api.pexels.com/v1/search?query=${searchValue}&per_page=80`,
          {
            headers: {
              Authorization: `563492ad6f9170000100000109c44969300a4fb6beace6fd9f43c79f`,
            },
          }
        )
        .then((res) => {
          setSearchedPhotos(
            res.data.photos.map((e) => ({
              small: e.src.small,
              big: e.src.large2x,
              normal: e.src.medium,
            }))
          );
          setLoading(false);
        })
        .catch((err) => {
          setSearchedPhotos(photos);
          setLoading(false);
        });
    } else {
      setSearchedPhotos(photos);
    }
  }, [searchValue, photos]);
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
                      bg.small !== photo.small &&
                      onSelect({ type: "image", bg: photo })
                    }
                  >
                    {bg.big === photo.big && <Check />}
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
              <div className={s.fieldWrap}>
                <input
                  type="text"
                  placeholder="Фотографии"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                <Search className={s.icon} />
              </div>
              {!loading && searchedPhotos.length > 0 && (
                <ul className={s.items}>
                  {searchedPhotos.map((photo, index) => (
                    <li
                      className={classnames(s.bg, {
                        [s.selected]: bg === photo.small,
                      })}
                      key={index}
                      style={{ backgroundImage: `url(${photo.small})` }}
                      onClick={() =>
                        bg !== photo.small &&
                        onSelect({ type: "image", bg: photo })
                      }
                    >
                      {bg.big === photo.big && <Check />}
                    </li>
                  ))}
                </ul>
              )}
              {loading && <span className={s.loading}>Загрузка...</span>}
              {!loading && !searchedPhotos.length && (
                <span className={s.empty}>
                  {`Картинки не найдены по запросу "${searchValue}"`}
                </span>
              )}
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
