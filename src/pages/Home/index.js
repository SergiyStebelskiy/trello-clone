import s from "./styles.module.scss";
import ContentWrapper from "components/ContentWrapper";
import ReactPlayer from "react-player";

const HomePage = () => {
  return (
    <ContentWrapper>
      <div className={s.videoWrap}>
        <ReactPlayer
          url="https://www.youtube.com/watch?v=tVooja0Ta5I&ab_channel=Trello"
          width="825px"
          controls={false}
          light={true}
        />
      </div>
    </ContentWrapper>
  );
};

export default HomePage;
