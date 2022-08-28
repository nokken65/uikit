import clsx from 'clsx';
import type { ButtonHTMLAttributes, MouseEvent } from 'react';
import { memo, useCallback, useRef } from 'react';

import { createRipple } from '@/utils';

import styles from './Button.module.scss';

export const BUTTON_TYPES = ['primary', 'ghost'] as const;

export type ButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'type'
> & {
  type?: typeof BUTTON_TYPES[number];
  htmlType?: 'submit' | 'reset' | 'button';
  bold?: boolean;
  rounded?: boolean;
  ripple?: boolean;
};

const ButtonView = ({
  children,
  className,
  type = 'primary',
  htmlType = 'button',
  bold = true,
  rounded = true,
  ripple = true,
  ...rest
}: ButtonProps) => {
  const btnRef = useRef<HTMLButtonElement>(null);

  const onClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    if (btnRef.current && ripple) {
      createRipple(btnRef.current, event, styles['btn--ripple']);
    }
    rest.onClick && rest.onClick(event);
  }, []);

  return (
    <button
      className={clsx(
        styles.btn,
        className,
        bold && 'font-bold',
        rounded && 'rounded-lg',
        type === 'primary' && styles['btn--primary'],
        type === 'ghost' && styles['btn--ghost'],
      )}
      ref={btnRef}
      type={htmlType === 'submit' ? 'submit' : 'button'}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};

const Button = memo(ButtonView);

Button.displayName = 'Button';

export { Button };
