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
  ...props
}) => (
  <button
    {...props}
    className={classnames(
      s.btn,
      { [s.green]: styled === "green", [s.black]: styled === "black" },
      className
    )}
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
  icon: PropTypes.any,
  onClick: PropTypes.func,
  ariaLabel: PropTypes.string,
  styled: PropTypes.string,
  disabled: PropTypes.bool,
};
Button.defaultProps = {
  onClick: () => {},
  styled: "",
  disabled: false,
};

export default Button;
