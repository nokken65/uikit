import clsx from 'clsx';
import { HTMLAttributes, memo } from 'react';

import styles from './Heading.module.scss';

export type HeadingProps = HTMLAttributes<HTMLHeadingElement>;

const HeadingView = ({ children, className, ...rest }: HeadingProps) => {
  return (
    <h1 {...rest} className={clsx(styles.hdng, className)}>
      {children}
    </h1>
  );
};

export const Heading = memo(HeadingView);
