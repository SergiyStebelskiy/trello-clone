import { useRef, useState, Fragment } from "react";
import s from "./styles.module.scss";
import PropTypes from "prop-types";
import classnames from "classnames";
import { ReactComponent as Arrow } from "icons/fieldArrow.svg";
import { ReactComponent as Close } from "icons/close.svg";
import { ReactComponent as Search } from "icons/search.svg";

const SearchField = ({
  onCrossOver,
  onClose,
  className,
  onFocus,
  onBlur,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const fieldRef = useRef(null);
  return (
    <div className={classnames(s.fieldInlineWrap, className)}>
      <input
        className={s.field}
        ref={fieldRef}
        tabIndex={0}
        type="text"
        onBlur={() => {
          setIsFocused(false);
          onBlur();
        }}
        onFocus={() => {
          setIsFocused(true);
          onFocus();
        }}
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
        {...props}
      />
      <div className={s.btns}>
        {isFocused ? (
          <Fragment>
            <span className={s.arrow}>
              <Arrow onClick={onCrossOver} />
            </span>
            <span>
              <Close onClick={onClose} />
            </span>
          </Fragment>
        ) : (
          <span>
            <Search onClick={() => fieldRef.current.focus()} />
          </span>
        )}
      </div>
    </div>
  );
};
SearchField.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  onClose: PropTypes.func,
  onCrossOver: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};
SearchField.defaultProps = {
  value: "",
  onChange: () => {},
  onClose: () => {},
  onCrossOver: () => {},
  onFocus: () => {},
  onBlur: () => {},
};

export default SearchField;
