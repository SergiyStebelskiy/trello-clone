import s from "./styles.module.scss";
import classnames from "classnames";
import PropTypes from "prop-types";

const Button = ({
  icon,
  children,
  onClick,
  className,
  ariaLabel,
  styled,
  disabled,
}) => (
  <button
    className={classnames(s.btn, { [s.green]: styled === "green" }, className)}
    onClick={onClick}
    aria-label={ariaLabel}
    disabled={disabled}
  >
    {icon && <span className={s.icon}>{icon}</span>}
    {children && (
      <span className={s.label} style={{ paddingLeft: !icon && "0" }}>
        {children}
      </span>
    )}
  </button>
);

Button.propTypes = {
  onClick: PropTypes.func,
  ariaLabel: PropTypes.string,
};
Button.defaultProps = {
  onClick: () => {},
};

export default Button;
