import { useState, useEffect } from "react";
import s from "./styles.module.scss";
import NewBoardPreview from "./components/NewBoardPreview";
import NewBoardBgSide from "./components/NewBoardBgSide";
import BoardBgSettings from "./components/BoardBgSettings";
import { colors } from "./helpers/colors";
import { useDispatch, useSelector } from "react-redux";
import { createBoard } from "actions/boards";
import { changePopup } from "actions/popup";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { setPhotos } from "actions/photos";

const CreateBoardPopup = () => {
  const photos = useSelector((state) => state.photos);
  const [boardBg, setBoardBg] = useState({
    type: "image",
    bg: photos?.[0]?.small,
  });
  const [visibleBgSettings, setVisibleBgSettings] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!photos.length) {
      axios
        .get(
          "https://pixabay.com/api?key=20294227-4dea613d5f67be2b24f0c7f40&per_page=199"
        )
        .then((res) => {
          dispatch(
            setPhotos(
              res.data.hits.map((e) => ({
                small: e.previewURL,
                big: e.largeImageURL,
              }))
            )
          );
          setBoardBg({
            type: "image",
            bg: res.data.hits[0].previewURL,
          });
        });
    }
  }, []);

  const handleCreateBoard = (name) => {
    dispatch(
      createBoard({
        id: uuidv4(),
        name,
        bg:
          boardBg.type === "image"
            ? photos.filter((e) => e.small === boardBg.bg)?.[0]
            : boardBg.bg,
        bgType: boardBg.type,
        columns: [],
        tasks: [],
      })
    );
    dispatch(changePopup(null));
  };
  return (
    <div className={s.popupWrap}>
      <div className={s.popupInlineWrap}>
        <NewBoardPreview boardBg={boardBg} onCreate={handleCreateBoard} />
        <NewBoardBgSide
          photos={photos}
          bg={boardBg.bg}
          onSelect={(bg) => setBoardBg(bg)}
          onMore={() => setVisibleBgSettings(true)}
        />
        {visibleBgSettings && (
          <BoardBgSettings
            photos={photos}
            colors={colors}
            bg={boardBg.bg}
            onSelect={(bg) => setBoardBg(bg)}
            onClose={() => setVisibleBgSettings(false)}
          />
        )}
      </div>
    </div>
  );
};
export default CreateBoardPopup;
