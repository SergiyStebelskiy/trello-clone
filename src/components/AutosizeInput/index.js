import s from "./styles.module.scss";
import Input from "react-input-autosize";

const AutosizeInput = (props) => (
  <Input className={s.field} type="text" {...props} />
);

export default AutosizeInput;
