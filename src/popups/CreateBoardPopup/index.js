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
    bg: photos.length && photos?.[0],
  });
  const [visibleBgSettings, setVisibleBgSettings] = useState(false);
  const dispatch = useDispatch();
  console.log("bg", boardBg.bg);
  useEffect(() => {
    if (!photos.length) {
      axios
        .get("https://api.pexels.com/v1/search?query=nature&per_page=80", {
          headers: {
            Authorization: `563492ad6f9170000100000109c44969300a4fb6beace6fd9f43c79f`,
          },
        })
        .then((res) => {
          console.log(
            res.data.photos?.map((e) => ({
              small: e.src.small,
              big: e.src.large2x,
              normal: e.src.medium,
            }))?.[0]
          );
          setBoardBg({
            type: "image",
            bg: res.data.photos?.map((e) => ({
              small: e.src.small,
              big: e.src.large2x,
              normal: e.src.medium,
            }))?.[0],
          });
          dispatch(
            setPhotos(
              res.data.photos.map((e) => ({
                small: e.src.small,
                big: e.src.large2x,
                normal: e.src.medium,
              }))
            )
          );
        });
    }
  }, [dispatch]);

  const handleCreateBoard = (name) => {
    console.log("create", boardBg.bg);
    dispatch(
      createBoard({
        id: uuidv4(),
        name,
        bg: boardBg.bg,
        bgType: boardBg.type,
        columns: [],
        tasks: [],
        choosen: false,
      })
    );
    dispatch(changePopup(null));
  };
  return (
    <div className={s.popupWrap}>
      <div className={s.popupInlineWrap}>
        <NewBoardPreview boardBg={boardBg} onCreate={handleCreateBoard} />
        {boardBg.bg && (
          <NewBoardBgSide
            photos={photos}
            bg={boardBg.bg}
            onSelect={(bg) => setBoardBg(bg)}
            onMore={() => setVisibleBgSettings(true)}
          />
        )}
        {visibleBgSettings && boardBg.bg && (
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
