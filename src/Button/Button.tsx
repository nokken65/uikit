import clsx from "clsx";
import { ButtonHTMLAttributes, memo } from "react";
import styles from "./Button.module.scss";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isRounded?: boolean;
  isDanger?: boolean;
};

const ButtonView = ({
  isRounded = true,
  isDanger = false,
  children,
  className,
  ...rest
}: ButtonProps) => {
  return (
    <button
      {...rest}
      className={clsx(
        styles.btn,
        className,
        isRounded && styles.btnRounded,
        isDanger && styles.btnDanger
      )}
    >
      {children}
    </button>
  );
};

const Button = memo(ButtonView);

Button.displayName = "Button";

export { Button };
