import clsx from 'clsx';
import { ButtonHTMLAttributes, memo } from 'react';

import styles from './Button.module.scss';

export type ButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'type'
> & {
  type?: 'primary' | 'ghost';
  bordered?: boolean;
  rounded?: boolean;
  htmlType?: 'submit' | 'reset' | 'button';
};

const ButtonView = ({
  children,
  type = 'primary',
  rounded = true,
  bordered = false,
  htmlType = 'button',
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        // styles.btn,
        className,
        rounded && 'rounded-lg',
        bordered && 'border-2',
        // type === 'primary' && styles.,
        // type === 'ghost' && styles.btnGhost,
      )}
      type={htmlType === 'submit' ? 'submit' : 'button'}
      {...props}
    >
      {children}
    </button>
  );
};

const Button = memo(ButtonView);

Button.displayName = 'Button';

export { Button };
