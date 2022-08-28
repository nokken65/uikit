import { PropsWithChildren } from 'react';

export const Layout = ({ children }: PropsWithChildren) => {
  return <div className='bg-white p-6 dark:bg-slate-800'>{children}</div>;
};
