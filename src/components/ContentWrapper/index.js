import s from "./styles.module.scss";
import Nav from "../Nav";

const ContentWrapper = ({ children }) => (
  <div className={s.contentWrap}>
    <div className={s.col}>
      <Nav />
    </div>
    {children}
  </div>
);

export default ContentWrapper;
